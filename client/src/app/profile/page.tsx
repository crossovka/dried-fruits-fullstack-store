'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/data/actions/auth-actions';

export default function Profile() {
	const router = useRouter();

	const handleLogout = async () => {
		await logout();
		router.push('/');
	};

	return (
		<div>
			<h1>Профиль</h1>
			<button
				onClick={handleLogout}
				className=""
			>
				Выйти из аккаунта
			</button>
		</div>
	);
}
