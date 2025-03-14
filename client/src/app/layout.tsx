import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Roboto } from 'next/font/google';

import { getGlobalSettings } from '@/data/loaders';
import { Header } from '@/components/_layout/Header';
// import { Footer } from '@/components/_layout/Footer';

import StoreProvider from '@/components/StoreProvider';
import { ToastProvider } from '@/components/ToastProvider';

import { Block } from '@/types/types';
import '../sass/main.scss';

const roboto = Roboto({
	variable: '--font-roboto',
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700', '900'],
	display: 'swap',
});

async function loader() {
	try {
		const data = await getGlobalSettings();
		if (!data) return null;
		return { ...data.data };
	} catch (error) {
		console.error('Error loading global settings:', error);
		return null;
	}
}

export async function generateMetadata(): Promise<Metadata> {
	const data = await loader();
	return {
		title: data?.title || 'Default Title',
		description: data?.description || 'Default Description',
	};
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const data = await loader();
	// throw new Error('ff')
	// Если данные не загрузились, показываем 404
	if (!data) notFound();

	const blocks = data.blocks || [];
	const headerData = blocks.find(
		(block: Block) => block.__component === 'layout.header'
	);

	// const footerData = blocks.find((block) => block.__component === 'layout.footer');

	return (
		<html lang="en">
			<body className={`${roboto.variable}`}>
				<div className="wrapper" id="wrapper">
					<StoreProvider>
						{headerData && <Header data={headerData} />}
						<main>{children}</main>
						{/* <Footer data={footerData} /> */}
					</StoreProvider>
					<ToastProvider />
				</div>
			</body>
		</html>
	);
}
