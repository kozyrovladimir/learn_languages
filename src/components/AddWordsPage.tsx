import React from 'react';
import AddWordForm from "./AddWordForm";
import {Container} from "@mui/material";
import WordTable from './WordTable';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {WordsStateType} from "../store/words-store";

const AddWordsPage = () => {
    const words = useSelector<AppRootStateType, WordsStateType>(state => state.words);
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
