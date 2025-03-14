'use client';

import { useState, useEffect, useCallback } from 'react';
import Tabs from '@/components/ui/Tabs';
import Search from '@/components/ui/Search';
import Pagination from '@/components/ui/Pagination';
import ProductCard from '@/components/ui/ProductCard';
import { getProducts } from '@/data/loaders';
import { Category, Product } from '@/types/types';

interface ProductsProps {
	categories: Category[];
	initialProducts: Product[];
	initialTotalPages: number;
}

export default function Products({
	categories,
	initialProducts,
	initialTotalPages,
}: ProductsProps) {
	const [activeCategory, setActiveCategory] = useState(
		categories[0]?.slug || ''
	);
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [products, setProducts] = useState<Product[]>(initialProducts);
	const [totalPages, setTotalPages] = useState(initialTotalPages);
	const PRODUCTS_PER_PAGE = 2; // Теперь на странице будет по 2 товара

	const fetchProducts = useCallback(async () => {
		try {
			const fetchedProducts = await getProducts(
				activeCategory,
				searchQuery,
				currentPage,
				PRODUCTS_PER_PAGE // Передаем ограничение товаров на страницу
			);
			setProducts(fetchedProducts.items);
			setTotalPages(fetchedProducts.pagination.pageCount);
		} catch (error) {
			console.error('Ошибка при загрузке продуктов:', error);
		}
	}, [activeCategory, searchQuery, currentPage]);

	useEffect(() => {
		setCurrentPage(1);
	}, [activeCategory]);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts, currentPage]);

	return (
		<div className="products-page__main products-page-main">
			<Tabs
				categories={categories}
				activeCategory={activeCategory}
				setActiveCategory={setActiveCategory}
				className="products-page-main__tabs"
			/>
			<div className="products-page__wrap">
				<div className="products-page-main__controls">
					<Search
						setSearchQuery={setSearchQuery}
						className="products-page-main__search"
					/>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						setCurrentPage={setCurrentPage}
						className="products-page-main__pagination"
					/>
				</div>
				<ul className="products-page-main__list">
					{products.length > 0 ? (
						products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))
					) : (
						<p className="products__not-found">Товары не найдены</p>
					)}
				</ul>
			</div>
		</div>
	);
}
