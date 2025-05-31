export function translateAuthError(message: string): string {
	if (!message) return 'Произошла неизвестная ошибка.';

	const map: Record<string, string> = {
		'Email or Username are already taken': 'Email или имя пользователя уже заняты',
		'Invalid identifier or password': 'Неверный логин или пароль',
		'Missing required fields': 'Пожалуйста, заполните все обязательные поля',
		'Password is too short': 'Пароль слишком короткий',
		'Username already taken': 'Имя пользователя уже занято',
		'Email already taken': 'Email уже используется',
		'Invalid email': 'Неверный формат email',
	};

	// Перебор по ключу
	const found = Object.entries(map).find(([key]) =>
		message.toLowerCase().includes(key.toLowerCase())
	);

	return found?.[1] || 'Ошибка авторизации. Попробуйте снова.';
}
