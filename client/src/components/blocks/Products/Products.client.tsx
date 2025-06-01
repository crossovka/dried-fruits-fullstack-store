'use client'

import { getProducts } from '@/data/loaders'

import { useEffect, useState } from 'react'

import { Heading } from '@/components/blocks'
import ProductCard from '@/components/ui/ProductCard'
import Tabs from '@/components/ui/Tabs'

import styles from './Products.module.scss'

import { Category, Product } from '@/types/types'

interface ProductsProps {
	title: string
	categories: Category[]
	initialProducts: Product[]
	perPage: number
}

export default function ProductsClient({ title, categories, initialProducts, perPage }: ProductsProps) {
	const [activeCategory, setActiveCategory] = useState('all')
	const [products, setProducts] = useState(initialProducts)

	useEffect(() => {
		async function fetchData() {
			const categorySlug = activeCategory === 'all' ? undefined : activeCategory
			const { items } = await getProducts(categorySlug, '', 1, perPage)
			setProducts(items)
		}
		fetchData()
	}, [activeCategory, perPage])

	return (
		<div className={styles.products}>
			<div className={styles.products__container}>
				<Heading text={title} level="h1" isCentered id="products-heading" />
				<Tabs
					categories={categories}
					activeCategory={activeCategory}
					setActiveCategory={setActiveCategory}
					className={styles.products__tabs}
				/>
				<ul className={styles.products__list}>
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</ul>
			</div>
		</div>
	)
}
