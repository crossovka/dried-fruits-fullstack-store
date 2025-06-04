import { Button } from '@/components/ui' 

const NotFound = () => {
	return (
		<div className="h1 __container">
			Ничего не найдено
			<div>
				<Button href="/" theme="primary">
					На главную
				</Button>
			</div>
		</div>
	)
}

export default NotFound
