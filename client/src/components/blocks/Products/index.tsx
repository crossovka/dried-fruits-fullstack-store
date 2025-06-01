import { getCategories, getProducts } from '@/data/loaders'

import ProductsClient from './Products.client'

export async function ProductsBlock() {
	const categories = await getCategories()
	const { items: initialProducts } = await getProducts(categories[0].slug)

	return <ProductsClient categories={categories} initialProducts={initialProducts} />
}
