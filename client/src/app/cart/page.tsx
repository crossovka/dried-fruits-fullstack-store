import { getBaseUrl } from '@/utils/getBaseUrl'

import { Metadata } from 'next'

import CartPage from '@/components/pages/cart'

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Корзина',
		description: 'Товары, добавленные в корзину',
		robots: 'index, follow',
		alternates: {
			canonical: `${getBaseUrl()}/cart/`,
		},
		other: {
			keywords: 'корзина, покупки, заказ',
		},
	}
}

export default function Page() {
	return <CartPage />
}
