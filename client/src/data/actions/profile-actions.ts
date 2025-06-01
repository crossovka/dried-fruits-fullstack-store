'use client'

export type OrderStatus = 'created' | 'paid' | 'shipped' | 'delivered' | 'cancelled'

export interface Order {
	id: number
	attributes: {
		totalPrice: number
		address: string
		orderStatus: OrderStatus
		created: string // ISO формат даты, например: "2025-05-31T12:34:56.789Z"
		updated?: string
		items: any[] // если у items есть структура — опиши отдельно
		paymentInfo: any // если структура известна — опиши
		user?: {
			data: {
				id: number
				attributes: {
					username: string
					email: string
					// другие поля пользователя, если нужно
				}
			}
		}
	}
}
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
