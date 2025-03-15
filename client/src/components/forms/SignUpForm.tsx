'use client';

import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signUp } from '@/data/actions/auth-actions';
import { StrapiErrors } from '../strapi-errors';

type SignUpFormData = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const schema = yup.object().shape({
	username: yup
		.string()
		.min(3, 'Минимум 3 символа')
		.required('Имя пользователя обязательно'),
	email: yup
		.string()
		.email('Неверный формат электронной почты')
		.required('Email обязателен'),
	password: yup
		.string()
		.min(6, 'Пароль должен содержать минимум 6 символов')
		.required('Пароль обязателен'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Пароли не совпадают')
		.required('Подтверждение пароля обязательно'),
});

const SignUpForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormData>({
		resolver: yupResolver(schema),
	});

	const [strapiError, setStrapiError] = useState<{
		message: string;
		name: string;
		status: string | null;
	} | null>(null);

	const onSubmit = async (data: SignUpFormData) => {
		setStrapiError(null); // Reset the error before making the request

		try {
			const response = await signUp({
				username: data.username,
				email: data.email,
				password: data.password,
			});
			console.log('Registration successful:', response);

			// Show success toast notification
			toast.success('Registration successful!', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		} catch (error: any) {
			console.error('Registration error:', error);
			

			// Check if the error has the expected structure
			if (error?.response?.data?.error) {
				const { message, name, status } = error.response.data.error;
				setStrapiError({ message, name, status });

				// Show error toast notification with server message
				toast.error(`Registration error: ${message}`, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			} else {
				// For any other unknown errors
				setStrapiError({
					message: 'An unknown error occurred.',
					name: 'UnknownError',
					status: null,
				});

				// Show generic error toast notification
				toast.error('An unknown error occurred. Please try again later.', {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="form">
			<div className="form-group">
				<label htmlFor="username">Имя пользователя</label>
				<input id="username" type="text" {...register('username')} />
				{errors.username && <p className="error">{errors.username.message}</p>}
			</div>

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

			<div className="form-group">
				<label htmlFor="confirmPassword">Подтвердите пароль</label>
				<input
					id="confirmPassword"
					type="password"
					{...register('confirmPassword')}
				/>
				{errors.confirmPassword && (
					<p className="error">{errors.confirmPassword.message}</p>
				)}
			</div>

			{/* Выводим ошибку Strapi, если она есть */}
			{strapiError && <StrapiErrors error={strapiError} />}

			<button type="submit" className="btn btn--primary">
				Зарегистрироваться
			</button>
		</form>
	);
};

export default SignUpForm;
