import { cartActions } from './cart/cart.slice'

export const rootActions = {
	...cartActions, // Раскрываем объект с экшенами, чтобы они были доступны напрямую
}
