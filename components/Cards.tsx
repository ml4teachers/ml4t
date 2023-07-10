import { useContext } from 'react';
import { UpdateContext } from './Perceptron';
import { TrashIcon } from '@heroicons/react/24/outline'

function Cards() {
  const { movies, setSelectedMovie, deleteMovie } = useContext(UpdateContext);

  const handleCardClick = (movie) => {
    setSelectedMovie((prevSelectedMovie) =>
      prevSelectedMovie && prevSelectedMovie.title === movie.title ? null : movie
    );
  };

  const handleDeleteClick = (e, title) => {
    e.stopPropagation();
    deleteMovie(title);
  };

  return (
    <div className="flex flex-col justify-center mt-10 relative text-sm leading-7">
      {movies.map(movie => {
        const colorClass = movie.like ? 'bg-blue-100' : 'bg-orange-100';

        return (
          <div 
            key={movie.title} 
            className={`group relative w-36 my-2 h-8 border-2 border-gray-400 ${colorClass} rounded-md text-center cursor-pointer`}
            onClick={() => handleCardClick(movie)}
          >
            {movie.title}
            <div 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={(e) => handleDeleteClick(e, movie.title)}
            >
              <TrashIcon className="w-6 text-gray-500"/>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cards;
