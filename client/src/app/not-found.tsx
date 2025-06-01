import Link from 'next/link'

const NotFound = () => {
	return (
		<div className="h1 __container">
			Ничего не найдено
			<div>
				<Link href="/">
					<button className="btn btn--primary">На главную</button>
				</Link>
			</div>
		</div>
	)
}

export default NotFound
