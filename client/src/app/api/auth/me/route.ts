import { getUserMeLoader } from '@/data/services/get-user-me-loader'

import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const result = await getUserMeLoader()
		console.log('getUserMeLoader result:', result)

		if (!result.ok || !result.data) {
			return NextResponse.json({ user: null }, { status: 401 })
		}

		return NextResponse.json({ user: result.data }, { status: 200 })
	} catch (error) {
		console.error('API /auth/me error:', error)
		return NextResponse.json({ user: null }, { status: 500 })
	}
}
