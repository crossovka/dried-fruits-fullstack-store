'use client'

import { useEffect, useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'

import styles from './Search.module.scss'

interface SearchProps {
	setSearchQuery: (query: string) => void
	className?: string
}

export function Search({ setSearchQuery, className = '' }: SearchProps) {
	const [query, setQuery] = useState('')
	const debouncedQuery = useDebounce(query, 500)

	useEffect(() => {
		setSearchQuery(debouncedQuery)
	}, [debouncedQuery, setSearchQuery])

	return (
		<div className={`${styles.search} ${className}`}>
			<input
				type="text"
				className={styles.search__input}
				placeholder="Поиск товаров..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
		</div>
	)
}
