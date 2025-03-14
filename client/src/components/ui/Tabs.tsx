'use client';

import { Category } from '@/types/types';

type TabsProps = {
	categories: Category[];
	activeCategory: string;
	setActiveCategory: (slug: string) => void;
};

export default function Tabs({
	categories,
	activeCategory,
	setActiveCategory,
	className = '',
}: TabsProps & { className?: string }) {
	return (
		<div className={`tabs ${className}`}>
			{categories.map((category) => (
				<button
					key={category.id}
					className={`tabs__btn ${
						activeCategory === category.slug ? 'tabs__btn--active' : ''
					}`}
					onClick={() => setActiveCategory(category.slug)}
				>
					{category.title}
				</button>
			))}
		</div>
	);
}
