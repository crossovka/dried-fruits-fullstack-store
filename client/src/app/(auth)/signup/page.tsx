'use client'

import Link from 'next/link'

import SignUpForm from '@/components/forms/SignUpForm'

const SignUpPage = () => {
	return (
		<div className="auth __container">
			<h1 className="heading __container h1 heading--centered">Регистрация</h1>
			<SignUpForm />
			<div className="auth__link">
				<p>
					Есть аккаунт? <Link href="/signin">Войти</Link>
				</p>
			</div>
		</div>
	)
}

export default SignUpPage
