import React from 'react';
import {Box, Container, Tab, Tabs} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const [value, setValue] = React.useState(0);

    let navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        if(newValue === 0) {
            navigate('/')
        }
        if(newValue === 1) {
            navigate('/learn-words')
        }
    };

    return (
        <Container>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Добавить слова" />
                    <Tab label="Изучать" />
                </Tabs>
            </Box>
        </Container>
    );
};

export default Header;
