import { getStrapiURL } from '@/utils/get-strapi-url'
import qs from 'qs'

import { getAuthToken } from './get-token'

const query = qs.stringify({
	populate: { image: { fields: ['url', 'alternativeText'] } },
})

export async function getUserMeLoader() {
	const baseUrl = getStrapiURL()
	const url = new URL('/api/users/me', baseUrl)
	// url.search = query;

	const authToken = await getAuthToken()
	if (!authToken) {
		return { ok: false, data: null, error: 'Authentication token is missing' }
	}

	try {
		const response = await fetch(url.href, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${authToken}`,
				'Content-Type': 'application/json',
			},
			cache: 'no-cache',
		})

		if (!response.ok) {
			return {
				ok: false,
				data: null,
				error: `Error ${response.status}: ${response.statusText}`,
			}
		}

		const data = await response.json()
		return { ok: true, data, error: null }
	} catch (error) {
		// Проверяем, является ли ошибка экземпляром Error
		const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'

		return { ok: false, data: null, error: errorMessage }
	}
}
