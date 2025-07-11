import { MouseEventHandler, ReactNode } from 'react'

export type Block =
	| HeroSectionProps
	| HeadingProps
	| ParagraphProps
	| ParagraphWithImageProps
	| ImageBlockProps
	| ProductsProps
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| Base<ComponentType, any> // ✅ Добавляем базовый тип

type ComponentType =
	| 'blocks.hero-section'
	| 'blocks.heading'
	| 'blocks.paragraph-with-image'
	| 'blocks.paragraph'
	| 'blocks.full-image'
	| 'blocks.subscribe'
	| 'blocks.image'
	| 'blocks.contacts'
	| 'blocks.products'
	| 'layout.header'

interface Base<T extends ComponentType, D extends object = Record<string, unknown>> {
	id: number
	__component?: T
	documentId?: string
	createdAt?: string
	updatedAt?: string
	publishedAt?: string
	data?: D
}

export interface LinkProps {
	id: number
	text: string
	href: string
	isExternal: boolean
}

export interface ImageProps {
	id: number
	documentId: string
	url: string
	alternativeText: string
}

// Blocks ========================================================================================================================================================

export type ButtonTheme = 'primary' | 'secondary' | 'tertiary'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps {
	text?: string
	children?: ReactNode
	href?: string
	isExternal?: boolean
	theme?: ButtonTheme
	size?: ButtonSize
	onClick?: MouseEventHandler<HTMLButtonElement>
	disabled?: boolean
	className?: string
	type?: 'button' | 'submit' | 'reset'
}

export interface HeadingProps extends Base<'blocks.heading'> {
	text: string
	isCentered: boolean
	level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export interface HeroSectionProps extends Base<'blocks.hero-section'> {
	heading?: string
	description: string
	image: ImageProps
}

export interface ParagraphWithImageProps extends Base<'blocks.paragraph-with-image'> {
	content: string
	image: ImageProps
	reversed?: boolean
}

export interface ParagraphProps extends Base<'blocks.paragraph'> {
	content: string
}

export interface ImageBlockProps extends Base<'blocks.image'> {
	image: ImageProps
}
export interface ContactsProps extends Base<'blocks.contacts'> {
	title: string
	image: ImageProps
}

export interface ProductsProps extends Base<'blocks.products'> {
	title: string
	perPage: number
}
//========================================================================================================================================================
export interface Page {
	id: number
	documentId: string
	title: string
	description: string
	slug: string
	createdAt: string // ISO дата
	updatedAt: string // ISO дата
	publishedAt: string // ISO дата
	keywords: string
	robots: string
	canonicalUrl: string
	blocks?: Block[]
}
export interface PagesResponse {
	data: Page[]
	meta: {
		pagination: {
			start: number
			limit: number
			total: number
		}
	}
}

//========================================================================================================================================================
export interface PaginationMeta {
	page: number
	pageSize: number
	pageCount: number
	total: number
}
//========================================================================================================================================================
export interface Category {
	id: number
	documentId: string
	title: string
	slug: string
	description: string
	createdAt: string
	updatedAt: string
	publishedAt: string
}

export type Categories = Category[]

export interface WeightVariant {
	value: number
	unit: string
	stock: number // поле для отслеживания остатков
}

export type RobotsMeta =
	| 'index, follow'
	| 'noindex, nofollow'
	| 'noindex, follow'
	| 'index, nofollow'

export interface Product {
	id: number
	documentId: string
	title: string
	slug: string
	description: string
	price: number
	old_price?: number
	image: ImageProps
	category: Category

	robots?: RobotsMeta
	keywords?: string

	weightVariants: WeightVariant[]

	createdAt: string
	updatedAt: string
	publishedAt: string
}

export type Products = Product[]

export interface User {
	id: number | string
	username?: string
	email?: string
	confirmed?: boolean
	blocked?: boolean
	// Можно добавить поля из схемы, если нужно
}

export interface OrderItem {
	title: string
	quantity: number
	price: number
	selectedWeight?: {
		value: number | string
		unit: string
	}
}

// Если нет точной структуры paymentInfo, лучше unknown или Record<string, unknown>
export type PaymentInfo = Record<string, unknown>

export interface Order {
	id: number | string
	createdAt: string
	updatedAt?: string
	orderStatus: 'Ожидает оплаты' | 'Оплачен' | 'Отправлен' | 'Доставлен' | 'Отменён'
	address: string
	totalPrice: number
	items: OrderItem[]
	paymentInfo: PaymentInfo
	user: User
}
