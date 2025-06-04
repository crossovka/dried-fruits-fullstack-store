import { getPageBySlug } from '@/data/loaders'
import { getPages } from '@/data/loaders'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlockRenderer } from '@/components/BlockRenderer'

import { Page, PagesResponse } from '@/types/types'

async function loader(slug: string): Promise<Page> {
	if (!slug) notFound()

	const response = await getPageBySlug(slug)
	const { data } = response as { data: Page[] }

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

	// // Логируем данные всех страниц при загрузке
	// const allPagesResponse = await getPages()
	// console.log('getPages response:', allPagesResponse)

	const data = await loader(slug)
	return <BlockRenderer blocks={data?.blocks || []} />
}

// Заставляет Next.js сгенерировать статически все страницы (например, /o-nas, /nashi-magaziny) при билде или обновлении.
export async function generateStaticParams() {
	const response = (await getPages()) as PagesResponse

	console.log('getPages response:', response)

	return response.data.map((page) => ({
		slug: page.slug,
	}))
}
