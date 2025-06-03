import { getProducts } from '@/data/loaders'

import { useCallback, useEffect, useState } from 'react'

import type { Product } from '@/types/types'

interface UseProductsProps {
	initialProducts: Product[]
	initialTotalPages: number
	initialCategory?: string
	initialSearchQuery?: string
	initialPage?: number
	productsPerPage?: number
}

export function useProducts({
	initialProducts,
	initialTotalPages,
	initialCategory = 'all',
	initialSearchQuery = '',
	initialPage = 1,
	productsPerPage = 5,
}: UseProductsProps) {
	const [activeCategory, setActiveCategory] = useState(initialCategory)
	const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
	const [currentPage, setCurrentPage] = useState(initialPage)
	const [products, setProducts] = useState<Product[]>(initialProducts)
	const [totalPages, setTotalPages] = useState(initialTotalPages)

	const fetchProducts = useCallback(async () => {
		try {
			const categorySlug = searchQuery
				? undefined
				: activeCategory === 'all'
					? undefined
					: activeCategory

			const fetched = await getProducts(categorySlug, searchQuery, currentPage, productsPerPage)
			setProducts(fetched.items)
			setTotalPages(fetched.pagination.pageCount)
		} catch (e) {
			console.error('Ошибка при загрузке продуктов:', e)
		}
	}, [activeCategory, searchQuery, currentPage, productsPerPage])

	useEffect(() => {
		setCurrentPage(1)
	}, [activeCategory])

	useEffect(() => {
		fetchProducts()
	}, [fetchProducts, currentPage])

	return {
		activeCategory,
		setActiveCategory,
		searchQuery,
		setSearchQuery,
		currentPage,
		setCurrentPage,
		products,
		totalPages,
	}
}
