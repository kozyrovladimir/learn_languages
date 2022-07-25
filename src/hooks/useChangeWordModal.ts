import {useAppDispatch} from "./redux";
import {wordsSlice} from "../store/reducers/words-store";
import {useFormik} from "formik";
import {validationSchemaRusEng} from "../constants/validation_schema";
import {useState} from "react";

export function useChangeWordModal() {
    const [open, setOpen] = useState(false);
    const openModal = () => {
        setOpen(true);
    };
    const closeModal = () => {
        setOpen(false);
        resetTouched();
    };

    function resetTouched() {
        formik.touched.eng = false;
        formik.touched.rus = false;
    }

    const dispatch = useAppDispatch();
    const {changeWord} = wordsSlice.actions;

    const formik = useFormik({
        initialValues: {
            rus: '',
            eng: '',
            id: '',
        },
        validationSchema: validationSchemaRusEng,
        onSubmit: (values) => {
            dispatch(changeWord({newWorEng: values.eng, newWorRus: values.rus, id: values.id}));
            closeModal();
        },
    });

    return {formik, openModal, closeModal, open}
}
