import { getProducts, getCategories } from '@/data/loaders';
import Products from '@/components/pages/products/Products';
import { Category } from '@/types/types';

export default async function ProductsPage() {
	// Загружаем категории и продукты
	const categories: Category[] = await getCategories();
	const { items: products, pagination } = await getProducts(); // Добавляем pagination

	return (
		<div className="products-page">
			<div className="products-page__container">
				<h2 className="products-page__heading heading h1 heading--centered">
					Наш ассортимент
				</h2>
				<Products
					categories={categories}
					initialProducts={products}
					initialTotalPages={pagination.pageCount} // Передаём total страниц
				/>
			</div>
		</div>
	);
}
