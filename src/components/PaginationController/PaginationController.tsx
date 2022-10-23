import React from 'react';

import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';

type VideoPaginationRouterPropsType = {
  numPages: number;
  page: number;
  changePageFunc: (page: number) => void;
};

const VideoPaginationRouter: React.FC<VideoPaginationRouterPropsType> = ({
  numPages,
  page,
  changePageFunc,
}) => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeTileView = (event: React.ChangeEvent<unknown>, value: number) => {
    changePageFunc(value);
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', pt: 2, pb: 2 }}>
      <Pagination count={numPages} page={page} onChange={handleChangeTileView} />
    </Container>
  );
};

export default VideoPaginationRouter;
