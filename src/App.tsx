import React from 'react';
import './App.css';
import Header from "./components/Header";
import AddWordsPage from "./components/AddWordsPage";

function App() {
    return (
        <div className="App">
            <Header/>
            <h1 style={{textAlign: 'center'}}>Learn Language</h1>
            <AddWordsPage/>
        </div>
    );
}

export default App;
