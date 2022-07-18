import {v1} from 'uuid';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//word types
export type RatingType = 0 | 1 | 2 | 3;

export type WordType = {
    eng: string,
    rus: string,
    rating: RatingType,
    id: string,
    date: Date,
}

//store types
export type WordsStateType = Array<WordType>;

//initial state type
const initialState: Array<WordType> = [
    {rus: 'голова', eng: 'head', date: new Date(), rating: 0, id: v1()},
    {rus: 'брать', eng: 'take', date: new Date(), rating: 0, id: v1()},
    {rus: 'мужчина', eng: 'man', date: new Date(), rating: 0, id: v1()},
    {rus: 'думать', eng: 'think', date: new Date(), rating: 0, id: v1()},
    {rus: 'низкий', eng: 'low', date: new Date(), rating: 0, id: v1()},
    {rus: 'когда', eng: 'when', date: new Date(), rating: 0, id: v1()},
    {rus: 'много', eng: 'many', date: new Date(), rating: 0, id: v1()},
    {rus: 'идти', eng: 'go', date: new Date(), rating: 0, id: v1()},
    {rus: 'сейчас', eng: 'now', date: new Date(), rating: 0, id: v1()},
    {rus: 'чай', eng: 'tea', date: new Date(), rating: 0, id: v1()},
    {rus: 'еда', eng: 'food', date: new Date(), rating: 0, id: v1()},
    {rus: 'тяжелый', eng: 'hard', date: new Date(), rating: 0, id: v1()},
    {rus: 'однажды', eng: 'once', date: new Date(), rating: 0, id: v1()},
    {rus: 'дети', eng: 'children', date: new Date(), rating: 0, id: v1()},
    {rus: 'пример', eng: 'example', date: new Date(), rating: 0, id: v1()},
    {rus: 'говорить', eng: 'talk', date: new Date(), rating: 0, id: v1()},
];

//redux toolkit

export const wordsSlice = createSlice({
    name: 'words',
    initialState: initialState,
    reducers: {
        //need to fix reducer 'setWords'
        setWords(state = initialState, action: PayloadAction<{ words: WordsStateType }>) {
            state.length = 0;
            state = [...action.payload.words];
        },
        changeEngWord(state = initialState, action: PayloadAction<{ newWord: string, id: string }>) {
            const targetWord = state.find(word => word.id === action.payload.id);
            if (targetWord) {
                targetWord.eng = action.payload.newWord;
            }
        },
        changeRusWord(state = initialState, action: PayloadAction<{ newWord: string, id: string }>) {
            const targetWord = state.find(word => word.id === action.payload.id);
            if (targetWord) {
                targetWord.rus = action.payload.newWord;
            }
        },
        changeWord(state = initialState, action: PayloadAction<{ newWorEng: string, newWorRus: string,id: string }>) {
            const targetWord = state.find(word => word.id === action.payload.id);
            if (targetWord) {
                targetWord.rus = action.payload.newWorRus;
                targetWord.eng = action.payload.newWorEng;
            }
        },
        changeRatingWord(state = initialState, action: PayloadAction<{ newRating: RatingType, id: string }>) {
            const targetWord = state.find(word => word.id === action.payload.id);
            if (targetWord) {
                targetWord.rating = action.payload.newRating;
            }
        },
        removeWord(state = initialState, action: PayloadAction<{ id: string }>) {
            const targetIndex = state.findIndex(word => {
                return word.id === action.payload.id
            });
            if (targetIndex) {
                state.splice(targetIndex, 1)
            }
        },
        addWord(state, action: PayloadAction<{ eng: string, rus: string }>) {
            const rus = action.payload.rus;
            const eng = action.payload.eng;
            state.push({rus, eng, id: v1(), date: new Date(), rating: 0});
        }
    }
});

export default wordsSlice.reducer;
