import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {wordsSlice, WordsStateType} from "../../store/reducers/words-store";
import {useAppDispatch} from "../../hooks/redux";
import StarRating from "./components/StarRating";
import Typography from '@mui/material/Typography';
import {Box, IconButton, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import ReplayIcon from '@mui/icons-material/Replay';
import PaginationController from '../PaginationController/PaginationController';
import {newPackingItems} from "../../utils/utils";
import {useChangeWordModal} from "../../hooks/useChangeWordModal";
import ChangeWordModal from "./components/ChangeWordModal";

type WordTablePropsType = {
    words: WordsStateType
}

export default function WordTable(props: WordTablePropsType) {
    const {formik, openModal, closeModal, open} = useChangeWordModal();
    const dispatch = useAppDispatch();
    const {changeRatingWord, removeWord} = wordsSlice.actions;

    const [pagesState, setPagesState] = useState<{ currentPage: number }>({currentPage: 1});
    const changePageFunc = (page: number) => setPagesState({currentPage: page});

    const packagesOfWords = newPackingItems(props.words, 10);

    return (
        <>
            <ChangeWordModal
                formik={formik}
                open={open}
                closeModal={closeModal}
            />
            <Box sx={{paddingTop: 2, paddingBottom: 2, backdropFilter: 'blur(20px)'}}>
                <TableContainer sx={{backgroundColor: 'rgba(255,255,255, 0.3)'}} component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold'}}>Rus:</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}}>Eng:</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}}>Прогресс изучения:</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}}>Дата добавления:</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}}>Действия:</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {packagesOfWords[pagesState.currentPage - 1].map((word) => {
                                const date = new Date(word.date);
                                const wordColor = word.rating === 3 ? '#00d700' : '';
                                const backgroundColorRow = word.rating === 3 ? '#f6fff6' : '';

                                //onclick handlers
                                const editOnClickHandler = () => {
                                    openModal();
                                    formik.values.eng = word.eng;
                                    formik.values.rus = word.rus;
                                    formik.values.id = word.id;
                                };
                                const doneOnClickHandler = () => dispatch(changeRatingWord({
                                    id: word.id,
                                    newRating: 3
                                }));
                                const resetOnClickHandler = () => dispatch(changeRatingWord({
                                    id: word.id,
                                    newRating: 0
                                }));
                                const deleteOnClickHandler = () => dispatch(removeWord({id: word.id}));

                                return (
                                    <TableRow
                                        key={word.id}
                                        sx={{
                                            '&:last-child td, &:last-child th': {border: 0},
                                            backgroundColor: backgroundColorRow,
                                            '&:hover': {
                                                backgroundColor: 'rgba(255,196,0,0.13)',
                                                transition: 'all 100ms ease-in-out'
                                            },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Typography sx={{color: wordColor}}>
                                                {word.rus}
                                            </Typography>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Typography sx={{color: wordColor}}>
                                                {word.eng}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <StarRating starAmount={word.rating}/>
                                        </TableCell>
                                        <TableCell>{date.toLocaleDateString()} {date.toLocaleTimeString()}</TableCell>
                                        <TableCell sx={{display: 'flex', flexDirection: 'column'}}>
                                            {/*<Box>*/}
                                            <Stack direction="row" spacing={1} justifyContent="center">
                                                <IconButton
                                                    title={'Изменить'}
                                                    onClick={editOnClickHandler}
                                                    aria-label="edit">
                                                    <EditIcon color={'action'}/>
                                                </IconButton>
                                                <IconButton
                                                    title={'В изученные'}
                                                    disabled={word.rating === 3}
                                                    onClick={doneOnClickHandler}
                                                    aria-label="edit">
                                                    <DoneIcon color={word.rating === 3 ? 'disabled' : 'success'}/>
                                                </IconButton>
                                                <IconButton
                                                    title={'Учить заново'}
                                                    disabled={word.rating === 0}
                                                    onClick={resetOnClickHandler}
                                                    aria-label="edit"
                                                >
                                                    <ReplayIcon color={word.rating === 0 ? 'disabled' : 'warning'}/>
                                                </IconButton>
                                                <IconButton
                                                    title={'Удалить'}
                                                    aria-label="delete"
                                                    onClick={deleteOnClickHandler}
                                                >
                                                    <DeleteIcon color={'error'}/>
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <PaginationController
                page={pagesState.currentPage}
                numPages={packagesOfWords.length}
                changePageFunc={changePageFunc}
            />
        </>
    );
}
