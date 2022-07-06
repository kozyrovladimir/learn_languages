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
import {Box, IconButton, Modal, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import ReplayIcon from '@mui/icons-material/Replay';

type WordTablePropsType = {
    words: WordsStateType
}

//temporary styles from example from mui docs
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid lightgray',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

export default function WordTable(props: WordTablePropsType) {
    //state and handlers for modal window
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //redux
    const dispatch = useAppDispatch();
    const {changeRatingWord, removeWord} = wordsSlice.actions;

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
            <Box sx={{paddingTop: 2, paddingBottom: 2}}>
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
                                                    onClick={handleOpen}
                                                    aria-label="edit">
                                                    <EditIcon color={'action'}/>
                                                </IconButton>
                                                <IconButton
                                                    disabled={word.rating === 3}
                                                    onClick={() => {
                                                        dispatch(changeRatingWord({id: word.id, newRating: 3}))
                                                    }}
                                                    aria-label="edit">
                                                    <DoneIcon color={word.rating === 3 ? 'disabled' : 'success'}/>
                                                </IconButton>
                                                <IconButton
                                                    disabled={word.rating === 0}
                                                    onClick={() => {
                                                        dispatch(changeRatingWord({id: word.id, newRating: 0}))
                                                    }}
                                                    aria-label="edit"
                                                >
                                                    <ReplayIcon color={word.rating === 0 ? 'disabled' : 'warning'}/>
                                                </IconButton>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() => {
                                                        dispatch(removeWord({id: word.id}))
                                                    }}
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
        </>
    );
}
