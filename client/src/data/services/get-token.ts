import { cookies } from 'next/headers'

export async function getAuthToken() {
	const cookieStore = await cookies()
	const token = cookieStore.get('jwt')?.value
	return token || null
}
