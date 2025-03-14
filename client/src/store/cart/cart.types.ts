import { Product } from '@/types/types';

export interface CartState {
	items: CartItem[];
	totalPrice: number;
}

export interface CartItem extends Product {
	quantity: number;
	selectedWeight: {
		value: number;
		unit: string;
	};
}
