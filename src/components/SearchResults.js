import { React, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { searchAnime } from '../api/animeApi';
import  DetailsButton  from '../components/detailsbutton';
import  AddToFavoritesButton  from '../components/addToFavoritesButton'; 
import YouTube from "react-youtube";

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [youtubeId, setYoutubeId] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const search = async () => {
      try {
        const results = await searchAnime(query);
        setSearchResults(results);
        setLoading(false);
      }
      catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    search();
  }, [query])

  if(error) return <p>Error: {error}</p>

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
      <div className='popularAnimes'>
        {loading === false ? <h1>Search Results of {query}</h1> : <h1>Loading...</h1>}
        <ul>
          {searchResults.map((anime) => (
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
  )
}

export default SearchResults;