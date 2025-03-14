import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from './cart.types';

const initialState: CartState = {
	items: [],
	totalPrice: 0,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		// Добавление товара в корзину
		addItem: (state, action: PayloadAction<CartItem>) => {
			// Создаём уникальный идентификатор для товара, учитывая выбранный вес
			const { id, selectedWeight } = action.payload;
			const existingItem = state.items.find(
				(item) =>
					item.id === id && item.selectedWeight?.value === selectedWeight?.value
			);

			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				// Если товар с таким весом ещё не добавлен — добавляем новый элемент
				state.items.push({ ...action.payload, quantity: 1 });
			}

			// Обновляем общую сумму
			state.totalPrice = state.items.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			);
		},

		// Уменьшение количества товара (если 1 шт. - удаляется из корзины)
		decreaseItem: (
			state,
			action: PayloadAction<{
				id: number;
				selectedWeight: { value: number; unit: string };
			}>
		) => {
			const { id, selectedWeight } = action.payload;
			const existingItem = state.items.find(
				(item) =>
					item.id === id && item.selectedWeight?.value === selectedWeight?.value
			);

			if (existingItem) {
				if (existingItem.quantity > 1) {
					existingItem.quantity -= 1;
				} else {
					state.items = state.items.filter(
						(item) =>
							item.id !== id ||
							item.selectedWeight?.value !== selectedWeight?.value
					);
				}
			}

			// Обновляем общую стоимость
			state.totalPrice = state.items.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			);
		},

		// Удаление товара полностью из корзины
		removeItem: (
			state,
			action: PayloadAction<{
				id: number;
				selectedWeight: { value: number; unit: string };
			}>
		) => {
			const { id, selectedWeight } = action.payload;
			state.items = state.items.filter(
				(item) =>
					item.id !== id || item.selectedWeight?.value !== selectedWeight?.value
			);

			// Обновляем общую стоимость
			state.totalPrice = state.items.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			);
		},

		// Очистка всей корзины
		clearCart: (state) => {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
