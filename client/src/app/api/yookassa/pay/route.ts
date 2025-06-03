// @ts-expect-error: yookassa has no default export
import YooKassa from 'yookassa'

import { NextResponse } from 'next/server'

const shopId = process.env.YOOKASSA_SHOP_ID!
const secretKey = process.env.YOOKASSA_SECRET_KEY!
const redirectUrl = process.env.YOOKASSA_REDIRECT_URL!
const notificationUrl = process.env.YOOKASSA_NOTIFICATION_URL!

const yooKassa = new YooKassa({ shopId, secretKey })

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const { totalPrice, orderId } = body

		if (!totalPrice || !orderId) {
			return NextResponse.json({ error: 'Missing data' }, { status: 400 })
		}

		const payment = await yooKassa.createPayment(
			{
				amount: {
					value: totalPrice.toFixed(2),
					currency: 'RUB',
				},
				capture: true,
				confirmation: {
					type: 'redirect',
					return_url: `${redirectUrl}?orderId=${orderId}`,
				},
				description: `Заказ #${orderId}`,
				metadata: {
					orderId,
				},
				notification_url: notificationUrl,
			},
			Math.random().toString(36).substring(2), // idempotence key
		)

		return NextResponse.json({ url: payment.confirmation.confirmation_url })
	} catch (error) {
		console.error('YooKassa error:', error)
		return NextResponse.json({ error: 'Ошибка создания платежа' }, { status: 500 })
	}
}
