import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {wordsSlice, WordsStateType} from "../store/words-store";
import Button from '@mui/material/Button';
import {useAppDispatch} from "../hooks/redux";
import StarRating from "./StarRating";

type WordTablePropsType = {
    words: WordsStateType
}

export default function WordTable(props: WordTablePropsType) {
    //redux
    const dispatch = useAppDispatch();
    const {changeRatingWord} = wordsSlice.actions;

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Rus:</TableCell>
                        <TableCell>Eng:</TableCell>
                        <TableCell>Прогресс изучения:</TableCell>
                        <TableCell>Дата добавления:</TableCell>
                        <TableCell>Действия:</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.words.map((word) => {
                        const date = new Date(word.date);

                        return (
                            <TableRow
                            key={word.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {word.rus}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {word.eng}
                            </TableCell>
                            <TableCell>
                                <StarRating starAmount={word.rating}/>
                            </TableCell>
                            <TableCell>{date.toLocaleDateString()} {date.toLocaleTimeString()}</TableCell>
                            <TableCell sx={{display: 'flex', flexDirection: 'column'}}>
                                <Button
                                    onClick={() => {
                                        dispatch(changeRatingWord({id: word.id, newRating: 0}));
                                    }}
                                    disabled={word.rating === 0}
                                    color={"error"}
                                    sx={{marginBottom: 1}}
                                    variant={'outlined'}
                                    size={'small'}
                                >изучать заново</Button>
                                <Button
                                    onClick={() => {
                                        dispatch(changeRatingWord({id: word.id, newRating: 3}));
                                    }}
                                    disabled={word.rating === 3}
                                    color={"success"}
                                    variant={'outlined'}
                                    size={'small'}
                                >в изученные</Button>
                            </TableCell>
                        </TableRow>
                    )})}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
