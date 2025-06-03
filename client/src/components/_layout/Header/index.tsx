'use client'

import { formatPhoneNumber } from '@/utils/formatPhoneNumber'
import clsx from 'clsx'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useEffect, useState } from 'react'

import { selectCartItems } from '@/store/cart/cart.selectors'
import { CartItem } from '@/store/cart/cart.types'
import { useAppSelector } from '@/store/store'

import ProfileIcon from '@/components/icons/ProfileIcon'
import { StrapiImage } from '@/components/ui/StrapiImage'

import type { ButtonProps, ImageProps, LinkProps } from '@/types/types'

// удобно для динамических классов

interface HeaderProps {
	data: {
		logo: ImageProps
		navigation: LinkProps[]
		number: string
		cta?: ButtonProps
	}
}

export function Header({ data }: HeaderProps) {
	const cartItemsFromRedux = useAppSelector(selectCartItems)
	const [cartItems, setCartItems] = useState<CartItem[]>([])

	useEffect(() => {
		setCartItems(cartItemsFromRedux)
	}, [cartItemsFromRedux])

	const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}

		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	useEffect(() => {
		if (isMenuOpen) {
			document.body.classList.add('menu-open')
		} else {
			document.body.classList.remove('menu-open')
		}
	}, [isMenuOpen])

	if (!data) return null

	const { logo, navigation, number } = data

	return (
		<header className={clsx('header', { 'header--scroll': isScrolled })}>
			<div className="header__container">
				<div className="header__left header-left">
					<Link href="/" className="header-left__logo -ibg_contain">
						<StrapiImage src={logo.url} alt={logo.alternativeText || ''} fill />
					</Link>

					<ul className="header-left__nav">
						{navigation.map((item) => {
							const isActive = pathname === item.href
							return (
								<li key={item.id}>
									<Link
										href={item.href}
										target={item.isExternal ? '_blank' : '_self'}
										onClick={() => !item.isExternal && setIsMenuOpen(false)}
										className={clsx({ active: isActive })}
									>
										<h5>{item.text}</h5>
									</Link>
								</li>
							)
						})}
					</ul>
				</div>

				<div className="header__right header-right">
					<a
						className="header-right__info-item"
						href={`tel:+${formatPhoneNumber(number)}`}
						target="_blank"
					>
						<div className="header-right__info-item-icon">
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M15.5804 11.7424L13.3429 9.50953C12.5438 8.71208 11.1853 9.03109 10.8656 10.0677C10.6259 10.7855 9.82675 11.1842 9.10754 11.0247C7.50929 10.626 5.35166 8.5526 4.95209 6.87796C4.71236 6.16023 5.19183 5.36278 5.91104 5.12358C6.9499 4.8046 7.26955 3.44895 6.47043 2.6515L4.23288 0.418658C3.59358 -0.139553 2.63464 -0.139553 2.07525 0.418658L0.556915 1.9338C-0.96142 3.52869 0.71674 7.75515 4.47262 11.5031C8.2285 15.2511 12.4639 17.0055 14.0621 15.4106L15.5804 13.8955C16.1399 13.2575 16.1399 12.3006 15.5804 11.7424Z" />
							</svg>
						</div>
						<span className="header-right__info-item-link">{number}</span>
					</a>

					<Link href="/profile" className="header-right__profile-btn -ibg_contain">
						<ProfileIcon />
					</Link>

					<Link href="/cart" className="header-right__cart-btn">
						<span>Корзина</span>
						<span>🛒</span>
						<span>{totalCount}</span>
					</Link>

					<button
						className="icon-menu"
						aria-label="Toggle menu"
						onClick={() => setIsMenuOpen((prev) => !prev)}
					>
						<div className="icon-menu-icon">
							<span></span>
						</div>
					</button>
				</div>
			</div>
		</header>
	)
}
