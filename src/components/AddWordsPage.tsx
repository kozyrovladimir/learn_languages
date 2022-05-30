import React, {useState} from 'react';
import AddWordForm from "./AddWordForm";
import {Container} from "@mui/material";

const AddWordsPage = () => {
    const [rusWord, setRusWord] = useState<string>('');
    const [engWord, setEngWord] = useState<string>('');
    const [errMessRus, setErrMessRus] = useState<string>('');
    const [errMessEng, setErrMessEng] = useState<string>('');

    function rusOnChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setRusWord(e.currentTarget.value);
    };
    function engOnChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setEngWord(e.currentTarget.value);
    };
    function onSubmit() {
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
        </Container>
    );
};

export default AddWordsPage;
