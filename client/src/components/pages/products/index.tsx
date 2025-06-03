import { getCategories, getProducts } from '@/data/loaders'

import { Heading } from '@/components/blocks'

import ProductsList from './ProductsList'

export default async function ProductsPage() {
	const categories = await getCategories()
	const { items: initialProducts, pagination } = await getProducts(undefined, '', 1, 5)

	return (
		<div className="products-page">
			<div className="products-page__container">
				<Heading text="Наш ассортимент" isCentered level="h1" id={0} />
				<ProductsList
					categories={categories}
					initialProducts={initialProducts}
					initialTotalPages={pagination.pageCount}
				/>
			</div>
		</div>
	)
}
