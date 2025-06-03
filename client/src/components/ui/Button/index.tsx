import clsx from 'clsx'

import Link from 'next/link'

import React from 'react'

import styles from './Button.module.scss'

import type { ButtonProps } from '@/types/types'

export const Button: React.FC<ButtonProps> = ({
	href,
	text,
	theme,
	size,
	children,
	isExternal,
	onClick,
	disabled,
	className,
}) => {
	if (href) {
		return (
			<Link
				href={href}
				passHref
				target={isExternal ? '_blank' : '_self'}
				className={clsx(
					styles.btn,
					theme && styles[`btn--${theme}`],
					size && styles[`btn--${size}`],
					className,
				)}
			>
				{children || text}
			</Link>
		)
	}

	return (
		<button
			className={clsx(
				styles.btn,
				theme && styles[`btn--${theme}`],
				size && styles[`btn--${size}`],
				className,
			)}
			onClick={onClick}
			disabled={disabled}
		>
			{children || text}
		</button>
	)
}
