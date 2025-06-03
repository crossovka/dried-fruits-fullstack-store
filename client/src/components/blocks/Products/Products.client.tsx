'use client'

import { getProducts } from '@/data/loaders'

import { useEffect, useState } from 'react'

import { Heading } from '@/components/blocks'
import { Pagination, ProductCard, Tabs } from '@/components/ui'

import styles from './Products.module.scss'

import { Category, Product } from '@/types/types'

interface ProductsProps {
	title: string
	categories: Category[]
	initialProducts: Product[]
	perPage: number
}

export default function ProductsClient({
	title,
	categories,
	initialProducts,
	perPage,
}: ProductsProps) {
	const [activeCategory, setActiveCategory] = useState('all')
	const [products, setProducts] = useState(initialProducts)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)

	useEffect(() => {
		async function fetchData() {
			const categorySlug = activeCategory === 'all' ? undefined : activeCategory
			const { items, pagination } = await getProducts(categorySlug, '', currentPage, perPage)

			setProducts(items)
			setTotalPages(pagination.pageCount)
		}

		fetchData()
	}, [activeCategory, perPage, currentPage])

	const handleCategoryChange = (slug: string) => {
		setActiveCategory(slug)
		setCurrentPage(1) // сброс страницы при смене категории
	}

	return (
		<div className={styles.products}>
			<div className={styles.products__container}>
				<Heading text={title} level="h1" isCentered id={1} />

				<Tabs
					categories={categories}
					activeCategory={activeCategory}
					setActiveCategory={handleCategoryChange}
					className={styles.products__tabs}
				/>

				<ul className={styles.products__list}>
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</ul>

				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					setCurrentPage={setCurrentPage}
					className={styles.products__pagination}
				/>
			</div>
		</div>
	)
}
