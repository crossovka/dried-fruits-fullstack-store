import { getPageBySlug } from '@/data/loaders'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlockRenderer } from '@/components/BlockRenderer'

async function loader(slug: string) {
	if (!slug) notFound()

	const { data } = await getPageBySlug(slug)
	if (!data?.length) notFound()

	return data[0]
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params

	try {
		const data = await loader(slug)

		return {
			title: data.title || 'Страница',
			description: data.description || 'Описание отсутствует',
			alternates: {
				canonical: data.canonicalUrl || `https://localhost:3000/${slug}`,
			},
			robots: data.robots || 'index, follow',
			other:
				data.keywords && data.keywords.trim() !== ''
					? {
							keywords: data.keywords,
						}
					: undefined,
		}
	} catch {
		return {
			title: 'Страница не найдена',
			description: 'Такой страницы не существует',
			robots: 'noindex, nofollow',
		}
	}
}

export default async function DynamicPageRoute({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const data = await loader(slug)
	return <BlockRenderer blocks={data?.blocks || []} />
}
