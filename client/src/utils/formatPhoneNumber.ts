export function formatPhoneNumber(phone: string): string {
	return phone.replace(/\D/g, '').replace(/^8/, '7'); // Заменяет 8 на 7, если номер начинается с 8
}

// Пример использования:
const rawPhone = '+7 (900) 232-32-32';
const formattedPhone = `tel:+${formatPhoneNumber(rawPhone)}`;
console.log(formattedPhone); // tel:+79002323232
