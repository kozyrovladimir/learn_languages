import { useState } from 'react';

import { useFormik } from 'formik';

import { validationSchemaRusEng } from '../constants/validation_schema';
import { wordsSlice } from '../store/reducers/words-store';

import { useAppDispatch } from './redux';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useChangeWordModal() {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
    resetTouched();
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function resetTouched() {
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
