import { getProductBySlug } from '@/data/loaders'

import { notFound } from 'next/navigation'

import ProductPage from '@/components/pages/product'

interface ProductPageProps {
	params: Promise<{ slug: string }>
}

export default async function Page({ params }: ProductPageProps) {
	const { slug } = await params
	const product = await getProductBySlug(slug)

	if (!product) notFound()

	return <ProductPage product={product} />
}
