import { NextRequest, NextResponse } from 'next/server';
import { getUserMeLoader } from './data/services/get-user-me-loader';

export async function middleware(request: NextRequest) {
	const user = await getUserMeLoader();
	const currentPath = request.nextUrl.pathname;

	if (currentPath.startsWith('/profile') && user.ok === false) {
		return NextResponse.redirect(new URL('/signin', request.url));
	}

	return NextResponse.next();
}
