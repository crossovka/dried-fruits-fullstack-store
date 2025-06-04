import Image from 'next/image'

interface StrapiImageProps {
	src: string
	alt: string
	className?: string
	[key: string]: string | number | boolean | undefined
}

// Функция для корректного формирования полного URL картинки из Strapi
export function getStrapiMediaURL(path: string = ''): string {
	if (!path) return ''

	// Если путь уже полный URL, возвращаем как есть
	if (path.startsWith('http://') || path.startsWith('https://')) {
		return path
	}

	// Используем именно публичную переменную окружения
	const strapiUrl = process.env.SERVER_URL || 'http://localhost:1337'

	return `${strapiUrl}${path.startsWith('/') ? '' : '/'}${path}`
}

export function StrapiImage({ src, alt, className, ...rest }: Readonly<StrapiImageProps>) {
	const imageUrl = getStrapiMediaURL(src)
	console.log('StrapiImage URL:', imageUrl)
	if (!imageUrl) return null

	return <Image src={imageUrl} alt={alt} className={className} loading="lazy" {...rest} />
}

// Если нужна функция для работы с URL (где иногда приходит полный URL, иногда — относительный)
export function getStrapiMedia(url: string | null) {
	if (!url) return null
	if (url.startsWith('data:')) return url
	if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) return url

	return getStrapiMediaURL(url)
}
