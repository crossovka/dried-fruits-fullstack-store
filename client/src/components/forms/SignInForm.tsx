'use client';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { signIn } from '@/data/actions';

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
	} = useForm<SignInFormData>({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: SignInFormData) => {
		try {
			const response = await signIn({
				identifier: data.email,
				password: data.password,
			});
			console.log('Успешный вход:', response);
		} catch (error) {
			console.error('Ошибка входа:', error);
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

			<button type="submit" className="btn btn--primary">
				Войти
			</button>
		</form>
	);
};

export default SignInForm;
