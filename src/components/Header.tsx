import React from 'react';
import {Box, Tab, Tabs} from "@mui/material";

const Header = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Добавить слова" />
                    <Tab label="Изучать" />
                </Tabs>
            </Box>
        </Box>
    );
};

export default Header;