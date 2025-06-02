import { getStrapiURL } from '@/utils/get-strapi-url'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const { username, email, password } = await req.json()

		const response = await fetch(`${getStrapiURL()}auth/local`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, email, password }),
		})

		const responseData = await response.json()

		if (!response.ok) {
			return NextResponse.json(
				{ error: responseData?.error?.message || 'Ошибка при регистрации' },
				{ status: 400 },
			)
		}

		// Устанавливаем JWT в куки
		const responseHeaders = new Headers()
		responseHeaders.append(
			'Set-Cookie',
			`jwt=${
				responseData.jwt
			}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`,
		)

		return new NextResponse(JSON.stringify({ user: responseData.user }), {
			status: 200,
			headers: responseHeaders,
		})
	} catch (error) {
		console.error('Ошибка при регестрации:', error)
		return NextResponse.json({ error: 'Ошибка сервера. Попробуйте позже.' }, { status: 500 })
	}
}
