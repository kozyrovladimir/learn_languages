import React from 'react';

import { Box, Button, TextField } from '@mui/material';

import { useAddWordsForm } from '../../hooks/useAddWordsForm';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const AddWordForm = () => {
  const form = useAddWordsForm();

  return (
    <Box>
      <h3>Добавить для изучения:</h3>
      <Box sx={{ paddingBottom: 2 }}>
        <TextField
          value={form.values.rus}
          onChange={form.handleChange}
          error={form.touched.eng && Boolean(form.errors.rus)}
          helperText={form.touched.rus && form.errors.rus}
          id="rus"
          name="rus"
          label="Rus:"
          variant="outlined"
          sx={{ margin: 1 }}
          size={'small'}
        />
        <TextField
          value={form.values.eng}
          onChange={form.handleChange}
          error={form.touched.eng && Boolean(form.errors.eng)}
          helperText={form.touched.eng && form.errors.eng}
          id="eng"
          name="eng"
          label="Eng:"
          variant="outlined"
          sx={{ margin: 1 }}
          size={'small'}
        />
        <Button
          onClick={form.submitForm}
          variant={'outlined'}
          size={'large'}
          sx={{ margin: 1 }}
        >
          Добавить
        </Button>
      </Box>
    </Box>
  );
};

export default AddWordForm;
