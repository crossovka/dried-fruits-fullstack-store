import { getProductBySlug, getProducts } from '@/data/loaders'
import { notFound } from 'next/navigation'

import ProductClient from '@/components/pages/product'
import { Fancybox, StrapiImage } from '@/components/ui'

interface ProductPageProps {
	params: { slug: string }
}

export async function generateStaticParams() {
	const { items: products } = await getProducts()

	if (!Array.isArray(products)) {
		console.error('Ошибка: ожидался массив продуктов, но получено:', products)
		return []
	}

	return products.map((product) => ({
		slug: product.slug,
	}))
}

export default async function ProductPage({ params }: ProductPageProps) {
	const product = await getProductBySlug(params.slug)

	if (!product) {
		notFound()
	}

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

				{/* Клиентская интерактивная часть */}
				<ProductClient weights={product.weights} product={product} />
			</div>
		</div>
	)
}
