import React from 'react';

import './App.css';
import { Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { RoutesEnum } from './constants/routes';
import AddWordsPage from './pages/AddWordPage/AddWordsPage';
import LearnWordPage from './pages/LearnWordPage/LearnWordpage';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const App = () => {
  return (
    <div className="App">
      <Container sx={appContainerStyle}>
        <Header />
        <Routes>
          <Route path={RoutesEnum.AddWordPage} element={<AddWordsPage />} />
          <Route path={RoutesEnum.LearnWordPage} element={<LearnWordPage />} />
        </Routes>
        <Footer />
      </Container>
    </div>
  );
};

const appContainerStyle = { minHeight: '100vh', position: 'relative' };

export default App;
