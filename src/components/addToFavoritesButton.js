import React from 'react';

const AddToFavoritesButton = ({ onClick, style }) => {
  return (
    <button className='addToFavoritesButton' onClick={onClick} style={style}>
      Add To Favorites
    </button>
  );
};

export default AddToFavoritesButton;