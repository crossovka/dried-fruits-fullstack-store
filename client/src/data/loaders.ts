import { fetchAPI } from '@/utils/fetch-api'
import { getStrapiURL } from '@/utils/get-strapi-url'
import qs from 'qs'

import { cache } from 'react'

import { Category, PaginationMeta, Product } from '@/types/types'

// Формируем правильный запрос с параметрами для заполнения блоков
const homePageQuery = qs.stringify(
	{
		populate: {
			blocks: {
				populate: '*', // Заполнение всех вложенных полей в блоках
			},
		},
	},
	{ encode: false }, // Отключаем кодирование URL
)

// export async function getHomePage() {
// 	const path = '/api/home-page';
// 	const url = new URL(path, getStrapiURL());
// 	url.search = homePageQuery;

// 	try {
// 		const response = await fetchAPI(url.href, {
// 			method: 'GET',
// 			next: { revalidate: 60 }, // Кэширование на 60 секунд
// 		});

// 		console.log('Home page response:', response);
// 		return response;
// 	} catch (error) {
// 		console.error('Error fetching home page data:', error);
// 		throw error;
// 	}
// }

export const getCachedHomePage = cache(async function getCachedHomePage() {
	const path = '/api/home-page'
	const url = new URL(path, getStrapiURL())
	url.search = homePageQuery

	try {
		const response = await fetchAPI(url.href, {
			method: 'GET',
			next: { revalidate: 60 }, // Кэширование на 60 секунд
		})

		// console.log('Home page response:', response)
		return response
	} catch (error) {
		console.error('Error fetching home page data:', error)
		throw error
	}
})

const pageBySlugQuery = (slug: string) =>
	qs.stringify(
		{
			filters: {
				slug: { $eq: slug },
			},
			populate: {
				blocks: {
					populate: '*', // Загружаем все вложенные поля блоков
				},
			},
		},
		{ encode: false }, // Отключаем кодирование URL
	)

export async function getPageBySlug(slug: string) {
	const path = '/api/pages'
	const url = new URL(path, getStrapiURL())
	url.search = pageBySlugQuery(slug)

	try {
		const response = await fetchAPI(url.href, {
			method: 'GET',
			next: { revalidate: 60 },
		})

		// console.log(`[getPageBySlug] Response for slug "${slug}":`, response)
		return response
	} catch (error) {
		console.error(`Error fetching page data for slug "${slug}":`, error)
		throw error
	}
}

export async function getPages() {
	const path = '/api/pages'
	const url = new URL(path, getStrapiURL())
	url.searchParams.set('pagination[limit]', '100')

	try {
		const response = await fetchAPI(url.href, {
			method: 'GET',
			next: { revalidate: 60 },
		})

		console.log('[getPages] response:', response)

		return {
			data: response?.data || [],
			meta: response?.meta,
		}
	} catch (error) {
		console.error('[getPages] Error:', error)
		return { data: [], meta: {} }
	}
}

const globalSettingQuery = qs.stringify(
	{
		populate: {
			blocks: {
				populate: '*', // Заполнение всех вложенных полей в блоках
			},
		},
	},
	{ encode: false }, // Отключаем кодирование URL
)

export async function getGlobalSettings() {
	const path = '/api/global'
	const url = new URL(path, getStrapiURL())
	url.search = globalSettingQuery

	try {
		const response = await fetchAPI(url.href, {
			method: 'GET',
			next: { revalidate: 60 },
		})

		// console.log('getGlobalSettings Response:', response)
		return response
	} catch (error) {
		console.error('API Fetch Error:', error)
		throw new Error('Failed to fetch global settings')
	}
}

// Функция для получения категорий
export async function getCategories(): Promise<Category[]> {
	const path = '/api/categories'
	const url = new URL(path, getStrapiURL())

	try {
		const response = await fetchAPI(url.href, {
			method: 'GET',
			next: { revalidate: 60 },
		})

		// console.log('Категории:', response.data)
		return response.data
	} catch (error) {
		console.error('Ошибка при получении категорий:', error)
		throw error
	}
}

// Функция для получения продуктов
type Filters = {
	$or?: Array<{
		title?: { $containsi: string }
		description?: { $containsi: string }
		slug?: { $containsi: string }
	}>
	category?: {
		slug: { $eq: string }
	}
	[key: string]: unknown
}

export async function getProducts(
	categorySlug?: string,
	query: string = '',
	page: number = 1,
	perPage: number = 2,
): Promise<{ items: Product[]; pagination: PaginationMeta }> {
	const url = new URL('/api/products', getStrapiURL())

	const filters: Filters = {}

	if (query.trim()) {
		// Поиск нечувствительный к регистру по title и description
		filters.$or = [
			{ title: { $containsi: query } },
			{ description: { $containsi: query } },
			// Можешь добавить сюда другие поля, например:
			// { slug: { $containsi: query } }
		]
	}

	if (categorySlug) {
		filters.category = {
			slug: { $eq: categorySlug },
		}
	}

	const queryObj = {
		sort: ['createdAt:desc'],
		filters,
		pagination: {
			pageSize: perPage,
			page,
		},
		populate: '*',
	}

	url.search = qs.stringify(queryObj) // без encode:false, чтобы qs нормально кодировал

	// console.log('Fetching products with params:', { categorySlug, query, page, perPage })
	// console.log('Generated URL:', url.href)

	try {
		const response = await fetchAPI(url.href, {
			method: 'GET',
			next: { revalidate: 60 },
		})

		if (!response.data || response.data.length === 0) {
			// console.log('No products found for query:', query)
			return {
				items: [],
				pagination: { page, pageSize: perPage, pageCount: 0, total: 0 },
			}
		}

		// console.log(`Fetched ${response.data.length} products`)

		return {
			items: response.data,
			pagination: response.meta.pagination,
		}
	} catch (error) {
		// console.error('Error fetching products:', error)
		throw error
	}
}

// Функция для получения продукта по слагу
export async function getProductBySlug(slug: string): Promise<Product | null> {
	const path = `/api/products`
	const url = new URL(path, getStrapiURL())

	url.search = qs.stringify(
		{
			filters: { slug: { $eq: slug } },
			populate: '*',
		},
		{ encode: false },
	)

	try {
		const response = await fetchAPI(url.href, {
			method: 'GET',
			next: { revalidate: 60 },
		})

		if (!response.data || response.data.length === 0) {
			console.warn(`Продукт со слагом "${slug}" не найден.`)
			return null
		}

		// console.log('Server Response getProductBySlug:', response)
		return response.data[0]
	} catch (error) {
		console.error('Error fetching product getProductBySlug:', error)
		throw error
	}
}
