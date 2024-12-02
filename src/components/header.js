import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiLogin } from "react-icons/ci";

const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/search/${searchValue}`);
    }
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      navigate('/');
    };
  }

  return (
    <header className="App-header">
        <div className='leftHeader'>
          <h1 onClick={() => navigate('/')}>AniWiki</h1>  
          <input
            type='text'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='Search for Anime'
            className="searchBar"
          />
          <FaSearch className='searchButton' onClick={handleSearch} />
        </div>    
        <nav className='rightHeader'>
          <ul className='navigation'>
            <li onClick={() => navigate('/favorites')}>Favorites</li>
          </ul>     
          {token ? <CgProfile className='profile' onClick={handleLogout}/> : <CiLogin className='profile' onClick={() => navigate('/login')}/>}
        </nav>       
      </header>
  )
}

export default Header;