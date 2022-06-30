import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {WordsStateType} from "../store/words-store";
import Button from '@mui/material/Button';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

type WordTablePropsType = {
    words: WordsStateType
}

export default function WordTable(props: WordTablePropsType) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Слово на русском:</TableCell>
                        <TableCell>Слово на английском:</TableCell>
                        <TableCell>Прогресс изучения:</TableCell>
                        <TableCell>Дата добавления:</TableCell>
                        <TableCell>Действия:</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.words.map((word) => (
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
                            <TableCell>{word.rating}</TableCell>
                            <TableCell>{word.date.toLocaleDateString()} {word.date.toLocaleTimeString()}</TableCell>
                            <TableCell sx={{display: 'flex', flexDirection: 'column'}}>
                                <Button
                                    color={"error"}
                                    sx={{marginBottom: 1}}
                                    variant={'outlined'}
                                    size={'small'}
                                >изучать заново</Button>
                                <Button
                                    color={"success"}
                                    variant={'outlined'}
                                    size={'small'}
                                >в изученные</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}