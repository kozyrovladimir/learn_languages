import wordsReducer, {wordsSlice} from "./words-store";
import {WordsStateType} from "./words-store";
import {v1} from "uuid";

const {addWord, setWords, changeEngWord, changeRusWord, changeRatingWord, removeWord} = wordsSlice.actions;

//need to fix test 'correct set store'
test('correct set store', () => {
    const initialState: WordsStateType = [];
    const newWords: WordsStateType = [
        {
            rus: 'картошка',
            eng: 'potatoes',
            rating: 1,
            date: new Date(),
            id: v1(),
        },
        {
            rus: 'кот',
            eng: 'сat',
            rating: 2,
            date: new Date(),
            id: v1(),
        },
        {
            rus: 'рука',
            eng: 'hand',
            rating: 3,
            date: new Date(),
            id: v1(),
        },
    ]

    const newState = wordsReducer(initialState, setWords({words: newWords}));
    expect(newState.length).toBe(3);
    expect(newState[0].rus).toBe('картошка');
    expect(newState[2].eng).toBe('hand');
    expect(newState[1].rating).toBe(2);
});

test('correct change eng word', () => {
    const initialState: WordsStateType = [
        {
            rus: 'картошка',
            eng: 'potatoes',
            rating: 1,
            date: new Date(),
            id: '1',
        },
        {
            rus: 'кот',
            eng: 'сat',
            rating: 2,
            date: new Date(),
            id: '2',
        },
        {
            rus: 'рука',
            eng: 'ruka',
            rating: 3,
            date: new Date(),
            id: '3',
        },
    ];

    const newState = wordsReducer(initialState, changeEngWord({newWord: 'hand', id: '3'}));

    expect(newState[2].eng).toBe('hand');
    expect(newState[2].rating).toBe(3);
});

test('correct change rus word', () => {
    const initialState: WordsStateType = [
        {
            rus: 'картошка',
            eng: 'potatoes',
            rating: 1,
            date: new Date(),
            id: '1',
        },
        {
            rus: 'kit',
            eng: 'сat',
            rating: 2,
            date: new Date(),
            id: '2',
        },
        {
            rus: 'рука',
            eng: 'hand',
            rating: 3,
            date: new Date(),
            id: '3',
        },
    ];

    const newState = wordsReducer(initialState, changeRusWord({newWord: 'кот', id: '2'}));

    expect(newState[1].rus).toBe('кот');
    expect(newState[1].rating).toBe(2);
});

test('correct change rating', () => {
    const initialState: WordsStateType = [
        {
            rus: 'картошка',
            eng: 'potatoes',
            rating: 1,
            date: new Date(),
            id: '1',
        },
        {
            rus: 'кот',
            eng: 'сat',
            rating: 2,
            date: new Date(),
            id: '2',
        },
        {
            rus: 'рука',
            eng: 'hand',
            rating: 3,
            date: new Date(),
            id: '3',
        },
    ];

    const newState = wordsReducer(initialState, changeRatingWord({newRating: 2, id: '1'}));

    expect(newState[0].rating).toBe(2);
    expect(newState[2].rating).toBe(3);
});

test('correct remove word', () => {
    const initialState: WordsStateType = [
        {
            rus: 'картошка',
            eng: 'potatoes',
            rating: 1,
            date: new Date(),
            id: '1',
        },
        {
            rus: 'кот',
            eng: 'сat',
            rating: 2,
            date: new Date(),
            id: '2',
        },
        {
            rus: 'рука',
            eng: 'hand',
            rating: 3,
            date: new Date(),
            id: '3',
        },
    ];

    const newState = wordsReducer(initialState, removeWord({id: '2'}));

    expect(newState.length).toBe(2);
    expect(newState[1].id).toBe('3');
});

test('correct add word', () => {
    const initialState: WordsStateType = [
        {
            rus: 'картошка',
            eng: 'potatoes',
            rating: 1,
            date: new Date(),
            id: '1',
        },
        {
            rus: 'кот',
            eng: 'сat',
            rating: 2,
            date: new Date(),
            id: '2',
        },
        {
            rus: 'рука',
            eng: 'hand',
            rating: 3,
            date: new Date(),
            id: '3',
        },
    ];

    const newState = wordsReducer(initialState, addWord({rus: 'массив', eng: 'array'}));

    expect(newState.length).toBe(4);
    expect(newState[3].eng).toBe('array');
});
