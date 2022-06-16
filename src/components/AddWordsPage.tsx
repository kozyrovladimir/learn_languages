import React from 'react';
import AddWordForm from "./AddWordForm";
import {Container} from "@mui/material";
import WordTable from './WordTable';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {addWordAC, WordsStateType} from "../store/words-store";
import {useInput} from "../utils/utils";

const AddWordsPage = () => {
    //using custom hook for handling inputs
    const rus = useInput('');
    const eng = useInput('');

    const words = useSelector<AppRootStateType, WordsStateType>(state => state.words);
    const dispatch = useDispatch();

    function onSubmit() {
        dispatch(addWordAC(rus.value, eng.value));
        rus.setValue('');
        eng.setValue('');
        console.log('Rus:', rus.value, 'Eng:', eng.value);
    }

    return (
        <Container>
            <AddWordForm
                rus={rus.value}
                eng={eng.value}
                errMessRus={rus.error}
                errMessEng={eng.error}
                rusInputOnChangeHandler={rus.onChange}
                engInputOnChangeHandler={eng.onChange}
                onSubmit={onSubmit}
            />
            <WordTable
                words={words}
            />
        </Container>
    );
};

export default AddWordsPage;
