import { configureStore } from '@reduxjs/toolkit'
import postReducer from './postSlicer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, postReducer)
export const store = configureStore({
	reducer: {
		postHandler: persistedReducer,
	},
})

export const persistor = persistStore(store)
