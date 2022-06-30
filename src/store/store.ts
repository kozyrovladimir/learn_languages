import {combineReducers, createStore} from 'redux';
import wordsReducer from "./words-store";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    wordsReducer
})

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;

//redux toolkit
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
