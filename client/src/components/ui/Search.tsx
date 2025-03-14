'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchProps {
	setSearchQuery: (query: string) => void;
	className?: string;
}

export default function Search({ setSearchQuery, className = '' }: SearchProps) {
	const [query, setQuery] = useState('');
	const debouncedQuery = useDebounce(query, 500);

	// Отправляем обновленный запрос только после debounce
	useEffect(() => {
		setSearchQuery(debouncedQuery);
	}, [debouncedQuery, setSearchQuery]);

	return (
		<div className={`search ${className}`}>
			<input
				type="text"
				className="search__input"
				placeholder="Поиск товаров..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
		</div>
	);
}
