import React from 'react';
import './App.css';
import Header from "./components/Header";
import AddWordsPage from "./components/AddWordsPage";
import LearnWordPage from "./components/LearnWordpage";
import {Routes, Route} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path='/' element={<AddWordsPage/>}/>
                <Route path='/learn-words' element={<LearnWordPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
