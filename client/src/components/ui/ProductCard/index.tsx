'use client'

import Link from 'next/link'

import { useEffect, useState } from 'react'

import { useActions } from '@/hooks/useActions'

import { Button, StrapiImage, WeightSelector } from '@/components/ui'

import styles from './ProductCard.module.scss'

import { Product, WeightVariant } from '@/types/types'

type ProductCardProps = {
	product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
	const { addItem } = useActions()

	console.log('PRODUCT DATA:', product)

	const hasWeights = product.weightVariants && product.weightVariants.length > 0

	const [selectedWeight, setSelectedWeight] = useState<WeightVariant | null>(null)

	useEffect(() => {
		if (hasWeights) {
			setSelectedWeight(product.weightVariants[0])
		} else {
			setSelectedWeight(null)
		}
	}, [hasWeights, product.weightVariants])

	const handleAddToCart = () => {
		if (!selectedWeight || selectedWeight.stock <= 0) return
		addItem({ ...product, quantity: 1, selectedWeight })
	}

	return (
		<div className={styles['product-card']}>
			<Link href={`/products/${product.slug}`} className={`${styles['product-card__image']} -ibg`}>
				<StrapiImage
					src={product.image.url}
					alt={product.image.alternativeText || product.title}
					fill
				/>
			</Link>

			<h3 className={styles['product-card__title']}>
				<Link href={`/products/${product.slug}`}>{product.title}</Link>
			</h3>

			<p className={styles['product-card__description']}>{product.description}</p>

			<div className={styles['product-card__prices']}>
				<span>{product.price} Р</span>
				{product.old_price && (
					<span className={styles['product-card__old-price']}>{product.old_price} Р</span>
				)}
			</div>

			{hasWeights && (
				<WeightSelector
					weights={product.weightVariants}
					selectedWeight={selectedWeight}
					setSelectedWeight={setSelectedWeight}
					className={styles['product-card__weights']}
				/>
			)}

			<Button
				theme="primary"
				size="medium"
				onClick={handleAddToCart}
				disabled={!selectedWeight || selectedWeight.stock <= 0}
			>
				{selectedWeight
					? selectedWeight.stock > 0
						? `Добавить в корзину (${selectedWeight.value} ${selectedWeight.unit})`
						: `Нет в наличии (${selectedWeight.value} ${selectedWeight.unit})`
					: 'Выберите вес'}
			</Button>
		</div>
	)
}
