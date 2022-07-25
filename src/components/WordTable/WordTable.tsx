import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {WordsStateType} from "../../store/reducers/words-store";
import PaginationController from '../PaginationController/PaginationController';
import {newPackingItems} from "../../utils/utils";
import {useChangeWordModal} from "../../hooks/useChangeWordModal";
import ChangeWordModal from "./components/ChangeWordModal";
import WordsTableRow from "./components/WordsTableRow";
import {maxItems} from "../../constants/pagination";
import {usePagination} from "../../hooks/usePagination";

type WordTablePropsType = {
    words: WordsStateType
}

const styles = {
    boxStyle: {
        paddingTop: 2,
        paddingBottom: 2,
        backdropFilter: 'blur(20px)',
    },
    tableContainerStyle: {
        backgroundColor: 'rgba(255,255,255, 0.3)',
        paddingTop: 2,
        paddingBottom: 2,
        backdropFilter: 'blur(20px)',
    },
    tableStyle: {
        minWidth: 650,
    },
    tableCellStyle: {
        fontWeight: 'bold',
    }
}

export default function WordTable({words}: WordTablePropsType) {
    const {formik, openModal, closeModal, open} = useChangeWordModal();
    const {pagesState, changePageFunc} = usePagination();

    const packagesOfWords = newPackingItems(words, maxItems);

    return (
        <>
            <ChangeWordModal
                formik={formik}
                open={open}
                closeModal={closeModal}
            />
            <TableContainer sx={styles.tableContainerStyle} component={Paper}>
                <Table sx={styles.tableStyle} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={styles.tableCellStyle}>Rus:</TableCell>
                            <TableCell sx={styles.tableCellStyle}>Eng:</TableCell>
                            <TableCell sx={styles.tableCellStyle}>Прогресс изучения:</TableCell>
                            <TableCell sx={styles.tableCellStyle}>Дата добавления:</TableCell>
                            <TableCell sx={styles.tableCellStyle}>Действия:</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packagesOfWords[pagesState.currentPage - 1].map((word) => {
                            return (
                                <WordsTableRow
                                    word={word}
                                    openModal={openModal}
                                    formik={formik}
                                />
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationController
                page={pagesState.currentPage}
                numPages={packagesOfWords.length}
                changePageFunc={changePageFunc}
            />
        </>
    );
}
