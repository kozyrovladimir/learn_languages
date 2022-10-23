import React, { useEffect, useState } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Rating } from '../../constants/rating';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { wordsSlice, WordType } from '../../store/reducers/words-store';
import { getRandomItem } from '../../utils/utils';

const LearnWordpage: React.FC = () => {
  //redux
  const dispatch = useAppDispatch();
  const words = useAppSelector(state => state.wordsReducer);
  const { changeRatingWord } = wordsSlice.actions;

  //refresh word to study
  function setWord(): void {
    const initialWord = getRandomItem(words);

    setWordToStudy(initialWord);
  }

  //change rating

  function setRatingUp(word: WordType): void {
    if (word.rating === Rating.default) {
      dispatch(changeRatingWord({ id: word.id, newRating: 1 }));
    }
    if (word.rating === Rating.low) {
      dispatch(changeRatingWord({ id: word.id, newRating: 2 }));
    }
    if (word.rating === Rating.medium) {
      dispatch(changeRatingWord({ id: word.id, newRating: 3 }));
    }
  }

  function setRatingDown(word: WordType): void {
    if (word.rating === Rating.high) {
      dispatch(changeRatingWord({ id: word.id, newRating: 2 }));
    }
    if (word.rating === Rating.medium) {
      dispatch(changeRatingWord({ id: word.id, newRating: 1 }));
    }
    if (word.rating === Rating.low) {
      dispatch(changeRatingWord({ id: word.id, newRating: 0 }));
    }
  }

  //check answer
  function checkAnswer(word: string, wordToStudy: WordType): boolean {
    return (
      wordToStudy && word.trim().toLowerCase() === wordToStudy.eng.trim().toLowerCase()
    );
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
      // eslint-disable-next-line no-magic-numbers
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
            sx={{ m: 1 }}
          />
          <Button
            disabled={!!answerStatus}
            variant="outlined"
            size="large"
            sx={{ m: 1 }}
            onClick={formik.submitForm}
          >
            Проверить
          </Button>
          <Button
            sx={{ m: 1 }}
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
