'use client'

import React, { useState } from 'react'

import { CartItem as CartItemComponent } from '@/components/ui'

import { useCheckout } from './useCheckout'

export default function CartPage() {
	const {
		cartItems,
		totalPrice,
		increaseItem,
		decreaseItem,
		removeItem,
		clearCart,
		placeOrder,
		loading,
	} = useCheckout()

	const [address, setAddress] = useState('')

	const handleCheckout = () => {
		placeOrder(address)
	}

	return (
		<div>
			<h1>Корзина</h1>

			{cartItems.length === 0 ? (
				<p>Корзина пуста</p>
			) : (
				<>
					<ul>
						{cartItems.map((item) => (
							<li key={`${item.id}-${item.selectedWeight?.value}`}>
								<CartItemComponent
									item={item}
									onIncrease={() => increaseItem(item)}
									onDecrease={() => decreaseItem(item)}
									onRemove={() => removeItem(item)}
								/>
							</li>
						))}
					</ul>

					<p>Итого: {totalPrice} ₽</p>

					<input
						type="text"
						placeholder="Введите адрес доставки"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						disabled={loading}
					/>

					<button onClick={handleCheckout} disabled={loading}>
						{loading ? 'Оформление...' : 'Оформить заказ'}
					</button>

					<button onClick={clearCart} disabled={loading}>
						Очистить корзину
					</button>
				</>
			)}
		</div>
	)
}
