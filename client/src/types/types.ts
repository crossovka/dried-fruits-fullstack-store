import { ReactNode } from 'react';

export type Block =
	| HeroSectionProps
	| HeadingProps
	| ParagraphProps
	| ParagraphWithImageProps
	| ImageBlockProps
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| Base<ComponentType, any>; // ✅ Добавляем базовый тип

type ComponentType =
	| 'blocks.hero-section'
	| 'blocks.heading'
	| 'blocks.paragraph-with-image'
	| 'blocks.paragraph'
	| 'blocks.full-image'
	| 'blocks.subscribe'
	| 'blocks.image'
	| 'layout.header';

interface Base<
	T extends ComponentType,
	D extends object = Record<string, unknown>
> {
	id: number;
	__component?: T;
	documentId?: string;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string;
	data?: D;
}

export interface LinkProps {
	id: number;
	text: string;
	href: string;
	isExternal: boolean;
}

export interface ImageProps {
	id: number;
	documentId: string;
	url: string;
	alternativeText: string;
}

// Blocks ========================================================================================================================================================

export type ButtonTheme = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
	// id: number;
	text?: string;
	children?: ReactNode;
	href: string;
	isExternal: boolean;
	theme?: ButtonTheme;
	size?: ButtonSize;
}

export interface HeadingProps extends Base<'blocks.heading'> {
	text: string;
	isCentered: boolean;
	level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface HeroSectionProps extends Base<'blocks.hero-section'> {
	heading?: string;
	description: string;
	image: ImageProps;
}

export interface ParagraphWithImageProps
	extends Base<'blocks.paragraph-with-image'> {
	content: string;
	image: ImageProps;
	reversed?: boolean;
}

export interface ParagraphProps extends Base<'blocks.paragraph'> {
	content: string;
}

export interface ImageBlockProps extends Base<'blocks.image'> {
	image: ImageProps;
}
//========================================================================================================================================================
export interface PaginationMeta {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}
//========================================================================================================================================================
export interface Category {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export type Categories = Category[];

export interface Weight {
	value: number;
	unit: string;
}

export interface Product {
	id: number;
	documentId: string;
	title: string;
	slug: string;
	description: string;
	price: number;
	old_price?: number;
	image: ImageProps;
	category: Category;
	weights: {
		weights: Weight[]; // Здесь weights — это массив объектов типа Weight
	};
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
}

export type Products = Product[];
