import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { StrapiImage } from '@/components/ui/StrapiImage';

import type { HeroSectionProps } from '@/types/types';

export function HeroSection({
	heading,
	description,
	image,
}: Readonly<HeroSectionProps>) {
	return (
		<section className="hero">
			<div className={`hero__container`}>
				<div className="hero__content">
					{heading && <h1 className="hero__heading h1">{heading}</h1>}
					{description && (
						<div className="hero__description content-field">
							<ReactMarkdown rehypePlugins={[rehypeRaw]}>
								{description}
							</ReactMarkdown>
						</div>
					)}
				</div>
				<div className="hero__image -ibg">
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
