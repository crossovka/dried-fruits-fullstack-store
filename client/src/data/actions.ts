'use client';

import { getStrapiURL } from '@/utils/get-strapi-url';

const BASE_URL = getStrapiURL(); // Получаем базовый URL API

interface SignInData {
	identifier: string;
	password: string;
}

export async function signIn(data: SignInData) {
	try {
		const response = await fetch(`${BASE_URL}auth/local`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const errorData = await response.text(); // Меняем на text() для отладки
			console.error('Ошибка сервера:', errorData);
			throw new Error('Ошибка при входе');
		}

		return await response.json();
	} catch (error) {
		console.error('Ошибка при входе:', error);
		throw error;
	}
}

export async function signUp(data: {
	username: string;
	email: string;
	password: string;
}) {
	try {
		const response = await fetch(`${BASE_URL}auth/local/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('Ошибка сервера:', errorText);
			throw new Error('Ошибка регистрации: ' + errorText);
		}

		return await response.json();
	} catch (error) {
		console.error('Ошибка при регистрации:', error);
		throw error;
	}
}
