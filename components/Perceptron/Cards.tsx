import { useContext, useState, useEffect } from 'react';
import { UpdateContext } from '../Perceptron';
import { TrashIcon, HandThumbUpIcon, HandThumbDownIcon, PencilSquareIcon, CheckIcon } from '@heroicons/react/24/outline'

function Cards() {
  const { movies, selectedMovie, setSelectedMovie, deleteMovie, likeMovie, editMovieTitle, editing, setEditing } = useContext(UpdateContext);
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
  
  useEffect(() => {
    if (editing && !movies.find(movie => movie.title === editing)) {
      setEditing(null);
    }
  }, [movies, editing]);
  
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
    if (editing === title) {
      setEditing(null);
    } else {
      setEditing(title);
      setEditTitle(title);
    }
  };

  const handleEditTitle = (e) => {
    setEditTitle(e.target.value);
  };

  const handleInputBlur = () => {
    editMovieTitle(editing, editTitle);
    setTimeout(() => setEditing(null), 100);
  }

  return (
    
    <div className="z-30 flex flex-col justify-center relative text-sm leading-7">
      <div className="overflow-auto h-64">
      {movies.map(movie => {
        const colorClass = movie.like ? 'bg-blue-100' : 'bg-orange-100';
        const isEditing = editing === movie.title;

        return (
          <div 
            key={movie.title} 
            className={`group hover:pr-16 relative w-56 my-3 h-8 border-2 ${selectedMovie?.title === movie.title ? 'border-gray-400' : 'border-gray-300'} rounded-md text-center cursor-pointer overflow-hidden overflow-ellipsis whitespace-nowrap ${isEditing ? '' : colorClass }`}
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
                <CheckIcon className="w-5 h-8 text-gray-500 bg-white"/>
              ) : movie.like ? (
                <HandThumbUpIcon className="w-5 h-8 text-gray-500"/>
              ) : (
                <HandThumbDownIcon className="w-5 h-8 text-gray-500"/>
              )}
              </div>
              <div className="z-40 transform -translate-y-1/2 opacity-0 group-hover:opacity-100">
                <PencilSquareIcon
                    className="w-5 h-8 ml-1 text-gray-500"
                    onClick={(e) => handleEditClick(e, movie.title)}
                  />
              </div>
              <div className="z-40 transform -translate-y-1/2 opacity-0 group-hover:opacity-100">
                <TrashIcon
                  className="w-5 h-8 ml-1 text-gray-500"
                  onClick={(e) => handleDeleteClick(e, movie.title)}
                />
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>

  );
}

export default Cards;