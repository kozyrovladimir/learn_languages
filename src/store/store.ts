import {combineReducers, createStore} from 'redux';
import {wordsReducer} from "./words-store";

const rootReducer = combineReducers({
    words: wordsReducer,
})

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;