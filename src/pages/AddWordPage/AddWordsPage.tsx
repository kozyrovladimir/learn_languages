import React from 'react';
import AddWordForm from "../../components/AddWordForm/AddWordForm";
import WordTable from '../../components/WordTable/WordTable';
import {useAppSelector} from "../../hooks/redux";
import AddWordFromApi from "../../components/AddWordFromApi/AddWordFromAPI";

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
