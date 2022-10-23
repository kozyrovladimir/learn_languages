import React from 'react';

import { Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Logo from '../../img/L.png';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const navigateToMainPage = (): void => navigate('/');
  const navigateToAddWordPage = (): void => navigate('/learn-words');

  return (
    <Stack direction={'row'} spacing={6} alignItems={'center'}>
      <Box component={'img'} src={Logo} sx={{ width: 100 }}></Box>
      <Stack height={40} direction={'row'} spacing={2}>
        <Button onClick={navigateToMainPage}>Главная</Button>
        <Button onClick={navigateToAddWordPage}>Изучать слова</Button>
      </Stack>
    </Stack>
  );
};

export default Header;
