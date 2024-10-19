import React from 'react';
import { IMG_CDN } from '../utils/constants';

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <>
      <div className="md:w-48 w-40 pr-4">
        <img
          className="object-cover cursor-pointer rounded-lg min-h-full transform hover:scale-110 transition duration-300 ease-in-out"
          src={IMG_CDN + posterPath}
          alt="Movie Card"
        />
      </div>
    </>
  );
};

export default MovieCard;
