// import { getAuthToken } from '@/data/services/get-token'
import { getUserMeLoader } from '@/data/services/get-user-me-loader'

import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
	// console.log('🚀 Middleware запущен')
	// console.info('ℹ️ Middleware работает!')

	const currentPath = request.nextUrl.pathname
	// console.log('📌 Проверяем путь:', currentPath)

	try {
		// Получаем токен
		// const token = await getAuthToken()
		// console.log('🔑 JWT Token:', token ? 'Есть' : 'Нет')

		// Загружаем пользователя с токеном
		// console.log('🔍 Запускаем getUserMeLoader')
		// const user = await getUserMeLoader(token)
		const user = await getUserMeLoader()

		// console.log('✅ Получен user:', user)

		// Если пользователь не залогинен, но пытается зайти в профиль
		if (currentPath.startsWith('/profile') && user.ok === false) {
			// console.log('⛔ Отложенный редирект на /signin')
			await new Promise((resolve) => setTimeout(resolve, 500))
			return NextResponse.redirect(new URL('/signin', request.url))
		}

		// console.log('✅ Доступ разрешен')
		return NextResponse.next()
	} catch {
		// console.error('❌ Ошибка в middleware:', error)
		return NextResponse.next() // Не блокируем запрос
	}
}
