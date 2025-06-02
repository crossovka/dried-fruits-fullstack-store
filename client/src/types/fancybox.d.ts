declare module 'fancybox' {
	const fancybox: {
		open: (...args: unknown[]) => void
		close: () => void
		[key: string]: unknown
	}
	export default fancybox
}
