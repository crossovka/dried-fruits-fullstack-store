'use client';

import { useEffect, useState } from 'react';

import { useActions } from '@/hooks/useActions';

import { StrapiImage } from '../ui/StrapiImage';
import WeightSelector from '../ui/WeightSelector';
import Fancybox from '@/components/Fancybox';

import { Product } from '@/types/types';

type ProductClientProps = {
	product: Product;
};

export default function ProductClient({ product }: ProductClientProps) {
	const { addItem } = useActions();

	const hasWeights = product.weights && product.weights.weights.length > 0;
	const [selectedWeight, setSelectedWeight] = useState<{
		value: number;
		unit: string;
	} | null>(null);

	// Устанавливаем первый вес по умолчанию
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
		<div className="product-page__container">
			<div className="product-page__wrap">
				<Fancybox
					className="product-page__image -ibg"
					delegate="[data-fancybox]"
				>
					<StrapiImage
						src={product.image.url}
						alt={product.image.alternativeText || product.title}
						fill
						data-fancybox="gallery"
					/>
				</Fancybox>
				<div className="product-page__content">
					<h1>{product.title}</h1>
					<p>{product.description}</p>
					<div className="product-page__content-prices h3">
						<span>{product.price} Р</span>
						{product.old_price && (
							<span className="product-page__old-price">
								{product.old_price} Р
							</span>
						)}
					</div>
				</div>
			</div>
			<div className="product-page__controls">
				{hasWeights && (
					<WeightSelector
						weights={product.weights.weights}
						selectedWeight={selectedWeight}
						setSelectedWeight={setSelectedWeight}
						className="product-page__weights"
					/>
				)}

				<button
					className="product-page__add-to-cart btn btn--primary"
					onClick={handleAddToCart}
					disabled={!selectedWeight}
				>
					{selectedWeight
						? `Добавить в корзину (${selectedWeight.value} ${selectedWeight.unit})`
						: 'Выберите вес'}
				</button>
			</div>
		</div>
	);
}
