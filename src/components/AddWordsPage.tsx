import React from 'react';
import AddWordForm from "./AddWordForm";
import {Container} from "@mui/material";
import WordTable from './WordTable';
import {useAppSelector} from "../hooks/redux";

const AddWordsPage = () => {
    const words = useAppSelector(state => state.wordsReducer)
    return (
        <Container>
            <AddWordForm/>
            <WordTable
                words={words}
            />
        </Container>
    );
};

export default AddWordsPage;
