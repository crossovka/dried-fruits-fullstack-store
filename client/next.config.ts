// import { getHostname, getMediaHostname } from '@/utils/strapi-domains'
// import type { NextConfig } from 'next'
// // console.log('👉 Hostname:', getHostname())
// // console.log('👉 Media Hostname:', getMediaHostname())
// const nextConfig: NextConfig = {
// 	productionBrowserSourceMaps: false,
// 	images: {
// 		domains: ['localhost', getHostname(), getMediaHostname()],
// 	},
// }
// export default nextConfig

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	productionBrowserSourceMaps: false,
	images: {
		domains: [
			'localhost',
			'shining-love-c0c53e911a.strapiapp.com',
			'shining-love-c0c53e911a.media.strapiapp.com', // 👈 без вызова функции
			'pleasant-purpose-d574ad195c.media.strapiapp.com',
			'pleasant-purpose-d574ad195c.strapiapp.com',
		],
	},
}

export default nextConfig
