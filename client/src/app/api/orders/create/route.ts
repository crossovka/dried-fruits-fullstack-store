import { NextResponse } from 'next/server';
import { getStrapiURL } from '@/utils/get-strapi-url';
import { decodeJwt } from 'jose';

export async function POST(req: Request) {
	try {
		// 1. Проверка JWT
		const cookieHeader = req.headers.get('cookie') || '';
		const jwt = cookieHeader.match(/jwt=([^;]+)/)?.[1] ?? null;

		if (!jwt) {
			return NextResponse.json(
				{ error: 'Требуется авторизация' },
				{ status: 401 }
			);
		}

		// 2. Декодируем JWT с подробным логированием
		let decodedToken;
		try {
			decodedToken = decodeJwt(jwt);
			console.log('Decoded JWT:', decodedToken);
		} catch (error) {
			console.error('Ошибка декодирования JWT:', error);
			return NextResponse.json(
				{ error: 'Невалидный токен авторизации' },
				{ status: 401 }
			);
		}

		// 3. Получаем userId с проверкой типа
		const userId = decodedToken.id || decodedToken.userId || decodedToken.sub;
		console.log('Extracted userId:', userId, 'Type:', typeof userId);

		if (!userId) {
			console.error(
				'JWT не содержит идентификатора пользователя:',
				decodedToken
			);
			return NextResponse.json(
				{ error: 'Не удалось получить ID пользователя из токена' },
				{ status: 401 }
			);
		}

		if (typeof userId !== 'number' && typeof userId !== 'string') {
			console.error('Неподдерживаемый тип userId:', typeof userId);
			return NextResponse.json(
				{ error: 'Некорректный формат ID пользователя' },
				{ status: 400 }
			);
		}

		// 4. Парсим тело запроса
		let requestBody;
		try {
			requestBody = await req.json();
		} catch (error) {
			console.error('Ошибка парсинга тела запроса:', error);
			return NextResponse.json(
				{ error: 'Неверный формат данных запроса' },
				{ status: 400 }
			);
		}

		const { items, totalPrice, address } = requestBody;

		// 5. Валидация данных
		if (!items?.length || !totalPrice || !address) {
			return NextResponse.json(
				{
					error: 'Не хватает данных',
					details: {
						items: items?.length ? undefined : 'Требуется массив товаров',
						totalPrice: totalPrice ? undefined : 'Требуется общая сумма',
						address: address ? undefined : 'Требуется адрес доставки',
					},
				},
				{ status: 400 }
			);
		}

		// 6. Формируем данные для Strapi
		const orderData = {
			data: {
				items,
				totalPrice,
				address,
				orderStatus: 'created',
				paymentInfo: {},
				created: new Date().toISOString(),
			},
		};

		// 7. Отправляем запрос к Strapi
		try {
			console.log('Sending order data:', orderData);
			const response = await fetch(getStrapiURL('orders'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwt}`,
				},
				body: JSON.stringify(orderData),
			});

			const responseData = await response.json().catch(() => null);

			if (response.ok) {
				return NextResponse.json({ order: responseData.data }, { status: 201 });
			} else {
				console.error('Strapi error:', responseData?.error || 'Unknown error');
				return NextResponse.json(
					{
						error: 'Ошибка при создании заказа',
						details: responseData?.error || 'Unknown error',
					},
					{ status: response.status }
				);
			}
		} catch (error) {
			console.error('Request failed:', error);
			return NextResponse.json(
				{ error: 'Ошибка запроса к Strapi' },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error('Unhandled error:', error);
		return NextResponse.json(
			{ error: 'Серверная ошибка. Попробуйте позже.' },
			{ status: 500 }
		);
	}
}
