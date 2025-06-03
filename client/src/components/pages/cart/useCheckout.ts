import { toast } from 'react-toastify'

import { useState } from 'react'

import { selectCartItems, selectCartTotalPrice } from '@/store/cart/cart.selectors'
import { cartActions } from '@/store/cart/cart.slice'
import { CartItem } from '@/store/cart/cart.types'
import { useAppDispatch, useAppSelector } from '@/store/store'

export function useCheckout() {
	const dispatch = useAppDispatch()
	const cartItems = useAppSelector(selectCartItems)
	const totalPrice = useAppSelector(selectCartTotalPrice)

	const [loading, setLoading] = useState(false)

	const increaseItem = (item: CartItem) => {
		dispatch(cartActions.addItem(item))
	}

	const decreaseItem = (item: CartItem) => {
		if (item.quantity === 1) {
			if (window.confirm('Удалить товар из корзины?')) {
				dispatch(cartActions.removeItem({ id: item.id, selectedWeight: item.selectedWeight }))
			}
		} else {
			dispatch(cartActions.decreaseItem({ id: item.id, selectedWeight: item.selectedWeight }))
		}
	}

	const removeItem = (item: CartItem) => {
		if (window.confirm('Удалить товар из корзины?')) {
			dispatch(cartActions.removeItem({ id: item.id, selectedWeight: item.selectedWeight }))
		}
	}

	const clearCart = () => {
		dispatch(cartActions.clearCart())
	}

	// Оформление заказа
	const placeOrder = async (address: string) => {
		if (cartItems.length === 0) {
			toast.error('Корзина пуста')
			return
		}
		if (!address.trim()) {
			toast.error('Введите адрес доставки')
			return
		}

		setLoading(true)

		try {
			const itemsForOrder = cartItems.map((item) => ({
				productId: item.id,
				quantity: item.quantity,
				price: item.price,
				selectedWeight: item.selectedWeight,
				title: item.title,
			}))

			const res = await fetch('/api/orders/create', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ items: itemsForOrder, totalPrice, address }),
			})
			const data = await res.json()

			if (!res.ok || !data.order?.id) {
				toast.error(data.error || 'Ошибка при оформлении заказа')
				return
			}

			const paymentRes = await fetch('/api/yookassa/pay', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					totalPrice,
					orderId: data.order.id,
				}),
			})

			const paymentData = await paymentRes.json()

			if (paymentRes.ok && paymentData?.url) {
				dispatch(cartActions.clearCart())
				window.location.href = paymentData.url
			} else {
				toast.error(paymentData.error || 'Не удалось создать платёж')
			}
		} catch (error) {
			console.error('Ошибка оформления заказа', error)
			toast.error('Ошибка сервера. Попробуйте позже.')
		} finally {
			setLoading(false)
		}
	}

	return {
		cartItems,
		totalPrice,
		increaseItem,
		decreaseItem,
		removeItem,
		clearCart,
		placeOrder,
		loading,
	}
}
