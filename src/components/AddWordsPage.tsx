import React from 'react';
import AddWordForm from "./AddWordForm";
import {Container, Button} from "@mui/material";
import WordTable from './WordTable';
import {useAppSelector} from "../hooks/redux";
import AddWordFromApi from "./AddWordFromAPI";
import {useNavigate} from "react-router-dom";

const AddWordsPage = () => {
    const words = useAppSelector(state => state.wordsReducer);
    return (
        <>
            <AddWordForm/>
            <AddWordFromApi/>
            <WordTable
                words={words}
            />
        </>
    );
};

export default AddWordsPage;
