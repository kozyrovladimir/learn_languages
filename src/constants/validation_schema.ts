import * as yup from 'yup';

import { useEngWords, useRusWords } from '../hooks/words';

const maxSymbolsValue = 20;

export const useValidationSchemaRusEng = (): any => {
  const rusWords = useRusWords();
  const engWord = useEngWords();

  return yup.object({
    rus: yup
      .string()
      .max(maxSymbolsValue, 'Максимум 20 символов!')
      .required('Поле обязательно!')
      .trim()
      .notOneOf(rusWords, 'Слово уже есть в хранилище!'),
    eng: yup
      .string()
      .max(maxSymbolsValue, 'Максимум 20 символов!')
      .required('Поле обязательно!')
      .trim()
      .notOneOf(engWord, 'Слово уже есть в хранилище!'),
  });
};

export const useValidationSchemaTranslate = (): any => {
  const rusWords = useRusWords();

  return yup.object({
    translateWord: yup
      .string()
      .max(maxSymbolsValue, 'Не больше 20 символов!')
      .required('Поле обязательно!')
      .trim()
      .notOneOf(rusWords, 'Слово уже есть в хранилище!'),
  });
};
