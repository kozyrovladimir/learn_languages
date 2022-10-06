import React from 'react';

import AddWordForm from '../../components/AddWordForm/AddWordForm';
import AddWordFromApi from '../../components/AddWordFromApi/AddWordFromAPI';
import WordTable from '../../components/WordTable/WordTable';
import { useAppSelector } from '../../hooks/redux';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const AddWordsPage = () => {
  const words = useAppSelector(state => state.wordsReducer);

  return (
    <>
      <AddWordForm />
      <AddWordFromApi />
      {!!words.length && <WordTable words={words} />}
    </>
  );
};

export default AddWordsPage;
