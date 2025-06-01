type NextFetchRequestConfig = {
	revalidate?: number | false
	tags?: string[]
}

interface FetchAPIOptions {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE'
	authToken?: string
	body?: Record<string, unknown>
	next?: NextFetchRequestConfig
}

export async function fetchAPI(url: string, options: FetchAPIOptions) {
	const { method, authToken, body, next } = options

	const headers: HeadersInit = {
		'Content-Type': 'application/json',
		...(authToken && { Authorization: `Bearer ${authToken}` }),
	}

	const fetchOptions: RequestInit & { next?: NextFetchRequestConfig } = {
		method,
		headers,
		...(body && { body: JSON.stringify(body) }),
		...(next && { next }), // Вставляем кэширование
	}

	try {
		const response = await fetch(url, fetchOptions)
		if (!response.ok) {
			throw new Error(`Ошибка запроса: ${response.status} ${response.statusText}`)
		}
		return await response.json()
	} catch (error) {
		console.error(`Ошибка ${method} запроса:`, error)
		throw error
	}
}
