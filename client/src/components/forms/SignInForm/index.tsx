'use client'

import { signIn } from '@/data/actions/auth-actions'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { useRouter } from 'next/navigation'

import { useState } from 'react'

import { StrapiErrors } from '@/components/strapi-errors'
import { Button } from '@/components/ui'

type SignInFormData = {
	email: string
	password: string
}

const schema = yup
	.object({
		email: yup.string().email('Неверный формат электронной почты').required('Email обязателен'),
		password: yup
			.string()
			.min(6, 'Пароль должен содержать минимум 6 символов')
			.required('Пароль обязателен'),
	})
	.required()

const SignInForm = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [strapiError, setStrapiError] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SignInFormData>({
		resolver: yupResolver(schema),
	})

	const onSubmit = async (data: SignInFormData) => {
		setIsLoading(true)
		setStrapiError(null)

		const response = await signIn({
			identifier: data.email,
			password: data.password,
		})

		setIsLoading(false)
		if (response.error) {
			setStrapiError(response.error)
			toast.error(response.error, { position: 'top-right', autoClose: 3000 })
			return
		}

		toast.success('Вход выполнен успешно!', {
			position: 'top-right',
			autoClose: 3000,
		})

		reset()
		router.push('/profile')
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="form auth-form">
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

			{strapiError && (
				<StrapiErrors
					error={{
						message: strapiError,
						name: 'ValidationError',
						status: '400',
					}}
				/>
			)}

			<Button type="submit" theme="primary" disabled={isLoading}>
				{isLoading ? 'Вход...' : 'Войти'}
			</Button>
		</form>
	)
}

export default SignInForm
