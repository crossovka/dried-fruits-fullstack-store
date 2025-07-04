'use client'

import Link from 'next/link'

import { Heading } from '@/components/blocks'
import SignInForm from '@/components/forms/SignInForm'

const SignInPage = () => {
	return (
		<div className="auth __container">
			<Heading text="Вход" level="h1" isCentered id={0} />
			<SignInForm />
			<div className="auth__link">
				<p>
					Нет аккаунта?
					<Link href="/signup">Зарегистрироваться</Link>
				</p>
			</div>
		</div>
	)
}

export default SignInPage
