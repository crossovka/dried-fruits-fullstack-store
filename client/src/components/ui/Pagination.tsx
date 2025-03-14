'use client';

import Image from 'next/image';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	setCurrentPage: (page: number) => void;
	className?: string;
}

export default function Pagination({
	currentPage,
	totalPages,
	setCurrentPage,
	className = '',
}: PaginationProps) {
	if (totalPages <= 1) return null;

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className={`pagination ${className}`}>
			<button
				className="pagination__btn pagination__btn--mirror"
				disabled={currentPage === 1}
				onClick={() => setCurrentPage(currentPage - 1)}
			>
				<Image
					src="/icons/arrow.svg"
					alt="Назад"
					width={17}
					height={34}
					className="pagination__icon"
				/>
			</button>

			<div className="pagination__pages">
				{pages.map((page) => (
					<button
						key={page}
						className={`pagination__page ${
							currentPage === page ? 'active' : ''
						}`}
						onClick={() => setCurrentPage(page)}
					>
						{page}
					</button>
				))}
			</div>

			<button
				className="pagination__btn"
				disabled={currentPage === totalPages}
				onClick={() => setCurrentPage(currentPage + 1)}
			>
				<Image
					src="/icons/arrow.svg"
					alt="Назад"
					width={17}
					height={34}
					className="pagination__icon"
				/>
			</button>
		</div>
	);
}
