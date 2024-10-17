import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiLogin } from "react-icons/ci";

const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/search/${searchValue}`);
    }
  }

  return (
    <header className="App-header">
        <div className='leftHeader'>
          <h1 onClick={() => navigate('/')}>AnimeWiki</h1>  
          <input
            type='text'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='Search for Anime'
            style={{
              fontSize: '16px',
              padding: '10px',
              borderRadius: '8px'
            }}
          />
          <FaSearch className='searchButton' onClick={handleSearch} />
        </div>    
        <nav className='rightHeader'>
          <ul className='navigation'>
            <li onClick={() => navigate('/favorites')}>Favorites</li>
          </ul>     
          {loggedIn ? <CgProfile className='profile'/> : <CiLogin className='profile' onClick={() => navigate('/login')}/>}
        </nav>       
      </header>
  )
}

export default Header;