import {v1} from 'uuid';

//word types
export type WordType = {
    eng: string,
    rus: string,
    rating: 1 | 2 | 3,
    id: string,
    date: Date,
}

//store types
export type WordsStateType = Array<WordType>;

//action types
export type SetWordsActionType = {
    type: 'SET-WORDS',
    words: WordsStateType,
}

export  type ChangeEngWordActionType = {
    type: 'CHANGE-ENG-WORD',
    id: string,
    newWord: string,
};

export  type ChangeRusWordActionType = {
    type: 'CHANGE-RUS-WORD',
    id: string,
    newWord: string,
};
export  type ChangeRatingWordActionType = {
    type: 'CHANGE-RATING-WORD',
    id: string,
    newRating: 1 | 2 | 3,
};
export  type RemoveWordActionType = {
    type: 'REMOVE-WORD',
    id: string,
};
export  type AddWordActionType = {
    type: 'ADD-WORD',
    word: WordType,
};

//all actions types
type ActionsType = SetWordsActionType | ChangeEngWordActionType | ChangeRusWordActionType | ChangeRatingWordActionType
    | RemoveWordActionType | AddWordActionType;

//initial state type
const initialState: Array<WordType> = []

//reducer
export const wordsReducer = (state: WordsStateType = initialState, action: ActionsType): WordsStateType => {
    switch (action.type) {
        case 'SET-WORDS': {
            return action.words;
        }
        case 'CHANGE-ENG-WORD': {
            const changedState = state.map(word => {
                if (word.id === action.id) {
                    return {...word, eng: action.newWord}
                } else {
                    return {...word}
                }
            });
            return changedState;
        }
        case 'CHANGE-RUS-WORD': {
            const changedState = state.map(word => {
                if (word.id === action.id) {
                    return {...word, rus: action.newWord}
                } else {
                    return {...word}
                }
            });
            return changedState;
        }
        case 'CHANGE-RATING-WORD': {
            const changedState = state.map(word => {
                if (word.id === action.id) {
                    return {...word, rating: action.newRating}
                } else {
                    return {...word}
                }
            });
            return changedState;
        }
        case 'REMOVE-WORD': {
            const changedState = state.map(word => {
                return {...word}
            });
            const targetIndex = changedState.findIndex(word => {
                return word.id === action.id
            });
            if (targetIndex) {
                changedState.splice(targetIndex, 1)
            }
            return changedState;
        }
        case 'ADD-WORD': {
            const changedState = state.map(word => {
                return {...word}
            });
            changedState.push(action.word);
            return changedState;
        }
        default:
            return state;
    }
}

//action creators
export const setWordsAC = (words: WordsStateType): SetWordsActionType => {
    return {type: 'SET-WORDS', words}
}

export const changeEngWordAC = (newWord: string, id: string): ChangeEngWordActionType => {
    return {type: 'CHANGE-ENG-WORD', newWord, id}
}

export const changeRusWordAC = (newWord: string, id: string): ChangeRusWordActionType => {
    return {type: 'CHANGE-RUS-WORD', newWord, id}
}

export const changeRatingWordAC = (newRating: 1 | 2 | 3, id: string): ChangeRatingWordActionType => {
    return {type: 'CHANGE-RATING-WORD', newRating, id}
}

export const removeWordAC = (id: string): RemoveWordActionType => {
    return {type: 'REMOVE-WORD', id}
}

export const addWordAC = (eng: string, rus: string): AddWordActionType => {
    return {type: 'ADD-WORD', word: {rus, eng, id: v1(), date: new Date(), rating: 1}}
}