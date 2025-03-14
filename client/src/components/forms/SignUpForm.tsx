'use client';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { signUp } from '@/data/actions';

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
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают')
		.required('Пароль обязателен'),
});

const SignUpForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormData>({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: SignUpFormData) => {
		try {
			const response = await signUp({
				username: data.username,
				email: data.email,
				password: data.password,
			});
			console.log('Регистрация успешна:', response);
		} catch (error) {
			console.error('Ошибка при регистрации:', error);
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

			<button type="submit" className="btn btn--primary">
				Зарегистрироваться
			</button>
		</form>
	);
};

export default SignUpForm;
