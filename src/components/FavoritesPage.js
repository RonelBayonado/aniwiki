import React, { useEffect, useState } from "react";
import Header from "./header";
import axios from "axios";
import DetailsButton from "./detailsbutton";
import Detailsmodal from "./Detailsmodal";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [youtubeId, setYoutubeId] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      axios.get(`http://localhost:5000/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setFavorites(response.data);
      })
      .catch(error => {
        console.log('There was an error fetching favorites', error);
      })
    }     
  }, [token])

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
  return(
    <div className="App">
      <Header />
      <div className='favoritesPage'>
        <ul>
          {favorites.map((anime) => (
            <li key={anime.animeId}>              
              <img src={anime.image_url} alt={anime.title} />
              <h2>{anime.title}</h2>
              <DetailsButton onClick={() => details(anime.synopsis, anime.title, anime.image_url, anime.youtube_id)} style={{fontSize: '13px', marginTop: '10px'}}  />
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
  )
}

export default FavoritesPage;