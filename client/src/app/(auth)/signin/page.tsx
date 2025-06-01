'use client'

import Link from 'next/link'

import SignInForm from '@/components/forms/SignInForm'

const SignInPage = () => {
	return (
		<div className="auth __container">
			<h1 className="heading h1 heading--centered">Вход</h1>
			<SignInForm />
			<div className="auth__link">
				<p>
					Нет аккаунта? <Link href="/signup">Зарегистрироваться</Link>
				</p>
			</div>
		</div>
	)
}

export default SignInPage
