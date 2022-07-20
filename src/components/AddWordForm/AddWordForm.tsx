import React from 'react';
import {Box, Button, TextField} from "@mui/material";
import * as yup from "yup";
import {useFormik} from "formik";
import {wordsSlice} from "../../store/reducers/words-store";
import {useAppDispatch} from "../../hooks/redux";

const AddWordForm = () => {
    const dispatch = useAppDispatch();
    const {addWord} = wordsSlice.actions;

    const validationSchema = yup.object({
        rus: yup.string()
            .max(20, 'Максимум 20 символов!')
            .required('Поле обязательно!')
            .trim(),
        eng: yup.string()
            .max(20, 'Максимум 20 символов!')
            .required('Поле обязательно!')
            .trim(),
    });

    const formik = useFormik({
        initialValues: {
            rus: '',
            eng: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(addWord({eng: values.eng, rus: values.rus}));
            values.rus = '';
            values.eng = '';
            formik.touched.eng = false;
            formik.touched.rus = false;
        },
    })

    return (
        <Box>
            <h3>Добавить для изучения:</h3>
            <Box sx={{paddingBottom: 2}}>
                <TextField
                    value={formik.values.rus}
                    onChange={formik.handleChange}
                    error={formik.touched.eng && Boolean(formik.errors.rus)}
                    helperText={formik.touched.rus && formik.errors.rus}
                    id="rus"
                    name="rus"
                    label="Rus:"
                    variant="outlined"
                    sx={{marginRight: 2}}
                    size={'small'}
                />
                <TextField
                    value={formik.values.eng}
                    onChange={formik.handleChange}
                    error={formik.touched.eng && Boolean(formik.errors.eng)}
                    helperText={formik.touched.eng && formik.errors.eng}
                    id="eng"
                    name="eng"
                    label="Eng:"
                    variant="outlined"
                    sx={{marginRight: 2}}
                    size={'small'}
                />
                <Button
                    onClick={formik.submitForm}
                    variant={'outlined'}
                    size={'large'}>
                    Добавить
                </Button>
            </Box>
        </Box>
    );
};

export default AddWordForm;
