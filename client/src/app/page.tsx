import { getCachedHomePage } from '@/data/loaders'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlockRenderer } from '@/components/BlockRenderer'

async function loader() {
	const data = await getCachedHomePage()
	if (!data) notFound()

	return data.data
}

export async function generateMetadata(): Promise<Metadata> {
	const data = await getCachedHomePage()

	if (!data) {
		return {
			title: 'Главная страница',
			description: 'Описание отсутствует',
			robots: 'noindex, nofollow',
		}
	}

	return {
		title: data.title || 'Главная страница',
		description: data.description || 'Описание отсутствует',
		robots: data.robots || 'index, follow',
		other: data.keywords && data.keywords.trim() !== '' ? { keywords: data.keywords } : undefined,
		alternates: {
			canonical: data.canonicalUrl || 'https://localhost:3000/',
		},
	}
}

export default async function HomeRoute() {
	const { blocks } = await loader()

	return <BlockRenderer blocks={blocks} />
}
