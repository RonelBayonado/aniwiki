import './App.css';
import { React, useState, useEffect } from "react";
import AddToFavoritesButton from './components/addToFavoritesButton'
import DetailsButton from './components/detailsbutton';
import YouTube from "react-youtube";
import { fetchTopAnime, searchAnime } from './api/animeApi';
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiLogin } from "react-icons/ci";

function App() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [videoOpen, setVideoOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [youtubeId, setYoutubeId] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const getAnimeData = async () => {
      try {
        const data = await fetchTopAnime();
        setAnime(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    getAnimeData();
  },[])
/*
  useEffect(() => {
    const getSearchData = async () => {
      try {
        const data = await searchAnime();
        setAnime(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    getSearchData();
  },[])
*/
  const details = (synopsis, title, image, youtubeId) => {
    setDetailsOpen(true);
    setTitle(title);
    setImage(image)
    setSynopsis(synopsis);
    setYoutubeId(youtubeId);
  }
  const closeModal = () => {
    setVideoOpen(false);
    setDetailsOpen(false);
  }
  const options = {
    height: '720',
    width: '1280',
    playerVars: {
      autoplay: 1,
      controls: 1,
    },
  };
  const _onReady = (event) => {
    event.target.pauseVideo();
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className='leftHeader'>
          <h1>AnimeWiki</h1>  
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
          <FaSearch className='searchButton' onClick={() => searchAnime(searchValue)} />
        </div>    
        <nav className='rightHeader'>
          <ul className='navigation'>
            <li>All Animes</li>
            <li>Favorites</li>
          </ul>     
          {loggedIn ? <CgProfile className='profile'/> : <CiLogin className='profile'/>}
        </nav>
        
      </header>
      <div className="banner">
        <div className='left'>
          <h1>
            {loading === false ? anime[0].title : 'Loading...'}
          </h1>
          <p>{loading === false ? anime[0].synopsis : 'Loading...'}</p>
          <DetailsButton onClick={() => details(anime[0].synopsis, anime[0].title, anime[0].images.jpg.image_url, anime[0].trailer.youtube_id)}   />
          <AddToFavoritesButton />
        </div>
        <div className='right'>
          <img className='bannerImage' src={loading === false ? anime[0].images.jpg.large_image_url : 'Loading...'} alt="banner" />
        </div>
      </div>
      <div className='popularAnimes'>
          <h1>Top Animes:</h1>
          <ul>
            {anime.map((anime) => (
              <li key={anime.mal_id}>              
                <img src={anime.images.jpg.image_url} alt={anime.title} />
                <h2>{anime.title}</h2>
                <DetailsButton onClick={() => details(anime.synopsis, anime.title, anime.images.jpg.image_url, anime.trailer.youtube_id)} style={{fontSize: '13px', marginTop: '10px'}}  />
                <AddToFavoritesButton style={{fontSize: '13px', marginTop: '10px'}} />
              </li>
            ))}
          </ul>
      </div>
      {detailsOpen && (
        <>
          <div class="modal-overlay"></div>
          <div className='detailsModal'>
            <h1>{title}</h1>
            <div className='imageSynopsisContainer'>
              <img src={image} alt={title} />
              <p>{synopsis}</p>
            </div>
            <YouTube videoId={youtubeId} options={options} onReady={_onReady} id="video"/>
            <button className='detailsButton' onClick={closeModal}>Exit</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
