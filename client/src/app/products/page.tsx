import { getCategories, getProducts } from '@/data/loaders'

import Products from '@/components/pages/products'

export default async function ProductsPage() {
	const categories = await getCategories()

	// Чтобы при первой загрузке сразу взять правильное perPage, передаем его
	const { items: initialProducts, pagination } = await getProducts(undefined, '', 1, 5)

	return (
		<div className="products-page">
			<div className="products-page__container">
				<h1 className="products-page__heading heading heading--centered">Наш ассортимент</h1>
				<Products
					categories={categories}
					initialProducts={initialProducts}
					initialTotalPages={pagination.pageCount}
				/>
			</div>
		</div>
	)
}
