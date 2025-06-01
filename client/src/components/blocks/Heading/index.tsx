import clsx from 'clsx';

import styles from './Heading.module.scss';
import type { HeadingProps } from '@/types/types';

const defaultLevel = 3;

export function Heading({ text, isCentered, level }: Readonly<HeadingProps>) {
	const safeLevel = level ?? defaultLevel;

	const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

	const HeadingTag = headingTags[safeLevel - 1] || 'h3';

	return (
		<HeadingTag
			className={clsx('__container', styles.heading, styles[`h${safeLevel}`], {
				[styles.centered]: isCentered,
			})}
		>
			{text}
		</HeadingTag>
	);
}
