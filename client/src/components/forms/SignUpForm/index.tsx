'use client'

import { signUp } from '@/data/actions/auth-actions'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { useState } from 'react'

import { StrapiErrors } from '@/components/strapi-errors'

type SignUpFormData = {
	username: string
	email: string
	password: string
	confirmPassword: string
}

const schema = yup.object().shape({
	username: yup.string().min(3, 'Минимум 3 символа').required('Имя пользователя обязательно'),
	email: yup.string().email('Неверный формат электронной почты').required('Email обязателен'),
	password: yup
		.string()
		.min(6, 'Пароль должен содержать минимум 6 символов')
		.required('Пароль обязателен'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Пароли не совпадают')
		.required('Подтверждение пароля обязательно'),
})

const SignUpForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SignUpFormData>({
		resolver: yupResolver(schema),
	})

	const router = useRouter()

	const [isLoading, setIsLoading] = useState(false)
	const [strapiError, setStrapiError] = useState<string | null>(null)

	const onSubmit = async (data: SignUpFormData) => {
		setIsLoading(true)
		setStrapiError(null)

		const response = await signUp({
			username: data.username,
			email: data.email,
			password: data.password,
		})

		setIsLoading(false)

		if (response.error) {
			setStrapiError(response.error)
			toast.error(response.error, { position: 'top-right', autoClose: 3000 })
			return
		}

		toast.success('Регистрация прошла успешно!', {
			position: 'top-right',
			autoClose: 3000,
		})

		reset()
		router.push('/profile')
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="form auth-form">
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
				<input id="confirmPassword" type="password" {...register('confirmPassword')} />
				{errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
			</div>

			{/* Выводим ошибку Strapi, если она есть */}
			{strapiError && (
				<StrapiErrors
					error={{
						message: strapiError,
						name: 'ValidationError',
						status: '400',
					}}
				/>
			)}

			<button type="submit" className="btn btn--primary" disabled={isLoading}>
				{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
			</button>
		</form>
	)
}

export default SignUpForm
