'use client'

import { getProducts } from '@/data/loaders'

import { useCallback, useEffect, useState } from 'react'

import Pagination from '@/components/ui/Pagination'
import ProductCard from '@/components/ui/ProductCard'
import Search from '@/components/ui/Search'
import Tabs from '@/components/ui/Tabs'

import type { Category, Product } from '@/types/types'

interface ProductsProps {
	categories: Category[]
	initialProducts: Product[]
	initialTotalPages: number
}

export default function Products({
	categories,
	initialProducts,
	initialTotalPages,
}: ProductsProps) {
	// По умолчанию activeCategory = 'all'
	const [activeCategory, setActiveCategory] = useState('all')
	const [searchQuery, setSearchQuery] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [products, setProducts] = useState<Product[]>(initialProducts)
	const [totalPages, setTotalPages] = useState(initialTotalPages)
	const PRODUCTS_PER_PAGE = 5

	const fetchProducts = useCallback(async () => {
		try {
			// При поиске игнорируем категорию, иначе фильтруем по activeCategory, если не 'all'
			const categorySlug = searchQuery
				? undefined
				: activeCategory === 'all'
					? undefined
					: activeCategory

			const fetched = await getProducts(categorySlug, searchQuery, currentPage, PRODUCTS_PER_PAGE)
			setProducts(fetched.items)
			setTotalPages(fetched.pagination.pageCount)
		} catch (e) {
			console.error('Ошибка при загрузке продуктов:', e)
		}
	}, [activeCategory, searchQuery, currentPage])

	useEffect(() => {
		setCurrentPage(1) // Сброс страницы при смене категории
	}, [activeCategory])

	useEffect(() => {
		fetchProducts()
	}, [fetchProducts, currentPage])

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
					<Search setSearchQuery={setSearchQuery} className="products-page-main__search" />
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
