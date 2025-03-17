import { BlockRenderer } from '@/components/BlockRenderer';
import { getPageBySlug } from '@/data/loaders';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

async function loader(slug?: string) {
	if (!slug) {
		notFound();
	}

	const { data } = await getPageBySlug(slug);

	if (!data || data.length === 0) {
		notFound();
	}

	return data[0];
}

interface PageProps {
	params?: { slug?: string };
}

// Функция для генерации метаданных
export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	if (!params?.slug) {
		return {
			title: 'Страница не найдена',
			description: 'Такой страницы не существует',
		};
	}

	const data = await loader(params.slug);

	return {
		title: data.title || 'Страница',
		description: data.description || 'Описание отсутствует',
	};
}

export default async function DynamicPageRoute({ params }: PageProps) {
	if (!params?.slug) {
		notFound();
	}

	const data = await loader(params.slug);
	const blocks = data?.blocks || [];

	return <BlockRenderer blocks={blocks} />;
}
