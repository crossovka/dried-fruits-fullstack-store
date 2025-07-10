'use client'

import { useEffect, useState } from 'react'

import { User } from '@/types/types'

export function useUser() {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await fetch('/api/auth/me', { credentials: 'include' })
				const data = await res.json()
				if (res.ok && data.user) setUser(data.user)
			} catch (e) {
				console.error('Ошибка при загрузке пользователя:', e)
			} finally {
				setLoading(false)
			}
		}

		fetchUser()
	}, [])

	return { user, loading }
}
