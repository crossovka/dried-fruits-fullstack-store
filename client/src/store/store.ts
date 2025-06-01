import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

import { cartSlice } from './cart/cart.slice'

// Конфигурация persist
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart'],
}

// Комбинируем редюсеры
const rootReducer = combineReducers({
	cart: cartSlice.reducer,
})

// Применяем persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Создаём store
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

// Экспортируем persistor
export const persistor = persistStore(store)

// Типизация RootState и Dispatch
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// ✅ Кастомные хуки с типизацией
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type TypeRootState = ReturnType<typeof rootReducer>
