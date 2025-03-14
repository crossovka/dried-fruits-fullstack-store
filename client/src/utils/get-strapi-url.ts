export function getStrapiURL(path: string = ''): string {
	const strapiUrl = process.env.STRAPI_API_URL || 'http://localhost:1337';
	return `${strapiUrl}/api/${path}`; // Добавляем /api к пути
}

export function getStrapiMediaURL(path: string = ''): string {
	const strapiUrl = process.env.STRAPI_API_URL || 'http://localhost:1337';
	return `${strapiUrl}${path}`; // Просто добавляем путь к базе URL
}
