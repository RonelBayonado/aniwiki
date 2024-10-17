import React from "react";
import YouTube from "react-youtube";

const Detailsmodal = ({ title, image, synopsis, youtubeId, closeModal }) => {
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
  return(
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
  )
}

export default Detailsmodal;