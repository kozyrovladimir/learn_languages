import { useState } from 'react';

type usePaginationT = {
  pagesState: { currentPage: number };
  changePageFunc: (page: number) => void;
};

export function usePagination(): usePaginationT {
  const [pagesState, setPagesState] = useState<{ currentPage: number }>({
    currentPage: 1,
  });
  const changePageFunc = (page: number): void => setPagesState({ currentPage: page });

  return { pagesState, changePageFunc };
}
