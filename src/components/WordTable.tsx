import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {wordsSlice, WordsStateType} from "../store/words-store";
import {useAppDispatch} from "../hooks/redux";
import StarRating from "./StarRating";
import Typography from '@mui/material/Typography';
import {IconButton, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import ReplayIcon from '@mui/icons-material/Replay';

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
                        const wordColor = word.rating === 3 ? '#00d700' : '';
                        const backgroundColorRow = word.rating === 3 ? '#f6fff6' : '';

                        return (
                            <TableRow
                                key={word.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {border: 0},
                                    backgroundColor: backgroundColorRow,
                                    '&:hover': {backgroundColor: 'rgba(255,196,0,0.13)',
                                    transition: 'all 100ms ease-in-out'}
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
                                        <IconButton aria-label="edit">
                                            <EditIcon color={'action'}/>
                                        </IconButton>
                                        <IconButton
                                            disabled={word.rating === 3}
                                            onClick={() => {
                                                dispatch(changeRatingWord({id: word.id, newRating: 3}))
                                            }}
                                            aria-label="edit">
                                            <DoneIcon color={word.rating === 3 ? 'disabled' :'success'}/>
                                        </IconButton>
                                        <IconButton
                                            disabled={word.rating === 0}
                                            onClick={() => {
                                                dispatch(changeRatingWord({id: word.id, newRating: 0}))
                                            }}
                                            aria-label="edit"
                                        >
                                            <ReplayIcon color={word.rating === 0 ? 'disabled' :'warning'}/>
                                        </IconButton>
                                        <IconButton aria-label="delete">
                                            <DeleteIcon color={'error'}/>
                                        </IconButton>
                                    </Stack>
                                    {/*</Box>*/}
                                    {/*<Button*/}
                                    {/*    onClick={() => {*/}
                                    {/*        dispatch(changeRatingWord({id: word.id, newRating: 0}));*/}
                                    {/*    }}*/}
                                    {/*    disabled={word.rating === 0}*/}
                                    {/*    color={"error"}*/}
                                    {/*    sx={{marginBottom: 1}}*/}
                                    {/*    variant={'outlined'}*/}
                                    {/*    size={'small'}*/}
                                    {/*>изучать заново</Button>*/}
                                    {/*<Button*/}
                                    {/*    onClick={() => {*/}
                                    {/*        dispatch(changeRatingWord({id: word.id, newRating: 3}));*/}
                                    {/*    }}*/}
                                    {/*    disabled={word.rating === 3}*/}
                                    {/*    color={"success"}*/}
                                    {/*    variant={'outlined'}*/}
                                    {/*    size={'small'}*/}
                                    {/*>в изученные</Button>*/}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
