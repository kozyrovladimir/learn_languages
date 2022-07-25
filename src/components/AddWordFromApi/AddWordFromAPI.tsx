import React from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import {Translate} from '@mui/icons-material';
import {useAddWordFromAPI} from "../../hooks/useAddWordFromAPI";

const AddWordFromApi = () => {
    const {formik, loading, translatedWord, onClickHandler} = useAddWordFromAPI();

    return (
        <>
            <h3>Перевести:</h3>
            <Box sx={{mb: 2}}>
                <TextField
                    disabled={loading}
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
                <LoadingButton
                    loading={loading}
                    startIcon={<Translate/>}
                    variant='outlined'
                    size='large'
                    sx={{mr: 2}}
                    onClick={formik.submitForm}
                >
                    Перевести
                </LoadingButton>
            </Box>
            <Box sx={{mb: 2}}>
                {translatedWord ?
                    <Typography mb={2}>Rus: {translatedWord.rus}. Eng: {translatedWord.eng}.</Typography> : null}
                {translatedWord ? <Button
                    onClick={onClickHandler}
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
