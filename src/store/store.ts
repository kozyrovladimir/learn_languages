import {combineReducers} from 'redux';
import wordsReducer from "./words-store";
import {configureStore} from "@reduxjs/toolkit";
import { persistStore, persistReducer,} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    wordsReducer
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

//redux toolkit
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persiststor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
