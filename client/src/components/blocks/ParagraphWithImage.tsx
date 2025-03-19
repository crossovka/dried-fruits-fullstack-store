import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { StrapiImage } from '@/components/ui/StrapiImage';
import Fancybox from '@/components/Fancybox';

import { ParagraphWithImageProps } from '@/types/types';

export function ParagraphWithImage({
	content,
	image,
	reversed,
}: Readonly<ParagraphWithImageProps>) {
	return (
		<section className={`text-image`}>
			<div
				className={`text-image__container ${
					reversed ? 'text-image__container--reversed' : ''
				}`}
			>
				<div className="text-image__text content-field">
					<ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
				</div>
				<Fancybox className="text-image__image -ibg" delegate="[data-fancybox]">
					<StrapiImage
						src={image.url}
						alt={image.alternativeText || 'No alternative text provided'}
						fill
						className="text-image__image"
						data-fancybox="" // Add data-fancybox here
					/>
				</Fancybox>
			</div>
		</section>
	);
}
