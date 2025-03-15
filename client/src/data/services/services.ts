const BASE_URL = process.env.PUBLIC_API_URL ?? 'http://localhost:1337';

export async function subscribeService(email: string) {
	const url = new URL('/api/blog-signups', BASE_URL);

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				data: {
					email,
				},
			}),
		});

		return response.json();
	} catch (error) {
		console.error('Subscribe Service Error:', error);
	}
}
