import { NextResponse } from 'next/server';
import { getStrapiURL } from '@/utils/get-strapi-url';

const BASE_URL = getStrapiURL();

export async function POST(req: Request) {
	try {
		const { userId, items, totalPrice, address } = await req.json();

		if (!userId || !items || !totalPrice || !address) {
			return NextResponse.json(
				{ error: 'Отсутствуют обязательные поля' },
				{ status: 400 }
			);
		}

		// Формируем тело для Strapi (у Strapi 4+ есть структура с data)
		const orderData = {
			data: {
				user: userId,
				items, // ожидается, что это массив с объектами: productId, quantity, price, selectedWeight и т.п.
				totalPrice,
				address,
				status: 'pending',
			},
		};

		const response = await fetch(`${BASE_URL}/api/orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`, // Токен API для авторизации
			},
			body: JSON.stringify(orderData),
		});

		const responseData = await response.json();

		if (!response.ok) {
			return NextResponse.json(
				{ error: responseData?.error?.message || 'Ошибка создания заказа' },
				{ status: response.status }
			);
		}

		return NextResponse.json({ order: responseData.data }, { status: 201 });
	} catch (error) {
		console.error('Ошибка создания заказа:', error);
		return NextResponse.json(
			{ error: 'Ошибка сервера. Попробуйте позже.' },
			{ status: 500 }
		);
	}
}
