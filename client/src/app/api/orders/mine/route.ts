import { NextResponse } from 'next/server';
import { getStrapiURL } from '@/utils/get-strapi-url';

export async function GET(req: Request) {
	const cookieHeader = req.headers.get('cookie') || '';
	const jwt = cookieHeader.match(/jwt=([^;]+)/)?.[1];

	if (!jwt) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	// Вызов стандартного эндпоинта Strapi orders (find), кастомный контроллер уже фильтрует по user.id
	const strapiUrl = getStrapiURL('orders?sort=created:desc');

	const response = await fetch(strapiUrl, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	const data = await response.json();

	console.log('🔍 Ответ от Strapi:', JSON.stringify(data, null, 2));

	return NextResponse.json(data);
}
