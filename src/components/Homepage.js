import { React, useState, useEffect } from "react";
import axios from 'axios';
import AddToFavoritesButton from './addToFavoritesButton'
import DetailsButton from './detailsbutton';
import { fetchTopAnime } from './../api/animeApi';
import Detailsmodal from "./Detailsmodal";
import Header from "./header";

const Homepage = () => {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [youtubeId, setYoutubeId] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
 
  const token = localStorage.getItem('token');

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

  const details = (synopsis, title, image, youtubeId) => {
    setDetailsOpen(true);
    setTitle(title);
    setImage(image)
    setSynopsis(synopsis);
    setYoutubeId(youtubeId);
  }
  const closeModal = () => {
    setDetailsOpen(false);
  }
  const addFavorite = (animeId, synopsis, title, image_url, youtube_id) => {
    axios.post('http://localhost:5000/favorites', { animeId, synopsis, title, image_url, youtube_id }, {
      headers: {
        Authorization: `Bearer ${token}`, // Assuming you've saved the token after login
      }  
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log('There was an error trying to add to favorites', error);
    })
  }
 
  return (
    <div className="App">
      <Header />
      <div className="banner">
        <div className='left'>
          <h1>
            {loading === false ? anime[0].title : 'Loading...'}
          </h1>
          <p>{loading === false ? anime[0].synopsis : 'Loading...'}</p>
          <DetailsButton onClick={() => details(anime[0].synopsis, anime[0].title, anime[0].images.jpg.image_url, anime[0].trailer.youtube_id)} />
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
                <AddToFavoritesButton onClick={() => addFavorite(anime.mal_id, anime.synopsis, anime.title, anime.images.jpg.image_url, anime.trailer.youtube_id)} style={{fontSize: '13px', marginTop: '10px'}}/>
              </li>
            ))}
          </ul>
      </div>
      {detailsOpen && (
          <Detailsmodal 
            title={title} 
            image={image} 
            synopsis={synopsis} 
            youtubeId={youtubeId} 
            closeModal={closeModal}
          />
      )}
    </div>
  );
}

export default Homepage;