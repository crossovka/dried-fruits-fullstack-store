import { getStrapiURL } from '@/utils/get-strapi-url';

export async function contactsService(data: FormValues) {
	const url = new URL('/api/contacts', getStrapiURL());

	try {
		const response = await fetch(url.toString(), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				data: {
					...data,
				},
			}),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Ошибка при отправке данных');
		}

		return await response.json();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error('Contacts Service Error:', error);
		throw error;
	}
}
