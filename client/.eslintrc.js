module.exports = {
	root: true, // Помечаем этот конфиг корневым, чтобы ESLint не искал конфиги выше по папкам
	env: {
		browser: true, // Определяет глобальные переменные браузера (window, document и т.д.)
		es2021: true, // Включает поддержку синтаксиса ES2021
		node: true, // Определяет глобальные переменные Node.js (process, __dirname и т.п.)
	},
	parser: '@typescript-eslint/parser', // Используем парсер для TypeScript, чтобы ESLint понимал TS-синтаксис
	parserOptions: {
		ecmaVersion: 12, // ECMAScript 2021 (12-я версия стандарта)
		sourceType: 'module', // Код в виде ES-модулей (import/export)
		project: './tsconfig.json', // Указываем путь к tsconfig для правил, которые требуют типизацию
	},
	plugins: [
		'@typescript-eslint', // Плагин с правилами для TypeScript
		'import', // Плагин для проверки и сортировки импортов
		'react', // Правила для React
		'react-hooks', // Правила для хуков React
	],
	extends: [
		'eslint:recommended', // Базовые рекомендуемые правила ESLint
		'plugin:@typescript-eslint/recommended', // Рекомендуемые правила для TypeScript
		'plugin:react/recommended', // Рекомендуемые правила для React
		'plugin:react-hooks/recommended', // Правила для правильного использования хуков React
		'plugin:import/errors', // Проверка ошибок в импортах
		'plugin:import/warnings', // Предупреждения по импортам
		'plugin:import/typescript', // Поддержка импортов для TypeScript
		'next/core-web-vitals', // Рекомендуемые правила Next.js для производительности
		'prettier', // Отключение правил ESLint, которые конфликтуют с Prettier (форматированием)
	],
	settings: {
		react: {
			version: 'detect', // Автоматически определяет версию React, чтобы правильно применить правила
		},
		'import/resolver': {
			typescript: {}, // Настройка резолвера импортов для поддержки TypeScript алиасов и путей
		},
	},
	rules: {
		'@typescript-eslint/no-explicit-any': 'error', // Запрет на использование any (чтобы избегать слабой типизации)
		'react/react-in-jsx-scope': 'off', // В Next.js импорт React в файлах JSX не обязателен, отключаем правило
		'import/order': [
			'error', // Ошибка при нарушении порядка импортов
			{
				groups: [
					'builtin', // Node.js встроенные модули (fs, path и т.п.)
					'external', // Внешние зависимости из node_modules (lodash, react и др.)
					'internal', // Внутренние импорты, например по алиасам '@/hooks', '@/components'
					['parent', 'sibling', 'index'], // Относительные импорты из родительских, соседних папок и index файлов
					'unknown', // Для непредвиденных или нераспознанных импортов
				],
				pathGroups: [
					{
						pattern: 'react', // Специальное правило для импорта 'react'
						group: 'external', // Относится к внешним модулям
						position: 'after', // Помещаем импорт 'react' после остальных внешних импортов
					},
					{
						pattern: '@/hooks/**', // Алиас для хуков
						group: 'internal', // Относится к внутренним импортам
						position: 'before', // Помещаем в начало группы внутренних импортов
					},
					{
						pattern: '@/components/**', // Алиас для компонентов
						group: 'internal',
						position: 'before',
					},
					{
						pattern: '@/types/**', // Алиас для типов
						group: 'internal',
						position: 'after', // В конце группы внутренних импортов
					},
					{
						pattern: '*.module.{css,scss,sass}', // CSS/SCSS модули
						group: 'index', // Относим к группе index (относительные)
						position: 'after', // В конце
					},
					{
						pattern: '*.{css,scss,sass}', // Обычные стили
						group: 'index',
						position: 'after',
					},
				],
				pathGroupsExcludedImportTypes: ['builtin'], // Исключаем встроенные модули из применения pathGroups
				'newlines-between': 'always', // Обязательно отделять группы импортов пустой строкой
				alphabetize: {
					order: 'asc', // Сортируем внутри групп по алфавиту
					caseInsensitive: true, // Без учета регистра
				},
			},
		],
	},
}
