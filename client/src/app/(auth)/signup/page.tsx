'use client'

import Link from 'next/link'

import { Heading } from '@/components/blocks'
import SignUpForm from '@/components/forms/SignUpForm'

const SignUpPage = () => {
	return (
		<div className="auth __container">
			<Heading text="Регистрация" level="h1" isCentered id={0} />
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
