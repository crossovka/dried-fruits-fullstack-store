'use client';

import Link from 'next/link';

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

	// Увеличение количества товара
	const handleIncrease = (item: CartItem) => {
		dispatch(cartActions.addItem(item));
	};

	// Уменьшение количества товара с подтверждением (если 1 шт. - удаляется из корзины)
	const handleDecrease = (item: CartItem) => {
		if (item.quantity === 1) {
			const confirmRemove = window.confirm(
				'Вы уверены, что хотите удалить этот товар из корзины?'
			);

			if (confirmRemove) {
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

	// Удаление товара из корзины с подтверждением
	const handleRemoveItem = (item: CartItem) => {
		const confirmRemove = window.confirm(
			'Вы уверены, что хотите удалить этот товар из корзины?'
		);

		if (confirmRemove) {
			dispatch(
				cartActions.removeItem({
					id: item.id,
					selectedWeight: item.selectedWeight,
				})
			);
		}
	};

	// Очистка всей корзины
	const handleClearCart = () => {
		dispatch(cartActions.clearCart());
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
							// Создаем уникальный ключ на основе id и selectedWeight
							const uniqueKey = `${item.id}-${item.selectedWeight?.value}`;

							return (
								<li key={uniqueKey} className="cart-item">
									<Link
										href={`/products/${item.slug}`}
										className="cart-item__image -ibg"
									>
										<StrapiImage
											src={item.image.url}
											alt={
												item.image.alternativeText ||
												'No alternative text provided'
											}
											fill
										/>
									</Link>
									<div className="cart-item__info">
										<h3>{item.title}</h3>
										<p>Цена: {item.price} ₽</p>

										{/* Отображаем выбранный вес */}
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
						<button onClick={handleClearCart}>Очистить корзину</button>
					</div>
				</>
			)}
		</div>
	);
}
