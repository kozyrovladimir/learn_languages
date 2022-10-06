import React from 'react';

import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';

type VideoPaginationRouterPropsType = {
  numPages: number;
  page: number;
  changePageFunc: (page: number) => void;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function _VideoPaginationRouter(props: VideoPaginationRouterPropsType) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeTileView = (event: React.ChangeEvent<unknown>, value: number) => {
    props.changePageFunc(value);
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', pt: 2, pb: 2 }}>
      <Pagination
        count={props.numPages}
        page={props.page}
        onChange={handleChangeTileView}
      />
    </Container>
  );
}
