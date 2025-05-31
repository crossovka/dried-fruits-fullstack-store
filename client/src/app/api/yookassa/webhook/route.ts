// Если бы этот код стоял на продакшен-сервере с публичным URL вебхука, и в панели YooKassa
// в настройках webhook был указан именно этот публичный URL, то при успешной оплате
// статус оплаты поменяется в базе Strapi и будет актуален.

import { NextResponse } from 'next/server';
// @ts-ignore
import YooKassa from 'yookassa';
import { getStrapiURL } from '@/utils/get-strapi-url';

const yooKassa = new YooKassa({
	shopId: process.env.YOOKASSA_SHOP_ID!,
	secretKey: process.env.YOOKASSA_SECRET_KEY!,
});

export async function POST(req: Request) {
	try {
		const body = await req.json();
		console.log('Webhook body:', body);

		const event = body.event;
		console.log('Webhook event:', event);

		if (event !== 'payment.succeeded') {
			console.log('Событие не интересует, пропускаем');
			return NextResponse.json(
				{ message: 'Не интересует событие' },
				{ status: 200 }
			);
		}

		const payment = body.object;
		const orderId = payment.metadata?.orderId;
		const paymentId = payment.id;

		console.log('orderId из metadata:', orderId);
		console.log('paymentId:', paymentId);

		if (!orderId || !paymentId) {
			console.error('Нет orderId или paymentId в metadata');
			return NextResponse.json(
				{ error: 'orderId или paymentId отсутствует' },
				{ status: 400 }
			);
		}

		// Обновляем заказ в Strapi
		const res = await fetch(getStrapiURL(`orders/${orderId}`), {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
			},
			body: JSON.stringify({
				data: {
					orderStatus: 'Оплачен',
					paymentInfo: {
						payment_id: paymentId,
						status: 'succeeded',
						paidAt: payment.paid_at,
					},
				},
			}),
		});

		console.log('Ответ Strapi при обновлении заказа:', res.status);

		if (!res.ok) {
			const errorData = await res.json();
			console.error('Ошибка при обновлении заказа:', errorData);
			return NextResponse.json(
				{ error: 'Ошибка обновления заказа' },
				{ status: 500 }
			);
		}

		console.log('Заказ успешно обновлён в Strapi');

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error('Webhook ошибка:', err);
		return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
	}
}
