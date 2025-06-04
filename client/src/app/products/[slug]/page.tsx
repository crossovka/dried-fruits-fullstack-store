import { getProductBySlug } from '@/data/loaders'
import { getBaseUrl } from '@/utils/getBaseUrl'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import ProductPage from '@/components/pages/product'

interface ProductPageProps {
	params: { slug: string }
}

async function load(slug: string) {
	const product = await getProductBySlug(slug)
	if (!product) notFound()
	return product
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string }
}): Promise<Metadata> {
	const product = await load(params.slug)

	return {
		title: product.title || 'Продукт',
		description: product.description || '',
		robots: product.robots || 'index, follow',
		alternates: {
			canonical: `${getBaseUrl()}/products/${params.slug}`,
		},
		other:
			product.keywords && product.keywords.trim() !== ''
				? {
						keywords: product.keywords,
					}
				: undefined,
	}
}

export default async function Page({ params }: ProductPageProps) {
	const product = await load(params.slug)
	return <ProductPage product={product} />
}
