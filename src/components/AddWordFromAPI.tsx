import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import * as yup from "yup";
import {useFormik} from "formik";
import {deepTranslateAPI} from "../api/deep-translate-api";
import {useAppDispatch} from "../hooks/redux";
import {wordsSlice} from "../store/words-store";

const AddWordFromApi = () => {
    //redux
    const dispatch = useAppDispatch();
    const {addWord} = wordsSlice.actions;

    //translated word state
    const[translatedWord, setTranslatedWord] = useState<null | {rus: string, eng: string}>(null);

    //using formik
    const validationSchema = yup.object({
        translateWord: yup.string()
            .max(20, 'Слово не может быть больше 20 символов!')
            .required('Поле обязательно!')
            .trim(),
    });

    const formik = useFormik({
        initialValues: {
            translateWord: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            deepTranslateAPI.translateRuToEn(values.translateWord)
                .then(function (response) {
                   const translatedWord = response.data.data.translations.translatedText;
                   setTranslatedWord({rus: values.translateWord, eng: translatedWord});
                    values.translateWord = '';
                    formik.touched.translateWord = false;
                })
                .catch(function (error) {
                console.error(error);
                values.translateWord = '';
                formik.touched.translateWord = false;
            });
        },
    })

    return (
            <>
                <h3>Перевести слово:</h3>
                <Box sx={{mb: 2}}>
                    <TextField
                        value={formik.values.translateWord}
                        onChange={formik.handleChange}
                        error={formik.touched.translateWord && Boolean(formik.errors.translateWord)}
                        helperText={formik.touched.translateWord && formik.errors.translateWord}
                        id="translateWord"
                        name="translateWord"
                        size={'small'}
                        label={'Введите слово (rus):'}
                        sx={{mr: 2}}
                    />
                    <Button
                        variant='outlined'
                        size='large'
                        sx={{mr: 2}}
                        onClick={formik.submitForm}
                    >
                        Перевести
                    </Button>
                </Box>
                <Box sx={{mb: 2}}>
                    {translatedWord ? <Typography>Rus: {translatedWord.rus}. Eng: {translatedWord.eng}.</Typography> : null}
                    {translatedWord ? <Button
                        onClick={() =>{
                            console.log(translatedWord);
                            if(translatedWord) {
                                dispatch(addWord(translatedWord));
                                setTranslatedWord(null);
                            }
                        }}
                        variant='outlined'
                        size='large'
                    >
                        Добавить для изучения
                    </Button> : null}

                </Box>
            </>
    );
};

export default AddWordFromApi;
