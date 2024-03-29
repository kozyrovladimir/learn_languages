import { useFormik } from 'formik';

import { wordsSlice } from '../store/reducers/words-store';

import { useAppDispatch } from './redux';
import { useValidationSchemaRusEng } from './validation_schema';

export function useAddWordsForm(): any {
  const dispatch = useAppDispatch();
  const { addWord } = wordsSlice.actions;

  const formik = useFormik({
    initialValues: {
      rus: '',
      eng: '',
    },
    validationSchema: useValidationSchemaRusEng(),
    onSubmit: values => {
      dispatch(addWord({ eng: values.eng, rus: values.rus }));
      // eslint-disable-next-line no-param-reassign
      values.rus = '';
      // eslint-disable-next-line no-param-reassign
      values.eng = '';
      formik.touched.eng = false;
      formik.touched.rus = false;
    },
  });

  return formik;
}
