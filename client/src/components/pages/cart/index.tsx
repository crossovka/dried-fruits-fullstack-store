'use client'

import { useState } from 'react'

import { useUser } from '@/hooks/useUser'

import { Heading } from '@/components/blocks'
import { Button } from '@/components/ui'

import styles from './Cart.module.css'
import { CartItem } from './CartItem'
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
	const { user, loading: userLoading } = useUser()
	const isDisabled = loading || userLoading || !user

	const handleCheckout = () => placeOrder(address)

	return (
		<div className={styles.cart}>
			<Heading text={'Корзина'} isCentered level={'h1'} id={2} />

			{cartItems.length === 0 ? (
				<p>Корзина пуста</p>
			) : (
				<>
					<ul>
						{cartItems.map((item) => (
							<CartItem
								key={`${item.id}-${item.selectedWeight?.value}`}
								item={item}
								onIncrease={() => increaseItem(item)}
								onDecrease={() => decreaseItem(item)}
								onRemove={() => removeItem(item)}
							/>
						))}
					</ul>

					<p>Итого: {totalPrice} ₽</p>

					<div className={styles.footer}>
						{!user && !userLoading && <p style={{ color: 'red' }}>Войдите, чтобы оформить заказ</p>}

						<input
							type="text"
							placeholder="Введите адрес доставки"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							className={styles.input}
							disabled={isDisabled}
						/>

						<div className={styles.actions}>
							<Button onClick={handleCheckout} disabled={isDisabled} theme="primary" size="medium">
								{loading ? 'Оформление...' : 'Оформить заказ'}
							</Button>

							<Button
								onClick={clearCart}
								disabled={loading}
								theme="secondary"
								size="medium"
								className={styles.clearCartBtn}
							>
								Очистить корзину
							</Button>
						</div>
					</div>
				</>
			)}
		</div>
	)
}
