import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizPage from './componets/QuizPage';
import ResultPage from './componets/ResultPage';
import Spechtotext from './componets/Spech_to_Text'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/spech" element={<Spechtotext/>} />
      </Routes>
    </Router>
  );
}

export default App;
