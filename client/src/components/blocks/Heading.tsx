import clsx from 'clsx';
import { JSX } from 'react';

import type { HeadingProps } from '@/types/types';

// По умолчанию h3, если не указан уровень
const defaultLevel = 3;

export default function Heading({
	text,
	isCentered,
	level,
}: Readonly<HeadingProps>) {
	console.log(text, isCentered, level);

	// Если level null или undefined — ставим h3
	const safeLevel = level ?? defaultLevel;

	// Функция для получения тега заголовка
	const getHeadingTag = (level: number): keyof JSX.IntrinsicElements => {
		return [`h1`, `h2`, `h3`, `h4`, `h5`, `h6`][level - 1] || `h3`;
	};

	const HeadingTag = getHeadingTag(safeLevel);

	// Класс уровня, но только если level передан
	const levelClass = level ? `${safeLevel}` : 'h3';

	return (
		<HeadingTag
			className={clsx('heading __container', levelClass, {
				'heading--centered': isCentered,
			})}
		>
			{text}
		</HeadingTag>
	);
}
