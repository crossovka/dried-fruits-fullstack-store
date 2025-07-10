export function getHostname(url = process.env.SERVER_URL || ''): string {
	try {
		const parsed = new URL(url)
		return parsed.hostname
	} catch {
		return 'localhost'
	}
}

export function getMediaHostname(url = process.env.SERVER_URL || ''): string {
	const base = getHostname(url) // например: 'сервер.три-клопа.рф'
	const parts = base.split('.')
	if (parts.length < 2) return base // плохой домен, не трогаем

	// Вставляем "media" перед последним элементом (зоной, например "рф")
	const last = parts.pop() // "рф"
	return `${parts.join('.')}.media.${last}`
}
