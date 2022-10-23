import React from 'react';

import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { RoutesEnum } from '../../constants/routes';

const NotFound: React.FC = () => {
  return (
    <>
      <Typography fontSize={24} pt={10} align={'center'}>
        Упс... Такой страницы не найдено.{' '}
        <Link to={RoutesEnum.AddWordPage}>На главную</Link>
      </Typography>
    </>
  );
};

export default NotFound;
