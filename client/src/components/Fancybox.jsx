'use client'; // Ensure this is a client component

import React, { useRef, useEffect } from 'react';
import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css'; // Ensure the correct path

function Fancybox({
	children,
	className,
	delegate = '[data-fancybox]',
	options = {},
}) {
	const containerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;

		if (container && typeof window !== 'undefined') {
			NativeFancybox.bind(container, delegate, options);

			return () => {
				NativeFancybox.unbind(container);
				NativeFancybox.close();
			};
		}
	}, [delegate, options]);

	return (
		<div ref={containerRef} className={className}>
			{children}
		</div>
	);
}

export default Fancybox;
