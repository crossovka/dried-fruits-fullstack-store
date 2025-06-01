'use client'

import { getProducts } from '@/data/loaders'

import { useEffect, useState } from 'react'

import { Heading } from '@/components/blocks'
import ProductCard from '@/components/ui/ProductCard'
import Tabs from '@/components/ui/Tabs'

import styles from './Products.module.scss'

import { Category, Product } from '@/types/types'

interface ProductsProps {
	categories: Category[]
	initialProducts: Product[]
}

export default function ProductsClient({ categories, initialProducts }: ProductsProps) {
	const [activeCategory, setActiveCategory] = useState(categories[0].slug)
	const [products, setProducts] = useState(initialProducts)

	useEffect(() => {
		async function fetchData() {
			const { items } = await getProducts(activeCategory)
			setProducts(items)
		}

		fetchData()
	}, [activeCategory])

	return (
		<div className={styles.products}>
			<div className={styles.products__container}>
				<Heading text="Наш ассортимент" level="h1" isCentered id="products-heading" />
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
