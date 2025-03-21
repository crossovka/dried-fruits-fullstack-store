'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ErrorPage = () => {
	const router = useRouter();

	useEffect(() => {
		// Перенаправление на главную страницу через 5 секунд
		setTimeout(() => {
			router.push('/');
		}, 5000);
	}, []);

	return (
		<div className="error">
			<h1>Произошла ошибка</h1>
			<p>
				Что-то пошло не так. Мы перенаправим вас на главную страницу через 5
				секунд...
			</p>
			<Link href="/">
				<button className="btn btn--primary">Вернуться на главную</button>
			</Link>
			;
		</div>
	);
};

export default ErrorPage;
