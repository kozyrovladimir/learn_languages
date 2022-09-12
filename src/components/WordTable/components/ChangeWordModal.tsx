import React from "react";
import {Button, Modal, Stack, TextField} from "@mui/material";
import {FormikValues} from "formik/dist/types";

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

type ChangeWordModalType = {
    formik: FormikValues,
    open: boolean,
    closeModal: () => void
}

const ChangeWordModal = (props: ChangeWordModalType) => {
    const onClickHandler = () => {
        props.formik.submitForm()
    };

    return (
        <Modal
            open={props.open}
            onClose={props.closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Stack spacing={2} sx={style}>
                <TextField
                    value={props.formik.values.rus}
                    onChange={props.formik.handleChange}
                    error={props.formik.touched.eng && Boolean(props.formik.errors.rus)}
                    helperText={props.formik.touched.rus && props.formik.errors.rus}
                    id="rus"
                    name="rus"
                    label="Rus:"
                    variant="outlined"
                    size={'small'}
                />
                <TextField
                    value={props.formik.values.eng}
                    onChange={props.formik.handleChange}
                    error={props.formik.touched.eng && Boolean(props.formik.errors.eng)}
                    helperText={props.formik.touched.eng && props.formik.errors.eng}
                    id="eng"
                    name="eng"
                    label="Eng:"
                    variant="outlined"
                    size={'small'}
                />
                <Button
                    onClick={onClickHandler}
                    title={'Подсказка'}
                    variant={'outlined'}
                    size={'large'}>
                    Изменить
                </Button>
            </Stack>
        </Modal>
    );
};

export default ChangeWordModal;
