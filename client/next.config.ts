import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	productionBrowserSourceMaps: false,
	images: {
		domains: [
			'localhost',
			'pleasant-purpose-d574ad195c.media.strapiapp.com', // разрешаем загрузку изображений с этого домена
		],
	},
}

export default nextConfig
