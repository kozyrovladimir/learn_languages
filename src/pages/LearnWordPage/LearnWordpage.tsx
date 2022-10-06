import React, { useEffect, useState } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { wordsSlice, WordType } from '../../store/reducers/words-store';
import { getRandomItem } from '../../utils/utils';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const LearnWordpage = () => {
  //redux
  const dispatch = useAppDispatch();
  const words = useAppSelector(state => state.wordsReducer);
  const { changeRatingWord } = wordsSlice.actions;

  //refresh word to study
  // eslint-disable-next-line react-hooks/exhaustive-deps,@typescript-eslint/explicit-function-return-type
  function setWord() {
    const initialWord = getRandomItem(words);

    setWordToStudy(initialWord);
  }

  //change rating
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function setRatingUp(word: WordType) {
    if (word.rating === 0) {
      dispatch(changeRatingWord({ id: word.id, newRating: 1 }));
    }
    if (word.rating === 1) {
      dispatch(changeRatingWord({ id: word.id, newRating: 2 }));
    }
    if (word.rating === 2) {
      dispatch(changeRatingWord({ id: word.id, newRating: 3 }));
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function setRatingDown(word: WordType) {
    if (word.rating === 3) {
      dispatch(changeRatingWord({ id: word.id, newRating: 2 }));
    }
    if (word.rating === 2) {
      dispatch(changeRatingWord({ id: word.id, newRating: 1 }));
    }
    if (word.rating === 1) {
      dispatch(changeRatingWord({ id: word.id, newRating: 0 }));
    }
  }

  //check answer
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function checkAnswer(word: string, wordToStudy: WordType) {
    return wordToStudy && word === wordToStudy.eng;
  }

  //set random word during initialisation this component
  useEffect(() => {
    setWord();
  }, []);

  //state of current word for learn
  const [wordToStudy, setWordToStudy] = useState<WordType | null>(null);

  //answer status
  const [answerStatus, setAnswerStatus] = useState<null | 'Верно!' | 'He верно!'>(null);

  //using formik
  const validationSchema = yup.object({
    answer: yup
      .string()
      .max(20, 'Слово не может быть больше 20 символов!')
      .required('Поле обязательно!')
      .trim(),
  });

  const formik = useFormik({
    initialValues: {
      answer: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      if (wordToStudy) {
        let answer = checkAnswer(values.answer, wordToStudy);

        if (answer) {
          setRatingUp(wordToStudy);
          setAnswerStatus('Верно!');
        } else {
          setRatingDown(wordToStudy);
          setAnswerStatus('He верно!');
        }
      }

      //dispatch(addWord({eng: values.rus, rus: values.eng}));
      // eslint-disable-next-line no-param-reassign
      values.answer = '';
      formik.touched.answer = false;
    },
  });

  if (wordToStudy) {
    return (
      <>
        <Box sx={{ mb: 2, mt: 1 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Переведите: <span style={{ color: 'gray' }}>{wordToStudy.rus}</span>
          </Typography>
          <TextField
            disabled={!!answerStatus}
            value={formik.values.answer}
            onChange={formik.handleChange}
            error={formik.touched.answer && Boolean(formik.errors.answer)}
            helperText={formik.touched.answer && formik.errors.answer}
            id="answer"
            name="answer"
            size={'small'}
            label={'Введите перевод:'}
            sx={{ mr: 2 }}
          />
          <Button
            disabled={!!answerStatus}
            variant="outlined"
            size="large"
            sx={{ mr: 2 }}
            onClick={formik.submitForm}
          >
            Проверить
          </Button>
          <Button
            onClick={() => {
              setAnswerStatus(null);
              setWord();
              formik.values.answer = '';
            }}
            variant={'outlined'}
            size={'large'}
          >
            Следующее слово
          </Button>
        </Box>
        <Box>
          {answerStatus ? (
            <Typography
              variant="h5"
              color={answerStatus === 'He верно!' ? 'red' : 'green'}
            >
              {answerStatus}
            </Typography>
          ) : null}
          {answerStatus === 'He верно!' ? (
            <Typography variant="h5" color="darkblue">
              Правильный ответ: {wordToStudy.eng}
            </Typography>
          ) : null}
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Typography variant="h3" align="center">
          Нет слов для изучения
        </Typography>
      </>
    );
  }
};

export default LearnWordpage;
