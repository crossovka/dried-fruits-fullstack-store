import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { StrapiImage } from '@/components/ui';

import styles from './HeroSection.module.scss';

import type { HeroSectionProps } from '@/types/types';

export function HeroSection({
	heading,
	description,
	image,
}: Readonly<HeroSectionProps>) {
	return (
		<section className={clsx(styles.hero, 'hero')}>
			<div className={styles.hero__container}>
				<div className={styles.hero__content}>
					{heading && (
						<h1 className={clsx(styles.hero__heading, 'h1')}>
							{heading}
						</h1>
					)}
					{description && (
						<div className={clsx(styles.hero__description, 'content-field')}>
							<ReactMarkdown rehypePlugins={[rehypeRaw]}>
								{description}
							</ReactMarkdown>
						</div>
					)}
				</div>
				<div className={clsx(styles.hero__image, '-ibg')}>
					<StrapiImage
						src={image.url}
						alt={image.alternativeText || 'No alternative text provided'}
						fill
					/>
				</div>
			</div>
		</section>
	);
}
