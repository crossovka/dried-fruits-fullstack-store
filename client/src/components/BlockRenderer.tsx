import {
	Contacts,
	Heading,
	HeroSection,
	ImageBlock,
	Paragraph,
	ParagraphWithImage,
} from './blocks';

import type {
	Block,
	HeadingProps,
	HeroSectionProps,
	ImageBlockProps,
	ParagraphProps,
	ParagraphWithImageProps,
	ContactsProps,
} from '@/types/types';

function blockRenderer(block: Block, index: number) {
	const uniqueKey = `${block.__component}-${block.id || index}`; // Безопасный ключ

	switch (block.__component) {
		case 'blocks.hero-section':
			return <HeroSection {...(block as HeroSectionProps)} key={uniqueKey} />;
		case 'blocks.heading':
			return <Heading {...(block as HeadingProps)} key={uniqueKey} />;
		case 'blocks.paragraph-with-image':
			return (
				<ParagraphWithImage
					{...(block as ParagraphWithImageProps)}
					key={uniqueKey}
				/>
			);
		case 'blocks.image':
			return <ImageBlock {...(block as ImageBlockProps)} key={uniqueKey} />;
		case 'blocks.paragraph':
			return <Paragraph {...(block as ParagraphProps)} key={uniqueKey} />;
		case 'blocks.contacts':
			return <Contacts {...(block as ContactsProps)} key={uniqueKey} />;
		default:
			console.warn(`Неизвестный блок: ${block.__component}`);
			return null;
	}
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
	return <>{blocks.map(blockRenderer)}</>;
}
