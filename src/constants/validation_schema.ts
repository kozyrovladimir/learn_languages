import * as yup from "yup";

export const validationSchemaRusEng = yup.object({
    rus: yup.string()
        .max(20, 'Максимум 20 символов!')
        .required('Поле обязательно!')
        .trim(),
    eng: yup.string()
        .max(20, 'Максимум 20 символов!')
        .required('Поле обязательно!')
        .trim(),
});

export const validationSchemaTranslate = yup.object({
    translateWord: yup.string()
        .max(20, 'Не больше 20 символов!')
        .required('Поле обязательно!')
        .trim(),
}); 
