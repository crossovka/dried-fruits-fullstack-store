import { getProductBySlug } from '@/data/loaders'

import { notFound } from 'next/navigation'

import ProductPage from '@/components/pages/product'

interface ProductPageProps {
	params: { slug: string }
}

export default async function Page({ params }: ProductPageProps) {
	const product = await getProductBySlug(params.slug)

	if (!product) notFound()

	return <ProductPage product={product} />
}
