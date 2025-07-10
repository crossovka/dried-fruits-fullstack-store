export function getStrapiURL(path: string = ''): string {
	const strapiUrl =
		typeof window === 'undefined'
			? process.env.SERVER_URL || 'http://localhost:1337' // сервер
			: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:1337' // клиент

	// console.log(`${typeof window === 'undefined' ? 'Server' : 'Client'} Using Strapi URL:`, strapiUrl)
	return `${strapiUrl}/api/${path}`
}

export function getStrapiMediaURL(path: string = ''): string {
	const strapiUrl = process.env.SERVER_URL || 'http://localhost:1337'
	return `${strapiUrl}${path}` // Просто добавляем путь к базе URL
}
