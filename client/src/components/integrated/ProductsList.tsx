'use client'

import { getProducts } from '@/data/loaders'

import { useEffect, useState } from 'react'

import ProductCard from '../ui/ProductCard'
import Tabs from '../ui/Tabs'

import { Category, Product } from '@/types/types'

interface ProductsProps {
	categories: Category[]
	initialProducts: Product[]
}

export default function ProductsList({ categories, initialProducts }: ProductsProps) {
	const [activeCategory, setActiveCategory] = useState(categories[0].slug)
	const [products, setProducts] = useState<Product[]>(initialProducts)

	useEffect(() => {
		console.log('Запрашиваем продукты для категории:', activeCategory)
		async function fetchProducts() {
			const { items } = await getProducts(activeCategory) // Берем только items
			setProducts(items) // Передаем массив продуктов
		}
		fetchProducts()
	}, [activeCategory])

	return (
		<div className="products">
			<div className="products__container">
				<h2 className="products__heading heading h1 heading--centered">Наш ассортимент</h2>
				<Tabs
					categories={categories}
					activeCategory={activeCategory}
					setActiveCategory={setActiveCategory}
					className="products__tabs"
				/>
				<ul className="products__list">
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
