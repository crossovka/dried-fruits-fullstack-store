import { Weight } from '@/types/types';

interface WeightSelectorProps {
	weights: Weight[];
	selectedWeight: Weight | null;
	setSelectedWeight: (weight: Weight) => void;
	className?: string; // Новый пропс для className
}

const WeightSelector: React.FC<WeightSelectorProps> = ({
	weights,
	selectedWeight,
	setSelectedWeight,
	className = '',
}) => {
	if (weights.length === 0) {
		return null; // Возвращаем null, если весов нет
	}

	return (
		<div className={`weights ${className}`}>
			{' '}
			{/* Добавляем className */}
			{weights.map((weight) => (
				<button
					key={weight.value}
					className={`weights__btn ${
						selectedWeight?.value === weight.value ? 'active' : ''
					}`}
					onClick={() => setSelectedWeight(weight)}
				>
					{weight.value} {weight.unit}
				</button>
			))}
		</div>
	);
};

export default WeightSelector;
