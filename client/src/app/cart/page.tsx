'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '@/store/store';
import {
	selectCartItems,
	selectCartTotalPrice,
} from '@/store/cart/cart.selectors';
import { cartActions } from '@/store/cart/cart.slice';

import { StrapiImage } from '@/components/ui/StrapiImage';
import { CartItem } from '@/store/cart/cart.types';

export default function CartPage() {
	const dispatch = useAppDispatch();
	const cartItems = useAppSelector(selectCartItems);
	const totalPrice = useAppSelector(selectCartTotalPrice);

	const [address, setAddress] = useState('');
	const [loading, setLoading] = useState(false);

	const handleIncrease = (item: CartItem) => {
		dispatch(cartActions.addItem(item));
	};
	const handleDecrease = (item: CartItem) => {
		if (item.quantity === 1) {
			if (window.confirm('Удалить товар из корзины?')) {
				dispatch(
					cartActions.removeItem({
						id: item.id,
						selectedWeight: item.selectedWeight,
					})
				);
			}
		} else {
			dispatch(
				cartActions.decreaseItem({
					id: item.id,
					selectedWeight: item.selectedWeight,
				})
			);
		}
	};
	const handleRemoveItem = (item: CartItem) => {
		if (window.confirm('Удалить товар из корзины?')) {
			dispatch(
				cartActions.removeItem({
					id: item.id,
					selectedWeight: item.selectedWeight,
				})
			);
		}
	};
	const handleClearCart = () => {
		dispatch(cartActions.clearCart());
	};

	const handlePlaceOrder = async () => {
		if (!address.trim()) {
			toast.error('Введите адрес доставки');
			return;
		}
		if (cartItems.length === 0) {
			toast.error('Корзина пуста');
			return;
		}

		setLoading(true);

		try {
			const itemsForOrder = cartItems.map((item) => ({
				productId: item.id,
				quantity: item.quantity,
				price: item.price,
				selectedWeight: item.selectedWeight,
				title: item.title,
			}));

			const response = await fetch('/api/orders/create', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					items: itemsForOrder,
					totalPrice,
					address,
				}),
			});

			const data = await response.json();

			console.log('Ответ от /api/orders/create:', data);

			if (!response.ok || !data.order?.id) {
				toast.error(data.error || 'Ошибка при оформлении заказа');
				return;
			}

			console.log('Создан заказ. orderId =', data.order.id);
			// Переход к созданию платежа в YooKassa
			const paymentRes = await fetch('/api/yookassa/pay', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					totalPrice,
					orderId: data.order.id,
				}),
			});

			const paymentData = await paymentRes.json();

			if (paymentRes.ok && paymentData?.url) {
				dispatch(cartActions.clearCart());
				setAddress('');
				window.location.href = paymentData.url; // редирект на YooKassa
			} else {
				toast.error(paymentData.error || 'Не удалось создать платёж');
			}
		} catch (error) {
			console.error('Ошибка оформления заказа', error);
			toast.error('Ошибка сервера. Попробуйте позже.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="cart">
			<h2>Ваша корзина</h2>

			{cartItems.length === 0 ? (
				<p>Ваша корзина пуста</p>
			) : (
				<>
					<ul>
						{cartItems.map((item) => {
							const uniqueKey = `${item.id}-${item.selectedWeight?.value}`;
							return (
								<li key={uniqueKey} className="cart-item">
									<Link
										href={`/products/${item.slug}`}
										className="cart-item__image -ibg"
									>
										<StrapiImage
											src={item.image.url}
											alt={item.image.alternativeText || 'No alt'}
											fill
										/>
									</Link>
									<div className="cart-item__info">
										<h3>{item.title}</h3>
										<p>Цена: {item.price} ₽</p>
										<p>
											Вес: {item.selectedWeight?.value}{' '}
											{item.selectedWeight?.unit}
										</p>
									</div>
									<div className="cart-item__controls">
										<button onClick={() => handleDecrease(item)}>➖</button>
										<span>{item.quantity}</span>
										<button onClick={() => handleIncrease(item)}>➕</button>
										<button onClick={() => handleRemoveItem(item)}>🗑</button>
									</div>
								</li>
							);
						})}
					</ul>
					<div className="cart-footer">
						<h2>Общая сумма: {totalPrice} ₽</h2>

						<label htmlFor="address">Адрес доставки:</label>
						<input
							id="address"
							type="text"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							placeholder="Введите адрес доставки"
							disabled={loading}
							style={{ width: '100%', marginBottom: '1rem' }}
						/>

						<button
							onClick={handlePlaceOrder}
							disabled={loading}
							style={{ marginRight: '1rem' }}
						>
							{loading ? 'Оформление...' : 'Оформить заказ'}
						</button>

						<button onClick={handleClearCart} disabled={loading}>
							Очистить корзину
						</button>
					</div>
				</>
			)}
		</div>
	);
}
