import './App.css';
import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import  SearchResults  from './components/SearchResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/search/:query' element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
