'use client';

import { translateAuthError } from '@/utils/translateError';

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
			credentials: 'include',
		});

		const responseData = await response.json();

		if (!response.ok) {
			const translated = translateAuthError(responseData?.error || '');
			return { error: translated };
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
			credentials: 'include',
		});

		const responseData = await response.json();

		if (!response.ok) {
			const translated = translateAuthError(responseData?.error || '');
			return { error: translated };
		}

		return { data: responseData };
	} catch (error) {
		console.error('Ошибка при регистрации:', error);
		return { error: 'Ошибка сервера. Попробуйте позже.' };
	}
}

export async function logout() {
	try {
		const response = await fetch('/api/auth/logout', {
			method: 'POST',
			credentials: 'include',
		});

		if (!response.ok) {
			return { error: 'Ошибка при выходе из аккаунта' };
		} else {
			return { success: true };
		}
	} catch (error) {
		console.error('Ошибка logout:', error);
		return { error: 'Ошибка при попытке выхода. Попробуйте позже.' };
	}
}
