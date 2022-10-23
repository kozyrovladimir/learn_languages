import React from 'react';

import { Button, Modal, Stack, TextField } from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import { FormikValues } from 'formik/dist/types';

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
  formik: FormikValues;
  open: boolean;
  closeModal: () => void;
};

const ChangeWordModal: React.FC<ChangeWordModalType> = ({ formik, open, closeModal }) => {
  const onClickHandler = (): void => {
    formik.submitForm();
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
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
          size={'small'}
        />
        <Button
          onClick={onClickHandler}
          title={'Подсказка'}
          variant={'outlined'}
          size={'large'}
        >
          Изменить
        </Button>
      </Stack>
    </Modal>
  );
};

export default ChangeWordModal;
