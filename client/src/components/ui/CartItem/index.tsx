import Link from 'next/link'

import { CartItem as ICartItem } from '@/store/cart/cart.types'

import { StrapiImage } from '@/components/ui'

interface Props {
	item: ICartItem
	onIncrease: () => void
	onDecrease: () => void
	onRemove: () => void
}

export function CartItem({ item, onIncrease, onDecrease, onRemove }: Props) {
	return (
		<li className="cart-item">
			<Link href={`/products/${item.slug}`} className="cart-item__image -ibg">
				<StrapiImage src={item.image.url} alt={item.image.alternativeText || 'No alt'} fill />
			</Link>
			<div className="cart-item__info">
				<h3>{item.title}</h3>
				<p>Цена: {item.price} ₽</p>
				<p>
					Вес: {item.selectedWeight?.value} {item.selectedWeight?.unit}
				</p>
			</div>
			<div className="cart-item__controls">
				<button onClick={onDecrease}>➖</button>
				<span>{item.quantity}</span>
				<button onClick={onIncrease}>➕</button>
				<button onClick={onRemove}>🗑</button>
			</div>
		</li>
	)
}
