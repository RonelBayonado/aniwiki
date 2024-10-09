import React from 'react';

const DetailsButton = ({ onClick, style }) => {
  return (
    <button className='detailsButton' onClick={onClick} style={style}>
      Details
    </button>
  );
};

export default DetailsButton;