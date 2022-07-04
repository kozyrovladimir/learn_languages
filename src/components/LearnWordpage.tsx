import React, {useEffect, useState} from 'react';
import {Box, Button, Container, containerClasses, TextField, Typography} from "@mui/material";
import {wordsSlice, WordType} from "../store/words-store";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getRandomItem} from "../utils/utils";
import * as yup from "yup";
import {useFormik} from "formik";

const LearnWordpage = () => {
    //redux
    const dispatch = useAppDispatch();
    const words = useAppSelector(state => state.wordsReducer);
    const {changeRatingWord} = wordsSlice.actions;

    //refresh word to study
    function setWord() {
        const initialWord = getRandomItem(words);
        setWordToStudy(initialWord);
    }

    //change rating
    function setRatingUp(word: WordType) {
        if (word.rating === 1) {
            dispatch(changeRatingWord({id: word.id, newRating: 2}))
        };
        if (word.rating === 2) {
            dispatch(changeRatingWord({id: word.id, newRating: 3}))
        };
    };

    function setRatingDown(word: WordType) {
        if (word.rating === 3) {
            dispatch(changeRatingWord({id: word.id, newRating: 2}))
        };
        if (word.rating === 2) {
            dispatch(changeRatingWord({id: word.id, newRating: 1}))
        };
    }

    //check answer
    function checkAnswer(word: string, wordToStudy: WordType){
        if (wordToStudy && word === wordToStudy.eng) {
            return true;
        } else {
            return false
        }
    }

    //set random word during initialisation this component
    useEffect(() => {
        setWord();
    }, [])

    //state of current word for learn
    const [wordToStudy, setWordToStudy] = useState<WordType | null>(null);

    //answer status
    const [answerStatus, setAnswerStatus] = useState<null | 'Верно!' | 'He верно!'>(null)

    //using formik
    const validationSchema = yup.object({
        answer: yup.string()
            .max(20, 'Слово не может быть больше 20 символов!')
            .required('Поле обязательно!')
            .trim(),
    });

    const formik = useFormik({
        initialValues: {
            answer: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (wordToStudy) {
                let answer = checkAnswer(values.answer, wordToStudy);
                if (answer) {
                    setRatingUp(wordToStudy);
                    setAnswerStatus('Верно!');
                } else {
                    setRatingDown(wordToStudy);
                    setAnswerStatus('He верно!');
                }
            }

            //dispatch(addWord({eng: values.rus, rus: values.eng}));
            values.answer = '';
            formik.touched.answer = false;
        },
    })

    if(wordToStudy) {
        return (
        <Container>
            <Typography variant='h3' align='center' sx={{mb: 2}}>{wordToStudy.rus}</Typography>
            <Box sx={{mb: 2}}>
                <TextField
                    disabled={!!answerStatus}
                    value={formik.values.answer}
                    onChange={formik.handleChange}
                    error={formik.touched.answer && Boolean(formik.errors.answer)}
                    helperText={formik.touched.answer && formik.errors.answer}
                    id="answer"
                    name="answer"
                    size={'small'}
                    label={'Введите перевод:'}
                    sx={{mr: 2}}
                />
                <Button
                    disabled={!!answerStatus}
                    variant='outlined'
                    size='large'
                    sx={{mr: 2}}
                    onClick={formik.submitForm}
                >
                    Проверить
                </Button>
                <Button
                    onClick={() => {
                        setAnswerStatus(null);
                        setWord();
                        formik.values.answer = '';
                    }}
                    variant={'outlined'}
                    size={'large'}
                >
                    Следующее слово
                </Button>
            </Box>
            <Box>
                {answerStatus ? <Typography variant='h5' align='center' color={answerStatus === 'He верно!' ? 'red' : 'green'}>{answerStatus}</Typography> : null}
                {answerStatus ? <Typography variant='h5' align='center' color='darkblue'>Правильный ответ: {wordToStudy.eng}</Typography> : null}
            </Box>
        </Container>
        )
    } else {
        return (
            <Container>
                <Typography variant='h3' align='center'>Нет слов для изучения</Typography>
            </Container>
        )
    }
};

export default LearnWordpage;
