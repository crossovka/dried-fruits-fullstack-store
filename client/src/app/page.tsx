import { BlockRenderer } from '@/components/BlockRenderer';
import ProductsList from '@/components/integrated/ProductsList';
import { getHomePage, getCategories, getProducts } from '@/data/loaders';
import { notFound } from 'next/navigation';

async function loader() {
	const data = await getHomePage();
	if (!data) notFound();

	const categories = await getCategories();

	// Проверяем, есть ли хотя бы одна категория
	if (categories.length === 0) {
		console.error('Ошибка: нет доступных категорий!');
		return { ...data.data, categories, initialProducts: [] };
	}

	const initialCategory = categories[0].slug; // Гарантируем, что это строка
	const initialProducts = await getProducts(initialCategory);

	return { ...data.data, categories, initialProducts };
}

export default async function HomeRoute() {
	const { blocks, categories, initialProducts } = await loader();

	return (
		<>
			{/* {data.title}
			{data.description} */}
			<BlockRenderer blocks={blocks} />
			<ProductsList categories={categories} initialProducts={initialProducts} />
		</>
	);
}
