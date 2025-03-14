import Link from 'next/link';
import { useState, useEffect } from 'react';

import { StrapiImage } from './StrapiImage';
import WeightSelector from './WeightSelector';

import { useActions } from '@/hooks/useActions';
import { Product } from '@/types/types';

type ProductCardProps = {
	product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
	const { addItem } = useActions();

	// Проверяем, есть ли веса у продукта
	const hasWeights = product.weights && product.weights.weights.length > 0;

	const [selectedWeight, setSelectedWeight] = useState<{
		value: number;
		unit: string;
	} | null>(null);

	// Устанавливаем первый вес по умолчанию
	useEffect(() => {
		if (hasWeights && product.weights.weights.length > 0) {
			setSelectedWeight(product.weights.weights[0]); // выбираем первый вес
		}
	}, [hasWeights, product.weights.weights]);

	const handleAddToCart = () => {
		if (!selectedWeight) return;
		addItem({ ...product, quantity: 1, selectedWeight });
	};

	return (
		<div className="product-card">
			<Link
				href={`/products/${product.slug}`}
				className="product-card__image -ibg"
			>
				<StrapiImage
					src={product.image.url}
					alt={product.image.alternativeText || product.title}
					fill
				/>
			</Link>

			<h3 className="product-card__title">
				<Link href={`/products/${product.slug}`}>{product.title}</Link>
			</h3>

			<p className="product-card__description">{product.description}</p>

			<div className="product-card__prices">
				<span>{product.price} Р</span>
				{product.old_price && (
					<span className="product-card__old-price">{product.old_price} Р</span>
				)}
			</div>

			{/* Убедитесь, что есть веса и передаем нужные пропсы */}
			{hasWeights && (
				<WeightSelector
					weights={product.weights.weights}
					selectedWeight={selectedWeight}
					setSelectedWeight={setSelectedWeight}
					className="product-card__weights"
				/>
			)}

			<button
				className="product-card__add-to-cart btn btn--primary"
				onClick={handleAddToCart}
				disabled={!selectedWeight} // Запрещаем добавлять, если не выбран вес
			>
				{selectedWeight
					? `Добавить в корзину (${selectedWeight.value} ${selectedWeight.unit})`
					: 'Выберите вес'}
			</button>
		</div>
	);
}
