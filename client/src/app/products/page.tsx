import { getCategories, getProducts } from '@/data/loaders'

import { Heading } from '@/components/blocks'
import Products from '@/components/pages/products'

export default async function ProductsPage() {
	const categories = await getCategories()

	// Чтобы при первой загрузке сразу взять правильное perPage, передаем его
	const { items: initialProducts, pagination } = await getProducts(undefined, '', 1, 5)

	return (
		<div className="products-page">
			<div className="products-page__container">
				<Heading text={'Наш ассортимент'} isCentered level={'h1'} id={0} />
				<Products
					categories={categories}
					initialProducts={initialProducts}
					initialTotalPages={pagination.pageCount}
				/>
			</div>
		</div>
	)
}
