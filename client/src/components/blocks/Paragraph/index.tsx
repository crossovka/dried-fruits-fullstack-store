import clsx from 'clsx';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';

import styles from './Paragraph.module.scss';
import type { ParagraphProps } from '@/types/types';

export function Paragraph({ content }: Readonly<ParagraphProps>) {
	return (
		<section className={clsx(styles.paragraph, 'content-field', '__container')}>
			<ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
		</section>
	);
}
