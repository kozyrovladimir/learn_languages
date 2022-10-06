import * as yup from 'yup';

const maxSymbolsValue = 20;

export const validationSchemaRusEng = yup.object({
  rus: yup
    .string()
    .max(maxSymbolsValue, 'Максимум 20 символов!')
    .required('Поле обязательно!')
    .trim(),
  eng: yup
    .string()
    .max(maxSymbolsValue, 'Максимум 20 символов!')
    .required('Поле обязательно!')
    .trim(),
});

export const validationSchemaTranslate = yup.object({
  translateWord: yup
    .string()
    .max(maxSymbolsValue, 'Не больше 20 символов!')
    .required('Поле обязательно!')
    .trim(),
});
