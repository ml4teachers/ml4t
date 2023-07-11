import { useContext, useState } from 'react';
import { UpdateContext } from './Perceptron';
import { TrashIcon, HandThumbUpIcon, HandThumbDownIcon, PencilSquareIcon, CheckIcon } from '@heroicons/react/24/outline'

function Cards() {
  const { movies, selectedMovie, setSelectedMovie, deleteMovie, likeMovie, editMovieTitle } = useContext(UpdateContext);
  const [editing, setEditing] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleCardClick = (movie) => {
    if (editing !== null) return;
    setSelectedMovie((prevSelectedMovie) =>
      prevSelectedMovie && prevSelectedMovie.title === movie.title ? null : movie
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      editMovieTitle(editing, editTitle);
      setEditing(null);
    }
  }
  
  const handleDeleteClick = (e, title) => {
    e.stopPropagation();
    deleteMovie(title);
  };

  const handleLikeClick = (e, title) => {
    e.stopPropagation();
    likeMovie(title);
    setSelectedMovie(null);
  }

  const handleEditClick = (e, title) => {
    e.stopPropagation();
    setEditing(title);
    setEditTitle(title);
    setSelectedMovie(null);
  }

  const handleInputChange = (e) => {
    setEditTitle(e.target.value);
    setSelectedMovie(null);
  }

  const handleEditTitle = (e) => {
    setEditTitle(e.target.value);
  };

  const handleInputBlur = () => {
    editMovieTitle(editing, editTitle);
    setEditing(null);
  }

  return (
    <div className="z-30 flex flex-col justify-center mt-10 relative text-sm leading-7">
      {movies.map(movie => {
        const colorClass = movie.like ? 'bg-blue-100' : 'bg-orange-100';
        const isEditing = editing === movie.title;

        return (
          <div 
            key={movie.title} 
            className={`group hover:pr-12 relative w-48 my-2 h-8 border-2 ${selectedMovie?.title === movie.title ? 'border-gray-400' : 'border-gray-300'} rounded-md text-center cursor-pointer overflow-hidden overflow-ellipsis whitespace-nowrap ${isEditing ? '' : colorClass }`}
            onClick={() => handleCardClick(movie)}
          >
            {isEditing ? (
              <input
                type="text"
                defaultValue={movie.title}
                onChange={handleEditTitle}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyPress}
                autoFocus
                className="w-full outline-none px-2"
                />
            ) : (
              <div className="px-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                {movie.title}
              </div>
            )}
            <div className="absolute right-0 top-1/2 flex">
              <div 
                className="transform -translate-y-1/2 opacity-0 group-hover:opacity-100"
                onClick={(e) => isEditing ? null : handleLikeClick(e, movie.title)}
                >
                {isEditing ? (
                <CheckIcon className="w-6 h-8 text-gray-500 bg-white"/>
              ) : movie.like ? (
                <HandThumbUpIcon className="w-6 text-gray-500"/>
              ) : (
                <HandThumbDownIcon className="w-6 text-gray-500"/>
              )}
              </div>
              <div 
                className="transform -translate-y-1/2 opacity-0 group-hover:opacity-100"
                onClick={editing === movie.title ? (e) => handleDeleteClick(e, movie.title) : (e) => handleEditClick(e, movie.title)}
              >
                {editing === movie.title ? (
                  <TrashIcon className="w-6 text-gray-500 py-1"/>
                ) : (
                  <PencilSquareIcon className="w-6 text-gray-500"/>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cards;
