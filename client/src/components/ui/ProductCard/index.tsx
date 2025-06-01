'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

import { useActions } from '@/hooks/useActions';

import { StrapiImage, WeightSelector } from '@/components/ui';

import { Product } from '@/types/types';

import styles from './ProductCard.module.scss';

type ProductCardProps = {
	product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
	const { addItem } = useActions();

	const hasWeights = product.weights && product.weights.weights.length > 0;

	const [selectedWeight, setSelectedWeight] = useState<{
		value: number;
		unit: string;
	} | null>(null);

	useEffect(() => {
		if (hasWeights && product.weights.weights.length > 0) {
			setSelectedWeight(product.weights.weights[0]);
		}
	}, [hasWeights, product.weights.weights]);

	const handleAddToCart = () => {
		if (!selectedWeight) return;
		addItem({ ...product, quantity: 1, selectedWeight });
	};

	return (
		<div className={styles['product-card']}>
			<Link
				href={`/products/${product.slug}`}
				className={`${styles['product-card__image']} -ibg`}
			>
				<StrapiImage
					src={product.image.url}
					alt={product.image.alternativeText || product.title}
					fill
				/>
			</Link>

			<h3 className={styles['product-card__title']}>
				<Link href={`/products/${product.slug}`}>{product.title}</Link>
			</h3>

			<p className={styles['product-card__description']}>
				{product.description}
			</p>

			<div className={styles['product-card__prices']}>
				<span>{product.price} Р</span>
				{product.old_price && (
					<span className={styles['product-card__old-price']}>
						{product.old_price} Р
					</span>
				)}
			</div>

			{hasWeights && (
				<WeightSelector
					weights={product.weights.weights}
					selectedWeight={selectedWeight}
					setSelectedWeight={setSelectedWeight}
					className={styles['product-card__weights']}
				/>
			)}

			<button
				className={`${styles['product-card__add-to-cart']} btn btn--primary`}
				onClick={handleAddToCart}
				disabled={!selectedWeight}
			>
				{selectedWeight
					? `Добавить в корзину (${selectedWeight.value} ${selectedWeight.unit})`
					: 'Выберите вес'}
			</button>
		</div>
	);
}
