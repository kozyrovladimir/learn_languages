import React from 'react';
import AddWordForm from "./AddWordForm";
import WordTable from './WordTable';
import {useAppSelector} from "../hooks/redux";
import AddWordFromApi from "./AddWordFromAPI";

const AddWordsPage = () => {
    const words = useAppSelector(state => state.wordsReducer);
    return (
        <>
            <AddWordForm/>
            <AddWordFromApi/>
            {
                !!words.length &&
                <WordTable
                    words={words}
                />
            }
        </>
    );
};

export default AddWordsPage;
