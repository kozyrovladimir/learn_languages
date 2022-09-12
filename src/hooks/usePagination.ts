import {useState} from "react";

export function usePagination() {
    const [pagesState, setPagesState] = useState<{ currentPage: number }>({currentPage: 1});
    const changePageFunc = (page: number) => setPagesState({currentPage: page});

    return {pagesState, changePageFunc};
};
