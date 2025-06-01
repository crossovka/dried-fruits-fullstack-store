import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { StrapiImage, Fancybox } from '@/components/ui';

import styles from './ParagraphWithImage.module.scss';
import type { ParagraphWithImageProps } from '@/types/types';

export function ParagraphWithImage({
	content,
	image,
	reversed,
}: Readonly<ParagraphWithImageProps>) {
	return (
		<section className={styles['text-image']}>
			<div
				className={clsx(styles['text-image__container'], {
					[styles['text-image__container--reversed']]: reversed,
				})}
			>
				<div className={clsx(styles['text-image__text'], 'content-field')}>
					<ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
				</div>
				<Fancybox
					className={clsx(styles['text-image__image'], '-ibg')}
					delegate="[data-fancybox]"
				>
					<StrapiImage
						src={image.url}
						alt={image.alternativeText || 'No alternative text provided'}
						fill
						className={styles['text-image__image']}
						data-fancybox=""
					/>
				</Fancybox>
			</div>
		</section>
	);
}
