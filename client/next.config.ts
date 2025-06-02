import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	productionBrowserSourceMaps: false,
	images: {
		domains: ['localhost'], // Разрешаем загрузку изображений с localhost
	},
}

export default nextConfig
