import React from 'react';
import {Container, Stack, IconButton, Typography} from "@mui/material";
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <Container sx={{padding: 2}}>
            <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                <IconButton href={'https://t.me/v_p_g_j'}>
                    <TelegramIcon/>
                </IconButton>
                <IconButton href={'https://www.linkedin.com/in/vladimir-kozyro-18b276183/'}>
                    <LinkedinIcon/>
                </IconButton>
                <IconButton href={'https://www.instagram.com/web_dev_grodno/'}>
                    <InstagramIcon/>
                </IconButton>
            </Stack>
            <Typography align={'center'}>
                2022 &#169;
            </Typography>
        </Container>
    );
};

export default Footer;
