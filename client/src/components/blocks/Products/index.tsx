import { getCategories, getProducts } from '@/data/loaders'

import ProductsClient from './Products.client'

import { ProductsProps } from '@/types/types'

export async function ProductsBlock({ title, perPage }: Readonly<ProductsProps>) {
	const categories = await getCategories()

	// Чтобы при первой загрузке сразу взять правильное perPage, передаем его
	const { items: initialProducts } = await getProducts(undefined, '', 1, perPage)

	return (
		<ProductsClient
			title={title}
			categories={categories}
			initialProducts={initialProducts}
			perPage={perPage}
		/>
	)
}
