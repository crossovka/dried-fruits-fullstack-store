import styles from './WeightSelector.module.scss';

import { Weight } from '@/types/types';

interface WeightSelectorProps {
	weights: Weight[];
	selectedWeight: Weight | null;
	setSelectedWeight: (weight: Weight) => void;
	className?: string;
}

export const WeightSelector: React.FC<WeightSelectorProps> = ({
	weights,
	selectedWeight,
	setSelectedWeight,
	className = '',
}) => {
	if (weights.length === 0) {
		return null;
	}

	return (
		<div className={`${styles.weights} ${className}`}>
			{weights.map((weight) => {
				const isActive = selectedWeight?.value === weight.value;
				return (
					<button
						key={weight.value}
						className={`${styles.weights__btn} ${
							isActive ? styles.active : ''
						}`}
						onClick={() => setSelectedWeight(weight)}
					>
						{weight.value} {weight.unit}
					</button>
				);
			})}
		</div>
	);
};
