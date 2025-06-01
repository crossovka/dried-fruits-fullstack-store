'use client';

import styles from './Tabs.module.scss';

import { Category } from '@/types/types';

type TabsProps = {
	categories: Category[];
	activeCategory: string;
	setActiveCategory: (slug: string) => void;
	className?: string;
};

export default function Tabs({
	categories,
	activeCategory,
	setActiveCategory,
	className = '',
}: TabsProps) {
	return (
		<div className={`${styles.tabs} ${className}`}>
			{categories.map((category) => {
				const isActive = activeCategory === category.slug;
				return (
					<button
						key={category.id}
						className={`${styles.tabs__btn} ${
							isActive ? styles['tabs__btn--active'] : ''
						}`}
						onClick={() => setActiveCategory(category.slug)}
					>
						{category.title}
					</button>
				);
			})}
		</div>
	);
}
