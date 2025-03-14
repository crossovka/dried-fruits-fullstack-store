export function formatDate(dateString: string): string {
	try {
		// Преобразуем строку ISO в объект Date
		const date = dateString ? new Date(dateString) : new Date();

		// Проверяем, является ли дата валидной
		if (isNaN(date.getTime())) {
			throw new Error('Некорректная строка даты');
		}

		// Форматируем дату с помощью Intl.DateTimeFormat для более согласованных результатов
		const formatter = new Intl.DateTimeFormat('ru-RU', {
			weekday: 'long', // День недели (понедельник, вторник, ...)
			year: 'numeric', // Год (например, 2023)
			month: 'long', // Месяц (январь, февраль, ...)
			day: 'numeric', // Число (например, 21)
		});

		return formatter.format(date);
	} catch (error) {
		console.error(`Ошибка форматирования даты: ${dateString}`, error);
		return 'Некорректная дата';
	}
}
