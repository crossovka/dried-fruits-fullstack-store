import { MouseEventHandler, ReactNode } from 'react'

export type Block =
	| HeroSectionProps
	| HeadingProps
	| ParagraphProps
	| ParagraphWithImageProps
	| ImageBlockProps
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

export interface ProductsProps extends Base<'blocks.contacts'> {
	title: string
	perPage: number
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

	weightVariants: WeightVariant[]

	createdAt: string
	updatedAt: string
	publishedAt: string
}

export type Products = Product[]

export interface OrderItem {
	title: string
	quantity: number
	price: number
	selectedWeight?: {
		value: number | string
		unit: string
	}
}

export interface Order {
	id: number | string
	createdAt: string
	orderStatus: string
	address: string
	totalPrice: number
	items: OrderItem[]
}
