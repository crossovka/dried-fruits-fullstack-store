import styles from './WeightSelector.module.scss'

import { WeightVariant } from '@/types/types'

interface WeightSelectorProps {
	weights: WeightVariant[]
	selectedWeight: WeightVariant | null
	setSelectedWeight: (weight: WeightVariant) => void
	className?: string
}

export const WeightSelector: React.FC<WeightSelectorProps> = ({
	weights,
	selectedWeight,
	setSelectedWeight,
	className = '',
}) => {
	if (weights.length === 0) return null

	return (
		<div className={`${styles.weights} ${className}`}>
			{weights.map((weight) => {
				const isActive = selectedWeight?.value === weight.value
				const isDisabled = weight.stock <= 0

				return (
					<button
						key={weight.value}
						className={`${styles.weights__btn} ${
							isActive ? styles.active : ''
						} ${isDisabled ? styles.disabled : ''}`}
						onClick={() => !isDisabled && setSelectedWeight(weight)}
						disabled={isDisabled}
						type="button"
					>
						{weight.value} {weight.unit}
					</button>
				)
			})}
		</div>
	)
}
