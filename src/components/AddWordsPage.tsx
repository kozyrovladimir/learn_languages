import React, {useState} from 'react';
import AddWordForm from "./AddWordForm";
import {Box, Container} from "@mui/material";
import WordTable from './WordTable';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {addWordAC, WordsStateType} from "../store/words-store";

const AddWordsPage = () => {
    const [rusWord, setRusWord] = useState<string>('');
    const [engWord, setEngWord] = useState<string>('');
    const [errMessRus, setErrMessRus] = useState<string>('');
    const [errMessEng, setErrMessEng] = useState<string>('');

    const words = useSelector<AppRootStateType, WordsStateType>(state => state.words);
    const dispatch = useDispatch();

    function rusOnChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setRusWord(e.currentTarget.value);
    };

    function engOnChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setEngWord(e.currentTarget.value);
    };

    function onSubmit() {
        dispatch(addWordAC(engWord, rusWord));
        setRusWord('');
        setEngWord('');
        console.log('Rus:', rusWord, 'Eng:', engWord);
    }

    return (
        <Container>
            <AddWordForm
                rus={rusWord}
                eng={engWord}
                errMessRus={errMessRus}
                errMessEng={errMessEng}
                rusInputOnChangeHandler={rusOnChangeHandler}
                engInputOnChangeHandler={engOnChangeHandler}
                onSubmit={onSubmit}
            />
            <WordTable
                words={words}
            />
        </Container>
    );
};

export default AddWordsPage;
