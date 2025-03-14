import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/data/loaders';
import ProductClient from '@/components/integrated/ProductClient';

interface ProductPageProps {
	params: { slug: string };
}

// Функция для генерации статических путей
export async function generateStaticParams() {
	const { items: products } = await getProducts();

	// Проверяем, что products действительно является массивом
	if (!Array.isArray(products)) {
		console.error('Ошибка: ожидался массив продуктов, но получено:', products);
		return []; // Возвращаем пустой массив в случае ошибки
	}

	return products.map((product) => ({
		slug: product.slug,
	}));
}

// Серверный компонент для страницы продукта
export default async function ProductPage({ params }: ProductPageProps) {
	const product = await getProductBySlug(params.slug);

	if (!product) {
		notFound();
	}

	return (
		<div className="product-page">
			<div className="product-page__container">
				{/* Передаем product в клиентский компонент */}
				<ProductClient product={product} />
			</div>
		</div>
	);
}
