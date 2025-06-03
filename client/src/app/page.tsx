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
	const { title, description } = await getCachedHomePage()
	return {
		title,
		description,
	}
}

export default async function HomeRoute() {
	const { blocks } = await loader()

	return <BlockRenderer blocks={blocks} />
}
