import React from 'react';
import {Box, Button, TextField} from "@mui/material";
import * as yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {addWordAC} from "../store/words-store";

const AddWordForm = () => {
    const dispatch = useDispatch();

    //using formik
    const validationSchema = yup.object({
        rus: yup.string()
            .max(20, 'Слово не может быть больше 20 символов!')
            .required('Поле обязательно!'),
        eng: yup.string()
            .max(20, 'Слово не может быть больше 20 символов!')
            .required('Поле обязательно!'),
    });

    const formik = useFormik({
        initialValues: {
            rus: '',
            eng: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(addWordAC(values.rus, values.eng));
            values.rus = '';
            values.eng = '';
            formik.touched.eng = false;
            formik.touched.rus = false;
        },
    })

    return (
        <Box>
            <h3>Добавить новое слово для изучения:</h3>
            <Box sx={{paddingBottom: 2}}>
                <TextField
                    value={formik.values.rus}
                    onChange={formik.handleChange}
                    error={formik.touched.eng && Boolean(formik.errors.rus)}
                    helperText={formik.touched.rus && formik.errors.rus}
                    id="rus"
                    name="rus"
                    label="Слово на русском:"
                    variant="outlined"
                    sx={{marginRight: 2}}/>
                <TextField
                    value={formik.values.eng}
                    onChange={formik.handleChange}
                    error={formik.touched.eng && Boolean(formik.errors.eng)}
                    helperText={formik.touched.eng && formik.errors.eng}
                    id="eng"
                    name="eng"
                    label="Слово на английском:"
                    variant="outlined"
                    sx={{marginRight: 2}}/>
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
