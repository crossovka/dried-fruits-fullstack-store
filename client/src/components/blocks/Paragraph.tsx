import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';

import { ParagraphProps } from '@/types/types';

export function Paragraph({ content }: Readonly<ParagraphProps>) {
	return (
		<section className="paragraph content-field __container ">
			<ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
		</section>
	);
}
