import clsx from 'clsx'

import { Fancybox, StrapiImage } from '@/components/ui'

import { Heading } from '../Heading'
import styles from './Contacts.module.scss'
import ContactsForm from './ContactsForm'

import { ContactsProps } from '@/types/types'

export const Contacts: React.FC<ContactsProps> = ({ title, image }) => {
	return (
		<section className={styles.contacts}>
			<div className={styles.contacts__container}>
				<Heading text={title} isCentered level={2} id={0} />
				<div className={styles.contacts__wrap}>
					<div className={styles.contacts__contactsForm}>
						<ContactsForm />
					</div>
					<Fancybox className={clsx(styles.contacts__image, '-ibg')} delegate="[data-fancybox]">
						<StrapiImage
							src={image.url}
							alt={image.alternativeText || 'No alternative text provided'}
							fill
							className="text-image__image"
							data-fancybox=""
						/>
					</Fancybox>
				</div>
			</div>
		</section>
	)
}
