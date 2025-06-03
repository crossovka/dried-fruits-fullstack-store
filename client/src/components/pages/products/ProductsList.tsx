'use client'

import { Pagination, ProductCard, Search, Tabs } from '@/components/ui'

import { useProducts } from './useProducts'

import type { Category, Product } from '@/types/types'

interface ProductsProps {
	categories: Category[]
	initialProducts: Product[]
	initialTotalPages: number
}

export default function ProductsList({
	categories,
	initialProducts,
	initialTotalPages,
}: ProductsProps) {
	const {
		activeCategory,
		setActiveCategory,
		searchQuery,
		setSearchQuery,
		currentPage,
		setCurrentPage,
		products,
		totalPages,
	} = useProducts({
		initialProducts,
		initialTotalPages,
	})

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
						value={searchQuery}
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
						products.map((product) => <ProductCard key={product.id} product={product} />)
					) : (
						<p className="products__not-found">Товары не найдены</p>
					)}
				</ul>
			</div>
		</div>
	)
}
