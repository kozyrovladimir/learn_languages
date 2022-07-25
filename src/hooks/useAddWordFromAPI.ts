import {useAppDispatch} from "./redux";
import {wordsSlice} from "../store/reducers/words-store";
import {useState} from "react";
import {useFormik} from "formik";
import {validationSchemaTranslate} from "../constants/validation_schema";
import {deepTranslateAPI} from "../api/deep-translate-api";

export function useAddWordFromAPI() {
    const dispatch = useAppDispatch();
    const {addWord} = wordsSlice.actions;

    const [translatedWord, setTranslatedWord] = useState<null | { rus: string, eng: string }>(null);

    const [loading, setLoading] = useState<boolean>(false);

    function onClickHandler() {
        if (translatedWord) {
            dispatch(addWord(translatedWord));
            setTranslatedWord(null);
        }
    }

    const formik = useFormik({
        initialValues: {
            translateWord: '',
        },
        validationSchema: validationSchemaTranslate,
        onSubmit: (values) => {
            setLoading(true);
            deepTranslateAPI.translateRuToEn(values.translateWord)
                .then(function (response) {
                    const translatedWord = response.data.data.translations.translatedText;
                    setTranslatedWord({rus: values.translateWord, eng: translatedWord});
                    values.translateWord = '';
                    formik.touched.translateWord = false;
                    setLoading(false);
                })
                .catch(function (error) {
                    console.error(error);
                    values.translateWord = '';
                    formik.touched.translateWord = false;
                    setLoading(false);
                });
        },
    });

    return {formik, loading, translatedWord, onClickHandler}
}
