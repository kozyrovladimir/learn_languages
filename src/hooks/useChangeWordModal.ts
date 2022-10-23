import { useState } from 'react';

import { useFormik } from 'formik';

import { validationSchemaRusEng } from '../constants/validation_schema';
import { wordsSlice } from '../store/reducers/words-store';

import { useAppDispatch } from './redux';

export function useChangeWordModal(): any {
  const [open, setOpen] = useState(false);

  const openModal = (): void => {
    setOpen(true);
  };
  const closeModal = (): void => {
    setOpen(false);
    resetTouched();
  };

  function resetTouched(): void {
    formik.touched.eng = false;
    formik.touched.rus = false;
  }

  const dispatch = useAppDispatch();
  const { changeWord } = wordsSlice.actions;

  const formik = useFormik({
    initialValues: {
      rus: '',
      eng: '',
      id: '',
    },
    validationSchema: validationSchemaRusEng,
    onSubmit: values => {
      dispatch(
        changeWord({ newWorEng: values.eng, newWorRus: values.rus, id: values.id }),
      );
      closeModal();
    },
  });

  return { formik, openModal, closeModal, open };
}
