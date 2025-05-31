import { NextResponse } from 'next/server';

export async function POST() {
	// Удаляем cookie
	const response = NextResponse.json({ success: true });
	response.cookies.set('jwt', '', { maxAge: 0, path: '/' });
	return response;
}
