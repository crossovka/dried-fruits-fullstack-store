import type { ImageProps, LinkProps } from '@/types/types';

import Link from 'next/link';
import { StrapiImage } from '../ui/StrapiImage';

interface FooterProps {
	data: {
		logo: ImageProps;
		navigation: LinkProps[];
	};
}

export function Footer({ data }: FooterProps) {
	if (!data) return null;

	const { logo, navigation } = data;
	return (
		<footer className="footer">
			<StrapiImage
				src={logo.url}
				alt={logo.alternativeText || 'No alternative text'}
				width={100}
				height={100}
				className="footer__logo--white"
			/>
			{/* <div>&copy; {new Date().getFullYear()} Our Company Name</div> */}
			<nav className="footer__nav">
				<ul className="footer__links">
					{navigation.map((item) => (
						<li key={item.id}>
							<Link
								href={item.href}
								target={item.isExternal ? '_blank' : '_self'}
							>
								{<h5>{item.text}</h5>}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</footer>
	);
}
