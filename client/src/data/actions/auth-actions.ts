'use client';

interface SignInData {
	identifier: string;
	password: string;
}

interface SignUpData {
	username: string;
	email: string;
	password: string;
}

export async function signIn(data: SignInData) {
	try {
		const response = await fetch('/api/auth/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
			credentials: 'include', // Позволяет передавать куки
		});

		const responseData = await response.json();

		if (!response.ok) {
			return { error: responseData?.error || 'Ошибка при входе' };
		}

		return { data: responseData };
	} catch (error) {
		console.error('Ошибка при входе:', error);
		return { error: 'Ошибка сервера. Попробуйте позже.' };
	}
}

export async function signUp(data: SignUpData) {
	try {
		const response = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
			credentials: 'include', // Позволяет передавать куки
		});

		const responseData = await response.json();

		if (!response.ok) {
			return { error: responseData?.error || 'Ошибка при регистрации' };
		}

		return { data: responseData };
	} catch (error) {
		console.error('Ошибка при регистрации:', error);
		return { error: 'Ошибка сервера. Попробуйте позже.' };
	}
}
