'use client'

import { logout } from '@/data/actions/auth-actions'
import { fetchMyOrders } from '@/data/actions/profile-actions'

import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

import { Heading } from '@/components/blocks'
import { Button } from '@/components/ui'

import { Order } from '@/types/types'

export default function Profile() {
	const router = useRouter()
	const [orders, setOrders] = useState<Order[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadOrders = async () => {
			const { data, error } = await fetchMyOrders()
			if (error) {
				console.error(error)
				setLoading(false)
				return
			}
			// Приводим данные к типу Order[], если возможно
			if (data && Array.isArray(data)) {
				setOrders(data as Order[])
			}
			setLoading(false)
		}

		loadOrders()
	}, [])

	const handleLogout = async () => {
		await logout()
		router.push('/')
	}

	const formatDate = (dateStr: string) =>
		new Date(dateStr).toLocaleString('ru-RU', {
			dateStyle: 'short',
			timeStyle: 'short',
		})

	return (
		<div className="__container">
			<Heading text="Профиль" level="h1" isCentered id={0} />
			<Button onClick={handleLogout} theme="primary">
				Выйти из аккаунта
			</Button>

			<Heading text="Мои заказы" level="h2" isCentered id={1} />
			{loading ? (
				<p>Загрузка заказов...</p>
			) : orders.length === 0 ? (
				<p>У вас нет заказов.</p>
			) : (
				<ul>
					{orders.map((order) => (
						<li key={order.id} style={{ marginBottom: 20 }}>
							<strong>Заказ #{order.id}</strong> (Создан: {formatDate(order.createdAt)})
							<br />
							Статус: <em>{order.orderStatus}</em>
							<br />
							Адрес: {order.address}
							<br />
							Сумма: {order.totalPrice} ₽
							<br />
							<details>
								<summary>Товары ({order.items.length})</summary>
								<ul>
									{order.items.map((item, i) => (
										<li key={i}>
											{item.title} — {item.quantity} шт. по {item.price} ₽ (
											{item.selectedWeight?.value}
											{item.selectedWeight?.unit})
										</li>
									))}
								</ul>
							</details>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
