import { getUserMeLoader } from '@/data/services/get-user-me-loader'
import { getStrapiURL } from '@/utils/get-strapi-url'
import { decodeJwt } from 'jose'

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		console.log('=== Новый запрос на создание заказа ===')

		// 1. Получаем cookie и JWT
		const cookieHeader = req.headers.get('cookie') || ''
		console.log('Cookies header:', cookieHeader)

		const jwt = cookieHeader.match(/jwt=([^;]+)/)?.[1] ?? null
		console.log('Извлечён JWT:', jwt)

		if (!jwt) {
			console.error('JWT не найден в cookies')
			return NextResponse.json({ error: 'Требуется авторизация' }, { status: 401 })
		}

		// 2. Декодируем JWT с логами
		let decodedToken
		try {
			decodedToken = decodeJwt(jwt)
			console.log('Decoded JWT:', decodedToken)
		} catch (error) {
			console.error('Ошибка декодирования JWT:', error)
			return NextResponse.json({ error: 'Невалидный токен авторизации' }, { status: 401 })
		}

		// 3. Извлекаем userId
		const userId = decodedToken.id || decodedToken.userId || decodedToken.sub
		console.log('Extracted userId:', userId, 'Type:', typeof userId)

		if (!userId) {
			console.error('JWT не содержит идентификатора пользователя:', decodedToken)
			return NextResponse.json(
				{ error: 'Не удалось получить ID пользователя из токена' },
				{ status: 401 },
			)
		}

		// 3.5 Получаем данные пользователя через getUserMeLoader
		const userResult = await getUserMeLoader()
		console.log('getUserMeLoader result:', userResult)

		if (!userResult.ok || !userResult.data) {
			console.error('Не удалось получить данные пользователя через getUserMeLoader')
			return NextResponse.json({ error: 'Ошибка авторизации' }, { status: 401 })
		}

		const documentId = userResult.data.documentId
		if (!documentId) {
			console.error('documentId пользователя не найден в getUserMeLoader')
			return NextResponse.json(
				{ error: 'Не удалось получить идентификатор пользователя' },
				{ status: 401 },
			)
		}
		console.log('Полученный documentId пользователя:', documentId)

		// 4. Парсим тело запроса
		let requestBody
		try {
			requestBody = await req.json()
			console.log('Получено тело запроса:', requestBody)
		} catch (error) {
			console.error('Ошибка парсинга тела запроса:', error)
			return NextResponse.json({ error: 'Неверный формат данных запроса' }, { status: 400 })
		}

		const { items, totalPrice, address } = requestBody

		// 5. Валидация данных
		if (!items?.length || !totalPrice || !address) {
			console.error('Валидация не пройдена. Переданные данные:', {
				itemsLength: items?.length,
				totalPrice,
				address,
			})
			return NextResponse.json(
				{
					error: 'Не хватает данных',
					details: {
						items: items?.length ? undefined : 'Требуется массив товаров',
						totalPrice: totalPrice ? undefined : 'Требуется общая сумма',
						address: address ? undefined : 'Требуется адрес доставки',
					},
				},
				{ status: 400 },
			)
		}

		// 6. Формируем данные для Strapi с documentId из getUserMeLoader
		const orderData = {
			data: {
				user: {
					connect: [userId], // <--- ключевой момент! надо было поставитьгалочки settings authenficateduser find
				},
				items,
				totalPrice,
				address,
				orderStatus: 'Ожидает оплаты',
				paymentInfo: {},
				created: new Date().toISOString(),
			},
		}
		console.log('Сформированные данные для Strapi:', JSON.stringify(orderData, null, 2))

		// 7. Отправляем запрос к Strapi для создания заказа
		try {
			const strapiUrl = getStrapiURL('orders')
			console.log('Отправляем запрос к Strapi по адресу:', strapiUrl)

			const response = await fetch(strapiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwt}`,
				},
				body: JSON.stringify(orderData),
			})

			const responseText = await response.text()
			let responseData = null

			try {
				responseData = JSON.parse(responseText)
			} catch {
				console.warn('Не удалось распарсить ответ Strapi как JSON, ответ:', responseText)
			}

			console.log('Ответ Strapi:', response.status, response.statusText, responseData)

			if (response.ok) {
				console.log('Заказ успешно создан:', responseData)
				return NextResponse.json({ order: responseData.data }, { status: 201 })
			} else {
				console.error('Strapi вернул ошибку:', responseData?.error || 'Unknown error')
				return NextResponse.json(
					{
						error: 'Ошибка при создании заказа',
						details: responseData?.error || 'Unknown error',
						rawResponse: responseText,
					},
					{ status: response.status },
				)
			}
		} catch (error) {
			console.error('Ошибка запроса к Strapi:', error)
			return NextResponse.json({ error: 'Ошибка запроса к Strapi' }, { status: 500 })
		}
	} catch (error) {
		console.error('Необработанная ошибка сервера:', error)
		return NextResponse.json({ error: 'Серверная ошибка. Попробуйте позже.' }, { status: 500 })
	}
}
