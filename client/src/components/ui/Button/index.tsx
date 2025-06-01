import Link from 'next/link';
import clsx from 'clsx';

import styles from './Button.module.scss';
import type { ButtonProps } from '@/types/types';

const Button: React.FC<ButtonProps> = ({
	href,
	text,
	theme,
	size,
	children,
	isExternal,
}) => {
	return (
		<Link
			href={href}
			passHref
			target={isExternal ? '_blank' : '_self'}
			className={clsx(
				styles.btn,
				theme && styles[`btn--${theme}`],
				size && styles[`btn--${size}`]
			)}
		>
			{children || text}
		</Link>
	);
};

export default Button;
