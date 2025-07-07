// Если бы этот код стоял на продакшен-сервере с публичным URL вебхука, и в панели YooKassa
// в настройках webhook был указан именно этот публичный URL, то при успешной оплате
// статус оплаты поменяется в базе Strapi и будет актуален.
import { getStrapiURL } from '@/utils/get-strapi-url'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const url = new URL(req.url)
		const token = url.searchParams.get('token')

		if (token !== process.env.WEBHOOK_TOKEN) {
			console.error('❌ Неверный токен в webhook')
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const body = await req.json()
		console.log('🟡 Webhook body:', JSON.stringify(body, null, 2))

		const event = body.event
		console.log('🔵 Webhook event:', event)

		if (event !== 'payment.succeeded') {
			console.log('⚪️ Неинтересное событие, пропускаем.')
			return NextResponse.json({ message: 'Не интересует событие' }, { status: 200 })
		}

		const payment = body.object
		console.log('🟡 Полный объект payment:', JSON.stringify(payment, null, 2))

		const orderId = payment.metadata?.orderId
		const paymentId = payment.id
		const paidAt = payment.paid_at

		console.log('🔷 orderId из metadata:', orderId)
		console.log('🔷 paymentId:', paymentId)
		console.log('🔷 paidAt:', paidAt)

		if (!orderId || !paymentId) {
			console.error('❌ Нет orderId или paymentId в metadata')
			return NextResponse.json({ error: 'orderId или paymentId отсутствует' }, { status: 400 })
		}

		const putUrl = getStrapiURL(`orders/${orderId}`)
		const authToken = process.env.STRAPI_API_TOKEN

		console.log('🟠 PUT запрос в:', putUrl)
		console.log('🟠 С токеном:', authToken?.slice(0, 8) + '...' || '⛔️ не указан')

		const res = await fetch(putUrl, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${authToken}`,
			},
			body: JSON.stringify({
				data: {
					orderStatus: 'Оплачен',
					paymentInfo: {
						payment_id: paymentId,
						status: 'succeeded',
						paidAt,
					},
				},
			}),
		})

		console.log('🟢 Ответ Strapi:', res.status)

		if (!res.ok) {
			const errorText = await res.text()
			try {
				const errorJson = JSON.parse(errorText)
				return NextResponse.json(
					{ error: 'Ошибка обновления заказа', details: errorJson },
					{ status: 500 },
				)
			} catch {
				return NextResponse.json(
					{ error: 'Ошибка обновления заказа', details: errorText },
					{ status: 500 },
				)
			}
		}

		console.log('✅ Заказ успешно обновлён в Strapi')
		return NextResponse.json({ success: true })
	} catch (err) {
		console.error('🔥 Webhook ошибка (catch):', err)
		return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
	}
}
