import React, { useState } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { maxItems } from '../../constants/pagination';
import { useChangeWordModal } from '../../hooks/useChangeWordModal';
import { WordsStateType } from '../../store/reducers/words-store';
import { newPackingItems } from '../../utils/utils';
import PaginationController from '../PaginationController/PaginationController';

import ChangeWordModal from './components/ChangeWordModal';
import WordsTableRow from './components/WordsTableRow';

type WordTablePropsType = {
  words: WordsStateType;
};

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
  },
};

const WordTable: React.FC<WordTablePropsType> = ({ words }) => {
  const { formik, openModal, closeModal, open } = useChangeWordModal();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const packagesOfWords = newPackingItems(words, maxItems);

  //help define curren page when remove words (fix bug)
  const defineCurrentPage = (): number => {
    if (currentPage > packagesOfWords.length) {
      return packagesOfWords.length;
    } else {
      return currentPage;
    }
  };

  return (
    <>
      <ChangeWordModal formik={formik} open={open} closeModal={closeModal} />
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
            {packagesOfWords[defineCurrentPage() - 1].map(word => {
              return (
                <WordsTableRow
                  key={word.id}
                  word={word}
                  openModal={openModal}
                  formik={formik}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationController
        page={defineCurrentPage()}
        numPages={packagesOfWords.length}
        changePageFunc={setCurrentPage}
      />
    </>
  );
};

export default WordTable;
