import Link from 'next/link';
import { ButtonProps } from '@/types/types';

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
			className={`btn btn--${theme} btn--${size}`}
		>
			{children || text}
		</Link>
	);
};

export default Button;
