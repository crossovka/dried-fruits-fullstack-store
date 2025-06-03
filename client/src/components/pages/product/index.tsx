import { Fancybox, StrapiImage } from '@/components/ui'

import ProductClient from './ProductClient'

import { Product } from '@/types/types'

type ProductPageProps = {
	product: Product
}

export default function ProductPage({ product }: ProductPageProps) {
	return (
		<div className="product-page">
			<div className="product-page__container">
				<div className="product-page__wrap">
					<Fancybox className="product-page__image -ibg" delegate="[data-fancybox]">
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
								<span className="product-page__old-price">{product.old_price} Р</span>
							)}
						</div>
					</div>
				</div>

				<ProductClient product={product} />
			</div>
		</div>
	)
}
