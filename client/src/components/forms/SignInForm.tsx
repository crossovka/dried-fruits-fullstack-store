'use client';

import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { signIn } from '@/data/actions/auth-actions';
import { StrapiErrors } from '../strapi-errors';

type SignInFormData = {
	email: string;
	password: string;
};

const schema = yup
	.object({
		email: yup
			.string()
			.email('Неверный формат электронной почты')
			.required('Email обязателен'),
		password: yup
			.string()
			.min(6, 'Пароль должен содержать минимум 6 символов')
			.required('Пароль обязателен'),
	})
	.required();

const SignInForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SignInFormData>({
		resolver: yupResolver(schema),
	});

	const [strapiError, setStrapiError] = useState<string | null>(null);

	const onSubmit = async (data: SignInFormData) => {
		setStrapiError(null); // Сбрасываем ошибку перед запросом

		try {
			const response = await signIn({
				identifier: data.email,
				password: data.password,
			});

			// Показываем уведомление об успешном входе
			toast.success('Вход выполнен успешно!', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});

			console.log('Успешный вход:', response);
			reset(); // Очищаем форму после успешного входа
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error('Ошибка входа:', error);

			if (error?.response?.data?.error?.message) {
				setStrapiError(error.response.data.error.message);
			} else {
				setStrapiError('Произошла неизвестная ошибка.');
			}

			// Показываем уведомление об ошибке
			toast.error('Ошибка входа. Проверьте данные и попробуйте снова.', {
				position: 'top-right',
				autoClose: 3000,
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="form">
			<div className="form-group">
				<label htmlFor="email">Email</label>
				<input id="email" type="email" {...register('email')} />
				{errors.email && <p className="error">{errors.email.message}</p>}
			</div>

			<div className="form-group">
				<label htmlFor="password">Пароль</label>
				<input id="password" type="password" {...register('password')} />
				{errors.password && <p className="error">{errors.password.message}</p>}
			</div>

			{/* Выводим ошибки Strapi */}
			{strapiError && <StrapiErrors message={strapiError} />}

			<button type="submit" className="btn btn--primary">
				Войти
			</button>
		</form>
	);
};

export default SignInForm;
