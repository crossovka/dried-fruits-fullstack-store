'use client'

// Ensure this is a client component
import { Fancybox as NativeFancybox } from '@fancyapps/ui'

import React, { useEffect, useRef } from 'react'

import '@fancyapps/ui/dist/fancybox/fancybox.css'

// Ensure the correct path

export function Fancybox({ children, className, delegate = '[data-fancybox]', options = {} }) {
	const containerRef = useRef(null)

	useEffect(() => {
		const container = containerRef.current

		if (container && typeof window !== 'undefined') {
			NativeFancybox.bind(container, delegate, options)

			return () => {
				NativeFancybox.unbind(container)
				NativeFancybox.close()
			}
		}
	}, [delegate, options])

	return (
		<div ref={containerRef} className={className}>
			{children}
		</div>
	)
}
