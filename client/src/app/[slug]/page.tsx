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
		}
	} catch {
		return {
			title: 'Страница не найдена',
			description: 'Такой страницы не существует',
		}
	}
}

export default async function DynamicPageRoute({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const data = await loader(slug)
	return <BlockRenderer blocks={data?.blocks || []} />
}
