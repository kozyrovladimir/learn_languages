import React, {useState} from 'react';
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
import {Box, Button, IconButton, Modal, Stack, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import ReplayIcon from '@mui/icons-material/Replay';
import * as yup from "yup";
import {useFormik} from "formik";
import PaginationController from './PaginationController';
import {newPackingItems} from "../utils/utils";

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
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        formik.touched.eng = false;
        formik.touched.rus = false;
    };
    //redux
    const dispatch = useAppDispatch();
    const {changeRatingWord, removeWord, changeWord} = wordsSlice.actions;

    //state for pagination
    const [pagesState, setPagesState] = useState<{currentPage: number}>({currentPage:1});
    const changePageFunc = (page: number) => setPagesState({currentPage: page});

    //packing videos
    const packagesOfWords = newPackingItems(props.words, 10);

    //using formik
    const validationSchema = yup.object({
        rus: yup.string()
            .max(20, 'Максимум 20 символов!')
            .required('Поле обязательно!')
            .trim(),
        eng: yup.string()
            .max(20, 'Максимум 20 символов!')
            .required('Поле обязательно!')
            .trim(),
    });

    const formik = useFormik({
        initialValues: {
            rus: '',
            eng: '',
            id: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(changeWord({newWorEng: values.eng, newWorRus: values.rus, id: values.id}));
            values.rus = '';
            values.eng = '';
            values.id = '';
            formik.touched.eng = false;
            formik.touched.rus = false;
            handleClose();
        },
    })

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Stack spacing={2} sx={style}>
                    <TextField
                        value={formik.values.rus}
                        onChange={formik.handleChange}
                        error={formik.touched.eng && Boolean(formik.errors.rus)}
                        helperText={formik.touched.rus && formik.errors.rus}
                        id="rus"
                        name="rus"
                        label="Rus:"
                        variant="outlined"
                        // sx={{marginRight: 2}}
                        size={'small'}
                    />
                    <TextField
                        value={formik.values.eng}
                        onChange={formik.handleChange}
                        error={formik.touched.eng && Boolean(formik.errors.eng)}
                        helperText={formik.touched.eng && formik.errors.eng}
                        id="eng"
                        name="eng"
                        label="Eng:"
                        variant="outlined"
                        // sx={{marginRight: 2}}
                        size={'small'}
                    />
                    <Button
                        onClick={formik.submitForm}
                        title={'Подсказка'}
                        variant={'outlined'}
                        size={'large'}>
                        Изменить
                    </Button>
                </Stack>
            </Modal>
            <Box sx={{paddingTop:2, paddingBottom: 2, backdropFilter: 'blur(20px)'}}>
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
                                    handleOpen();
                                    formik.values.eng = word.eng;
                                    formik.values.rus = word.rus;
                                    formik.values.id = word.id;
                                };
                                const doneOnClickHandler = () => dispatch(changeRatingWord({id: word.id, newRating: 3}));
                                const resetOnClickHandler = () =>  dispatch(changeRatingWord({id: word.id, newRating: 0}));
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
