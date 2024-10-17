import './App.css';
import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import  SearchResults  from './components/SearchResults';
import FavoritesPage from './components/FavoritesPage';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/search/:query' element={<SearchResults />} />
        <Route path='/favorites' element={<FavoritesPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
