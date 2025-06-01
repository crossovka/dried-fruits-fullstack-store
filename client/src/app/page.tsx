import { getCachedHomePage, getCategories, getProducts } from '@/data/loaders'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlockRenderer } from '@/components/BlockRenderer'
import ProductsList from '@/components/integrated/ProductsList'

async function loader() {
	const data = await getCachedHomePage()
	if (!data) notFound()

	const categories = await getCategories()

	// Проверяем, есть ли хотя бы одна категория
	if (categories.length === 0) {
		console.error('Ошибка: нет доступных категорий!')
		return { ...data.data, categories, initialProducts: [] }
	}

	const initialCategory = categories[0].slug // Гарантируем, что это строка
	const initialProducts = await getProducts(initialCategory)

	return { ...data.data, categories, initialProducts }
}

export async function generateMetadata(): Promise<Metadata> {
	const { title, description } = await getCachedHomePage()
	return {
		title,
		description,
	}
}

export default async function HomeRoute() {
	const { blocks, categories, initialProducts } = await loader()

	return (
		<>
			<BlockRenderer blocks={blocks} />
			<ProductsList categories={categories} initialProducts={initialProducts} />
		</>
	)
}
