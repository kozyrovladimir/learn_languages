import React from 'react';
import {Box, Button, TextField} from "@mui/material";

type AddWordFormType = {
    rus: string,
    eng: string,
    errMessRus: string,
    errMessEng: string,
    rusInputOnChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    engInputOnChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSubmit: () => void
}

const AddWordForm = (props: AddWordFormType) => {
    return (
        <Box>
            <h3>Добавить новое слово для изучения:</h3>
            <Box sx={{paddingBottom: 2}}>
                <TextField
                    value={props.rus}
                    onChange={props.rusInputOnChangeHandler}
                    error={!!props.errMessRus}
                    helperText={props.errMessRus}
                    id="outlined-basic"
                    label="Слово на русском:"
                    variant="outlined"
                    sx={{marginRight: 2}}/>
                <TextField
                    value={props.eng}
                    onChange={props.engInputOnChangeHandler}
                    error={!!props.errMessEng}
                    helperText={props.errMessEng}
                    id="outlined-basic"
                    label="Слово на английском:"
                    variant="outlined"
                    sx={{marginRight: 2}}/>
                <Button
                    onClick={props.onSubmit}
                    variant={'outlined'}
                    size={'large'}>
                    Добавить
                </Button>
            </Box>
        </Box>
    );
};

export default AddWordForm;
