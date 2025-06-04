import { getBaseUrl } from '@/utils/getBaseUrl'

import { Metadata } from 'next'

import ProductsPage from '@/components/pages/products'

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Каталог товаров',
		description: 'Все товары, доступные в магазине',
		robots: 'index, follow',
		alternates: {
			canonical: `${getBaseUrl()}/products/`,
		},
		other: {
			keywords: 'каталог, товары, магазин',
		},
	}
}

export default function Page() {
	return <ProductsPage />
}
