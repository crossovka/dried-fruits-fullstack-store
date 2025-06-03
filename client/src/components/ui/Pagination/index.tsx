'use client'

import clsx from 'clsx'
import Image from 'next/image'

import styles from './Pagination.module.scss'

interface PaginationProps {
	currentPage: number
	totalPages: number
	setCurrentPage: (page: number) => void
	className?: string
}

export function Pagination({
	currentPage,
	totalPages,
	setCurrentPage,
	className = '',
}: PaginationProps) {
	if (totalPages <= 1) return null

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

	return (
		<div className={clsx(styles.pagination, className)}>
			<button
				className={clsx(styles.pagination__btn, styles['pagination__btn--mirror'])}
				disabled={currentPage === 1}
				onClick={() => setCurrentPage(currentPage - 1)}
			>
				<Image
					src="/icons/arrow.svg"
					alt="Назад"
					width={17}
					height={34}
					className={styles.pagination__icon}
				/>
			</button>

			<div className={styles.pagination__pages}>
				{pages.map((page) => (
					<button
						key={page}
						className={clsx(styles.pagination__page, {
							[styles.active]: currentPage === page,
						})}
						onClick={() => setCurrentPage(page)}
					>
						{page}
					</button>
				))}
			</div>

			<button
				className={styles.pagination__btn}
				disabled={currentPage === totalPages}
				onClick={() => setCurrentPage(currentPage + 1)}
			>
				<Image
					src="/icons/arrow.svg"
					alt="Вперёд"
					width={17}
					height={34}
					className={styles.pagination__icon}
				/>
			</button>
		</div>
	)
}
