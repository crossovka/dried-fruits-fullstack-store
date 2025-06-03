'use client'

import { useEffect, useState } from 'react'

import { useActions } from '@/hooks/useActions'

import { Button, WeightSelector } from '@/components/ui'

import { Product, WeightVariant } from '@/types/types'

type ProductClientProps = {
	product: Product
}

export default function ProductClient({ product }: ProductClientProps) {
	const { addItem } = useActions()

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
		<div className="product-page__controls">
			{hasWeights && (
				<WeightSelector
					weights={product.weightVariants}
					selectedWeight={selectedWeight}
					setSelectedWeight={setSelectedWeight}
					className="product-page__weights"
				/>
			)}

			<Button
				theme="primary"
				size="medium"
				onClick={handleAddToCart}
				disabled={!selectedWeight || selectedWeight.stock <= 0}
				className="product-page__add-to-cart"
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
