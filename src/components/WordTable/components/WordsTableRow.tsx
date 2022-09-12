import React from 'react';
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import StarRating from "./StarRating";
import {IconButton, Stack} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteIcon from "@mui/icons-material/Delete";
import {wordsSlice, WordType} from "../../../store/reducers/words-store";
import {FormikValues} from "formik/dist/types";
import {useAppDispatch} from "../../../hooks/redux";
import TableRow from '@mui/material/TableRow';

type TableRowTypes = {
    openModal: () => void,
    word: WordType,
    formik: FormikValues,
}

const WordsTableRow = (props: TableRowTypes) => {
    const date = new Date(props.word.date);
    const wordColor = props.word.rating === 3 ? '#00d700' : '';
    const backgroundColorRow = props.word.rating === 3 ? '#f6fff6' : '';

    const dispatch = useAppDispatch();
    const {changeRatingWord, removeWord} = wordsSlice.actions;

    //onclick handlers
    const editOnClickHandler = () => {
        props.openModal();
        props.formik.values.eng = props.word.eng;
        props.formik.values.rus = props.word.rus;
        props.formik.values.id = props.word.id;
    };
    const doneOnClickHandler = () => dispatch(changeRatingWord({
        id: props.word.id,
        newRating: 3
    }));
    const resetOnClickHandler = () => dispatch(changeRatingWord({
        id: props.word.id,
        newRating: 0
    }));
    const deleteOnClickHandler = () => dispatch(removeWord({id: props.word.id}));

    return (
        <TableRow
            key={props.word.id}
            sx={{
                '&:last-child td, &:last-child th': {border: 0},
                backgroundColor: backgroundColorRow,
                '&:hover': {
                    backgroundColor: 'rgba(255,196,0,0.13)',
                    transition: 'all 100ms ease-in-out'
                },
            }}>
            <TableCell component="th" scope="row">
                <Typography sx={{color: wordColor}}>
                    {props.word.rus}
                </Typography>
            </TableCell>
            <TableCell component="th" scope="row">
                <Typography sx={{color: wordColor}}>
                    {props.word.eng}
                </Typography>
            </TableCell>
            <TableCell>
                <StarRating starAmount={props.word.rating}/>
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
                        disabled={props.word.rating === 3}
                        onClick={doneOnClickHandler}
                        aria-label="edit">
                        <DoneIcon color={props.word.rating === 3 ? 'disabled' : 'success'}/>
                    </IconButton>
                    <IconButton
                        title={'Учить заново'}
                        disabled={props.word.rating === 0}
                        onClick={resetOnClickHandler}
                        aria-label="edit"
                    >
                        <ReplayIcon color={props.word.rating === 0 ? 'disabled' : 'warning'}/>
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
    );
};

export default WordsTableRow;
