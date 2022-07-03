import React from 'react';
import './App.css';
import Header from "./components/Header";
import AddWordsPage from "./components/AddWordsPage";
import LearnWordPage from "./components/LearnWordpage";

function App() {
    return (
        <div className="App">
            <Header/>
            <AddWordsPage/>
            <LearnWordPage/>
        </div>
    );
}

export default App;
