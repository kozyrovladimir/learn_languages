import React from 'react';
import AddWordForm from "./AddWordForm";
import {Container} from "@mui/material";
import WordTable from './WordTable';
import {useAppSelector} from "../hooks/redux";
import AddWordFromApi from "./AddWordFromAPI";

const AddWordsPage = () => {
    const words = useAppSelector(state => state.wordsReducer)
    return (
        <Container>
            <AddWordForm/>
            <AddWordFromApi/>
            <WordTable
                words={words}
            />
        </Container>
    );
};

export default AddWordsPage;
