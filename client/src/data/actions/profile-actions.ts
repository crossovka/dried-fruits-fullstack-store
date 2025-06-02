'use client'

import { Order } from '@/types/types'

export async function fetchMyOrders(): Promise<{
	data?: Order[]
	error?: string
}> {
	try {
		const res = await fetch('/api/orders/mine', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		})

		const responseData = await res.json()

		if (!res.ok) {
			return {
				error: responseData?.error?.message || 'Ошибка получения заказов',
			}
		}

		return { data: responseData.data }
	} catch (error) {
		console.error('Ошибка загрузки заказов:', error)
		return { error: 'Ошибка сети или сервера. Попробуйте позже.' }
	}
}
