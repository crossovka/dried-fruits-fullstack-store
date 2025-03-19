import Heading from '@/components/blocks/Heading';
import ContactsForm from './ContactsForm';
import { StrapiImage } from '@/components/ui/StrapiImage';
import Fancybox from '@/components/Fancybox';

import { ContactsProps } from '@/types/types';

const Contacts: React.FC<ContactsProps> = ({ title, image }) => {
	return (
		<section className="contacts">
			<div className="contacts__container">
				<Heading text={title} isCentered={true} level={2} id={0} />
				<div className="contacts__wrap">
					<ContactsForm />
					<Fancybox className="contacts__image -ibg" delegate="[data-fancybox]">
						<StrapiImage
							src={image.url}
							alt={image.alternativeText || 'No alternative text provided'}
							fill
							className="text-image__image"
							data-fancybox="" // Add data-fancybox here
						/>
					</Fancybox>
				</div>
			</div>
		</section>
	);
};

export default Contacts;
