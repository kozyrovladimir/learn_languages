import { useAppSelector } from './redux';

export const useEngWords = (): string[] => {
  const words = useAppSelector(state => state.wordsReducer);

  return words.map(({ eng }) => eng);
};

export const useRusWords = (): string[] => {
  const words = useAppSelector(state => state.wordsReducer);

  return words.map(({ rus }) => rus);
};
