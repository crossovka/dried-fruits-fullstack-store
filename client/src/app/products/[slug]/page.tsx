import { getProductBySlug } from '@/data/loaders'
import { getBaseUrl } from '@/utils/getBaseUrl'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import ProductPage from '@/components/pages/product'

async function load(slug: string) {
	if (!slug) notFound()

	const product = await getProductBySlug(slug)
	if (!product) notFound()

	return product
}

// ❗ Promise<{ slug: string }> — костыль????
export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params

	const product = await load(slug)

	return {
		title: product.title || 'Продукт',
		description: product.description || '',
		robots: product.robots || 'index, follow',
		alternates: {
			canonical: `${getBaseUrl()}/products/${slug}`,
		},
		other:
			product.keywords && product.keywords.trim() !== ''
				? {
						keywords: product.keywords,
					}
				: undefined,
	}
}

export default async function ProductPageRoute({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const product = await load(slug)

	return <ProductPage product={product} />
}
