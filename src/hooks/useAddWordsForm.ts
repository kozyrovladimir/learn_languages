import {useAppDispatch} from "./redux";
import {wordsSlice} from "../store/reducers/words-store";
import {useFormik} from "formik";
import {validationSchemaRusEng} from "../constants/validation_schema";

export function useAddWordsForm() {
    const dispatch = useAppDispatch();
    const {addWord} = wordsSlice.actions;

    const formik = useFormik({
        initialValues: {
            rus: '',
            eng: '',
        },
        validationSchema: validationSchemaRusEng,
        onSubmit: (values) => {
            dispatch(addWord({eng: values.eng, rus: values.rus}));
            values.rus = '';
            values.eng = '';
            formik.touched.eng = false;
            formik.touched.rus = false;
        },
    });

    return formik;
}
