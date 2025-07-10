// Если бы этот код стоял на продакшен-сервере с публичным URL вебхука, и в панели YooKassa
// в настройках webhook был указан именно этот публичный URL, то при успешной оплате
// статус оплаты поменяется в базе Strapi и будет актуален.
// 🔐 WEBHOOK_TOKEN — это просто "ключ от двери" в твой вебхук
// 🔑 STRAPI_API_TOKEN — это "паспорт с доступом" в Strapi API
// 👉 Не путай. Один защищает endpoint, второй работает с базой.
// WEBHOOK_TOKEN
// Просто строка, проверяется в Next.js коде
// Никаких прав на Strapi давать не нужно
// STRAPI_API_TOKEN
// Создаёшь в Strapi:
// Settings → API Tokens → Create Token
// Тип: Custom
// Даёшь права:
// PUT → Order → /api/orders/:id

	curl -X PUT "https://shining-love-c0c53e911a.strapiapp.com/api/orders/8" \
  -H "Authorization: Bearer 54b9546f2976954b276e657271deaa255c533b67ae97320f48362f86227ae3105e1d303648f1b023bbf3753be8dfed35132d74caf9e0e46f93e2191a44cd1a8d862f87140526371a68e8a0db5be2643def258d121cfe9e22af742494532e0fcdd36467a5e06bcc234e98c497b0335607474f5c79f7cce8e94c488e4d5eb5cae9" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "orderStatus": "Оплачен",
      "paymentInfo": {
        "payment_id": "payment-id-test-123",
        "status": "succeeded",
        "paidAt": "2025-07-07T14:30:00Z"
      }
    }
  }'


	curl -X PUT "https://shining-love-c0c53e911a.strapiapp.com/api/orders/8" \
  -H "Authorization: Bearer 54b9546f2976954b276e657271deaa255c533b67ae97320f48362f86227ae3105e1d303648f1b023bbf3753be8dfed35132d74caf9e0e46f93e2191a44cd1a8d862f87140526371a68e8a0db5be2643def258d121cfe9e22af742494532e0fcdd36467a5e06bcc234e98c497b0335607474f5c79f7cce8e94c488e4d5eb5cae9" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "orderStatus": "Оплачен"
    }
  }'

	curl -X PATCH "https://shining-love-c0c53e911a.strapiapp.com/api/orders/8" \
  -H "Authorization: Bearer 54b9546f2976954b276e657271deaa255c533b67ae97320f48362f86227ae3105e1d303648f1b023bbf3753be8dfed35132d74caf9e0e46f93e2191a44cd1a8d862f87140526371a68e8a0db5be2643def258d121cfe9e22af742494532e0fcdd36467a5e06bcc234e98c497b0335607474f5c79f7cce8e94c488e4d5eb5cae9" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "orderStatus": "Оплачен"
    }
  }'

	curl -X GET "https://shining-love-c0c53e911a.strapiapp.com/api/order/7" \
  -H "Authorization: Bearer "




	curl -X GET "https://shining-love-c0c53e911a.strapiapp.com/api/order/8" \
  -H "Authorization: Bearer ad80aa2c1cd3b25975a2857d7f8600e63f54a3538996ba9d67cd36deb51041010a66a30f486774128ead45977255ac27b6060178ed81ff7f6f46f0b7bce0b9e5ef11f025cf13359c229d8c0e841abdb0c6660ee6c1440ef29ade013338522f6d686ecc5e6f31ba51db1da933663ea4c7b278b3ab858d374dc64235db6d2a2f8a"

	curl -X GET "https://shining-love-c0c53e911a.strapiapp.com/api/orders" \
  -H "Authorization: Bearer 54b9546f2976954b276e657271deaa255c533b67ae97320f48362f86227ae3105e1d303648f1b023bbf3753be8dfed35132d74caf9e0e46f93e2191a44cd1a8d862f87140526371a68e8a0db5be2643def258d121cfe9e22af742494532e0fcdd36467a5e06bcc234e98c497b0335607474f5c79f7cce8e94c488e4d5eb5cae9"



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
