import Fancybox from '@/components/Fancybox';
import { StrapiImage } from '../ui/StrapiImage';

import type { ImageBlockProps } from '@/types/types';

export default function ImageBlock({ image }: Readonly<ImageBlockProps>) {
	return (
		<section className="image-block __container">
			<Fancybox className="image-block__image -ibg_contain" delegate="[data-fancybox]">
				<StrapiImage
					src={image.url}
					alt={image.alternativeText || 'No alternative text provided'}
					fill
					data-fancybox=""
				/>
			</Fancybox>
		</section>
	);
}
