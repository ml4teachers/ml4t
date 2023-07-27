import { useContext, useState, useEffect } from 'react';
import { UpdateContext } from '../Perceptron';
import { NoSymbolIcon, TrashIcon, HandThumbUpIcon, HandThumbDownIcon, PencilSquareIcon, CheckIcon } from '@heroicons/react/24/outline'

function Cards({ showEdit, showLike }) {
  const { movies, selectedMovie, setSelectedMovie, deleteMovie, likeMovie, rateMovie, editMovieTitle, editing, setEditing } = useContext(UpdateContext);
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

  const handleRatedClick = (e, title) => {
    e.stopPropagation();
    rateMovie(title);
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
      <div className="overflow-auto h-52 mb-[68px]">
      {movies.map(movie => {
        const colorClass = !movie.rated ? 'bg-gray-100' : movie.like ? 'bg-blue-100' : 'bg-orange-100';
        const borderColor = !movie.rated ? 'border-gray-400' : movie.like ? 'border-blue-300' : 'border-orange-300';
        const isEditing = editing === movie.title;

        return (
          <div
            key={movie.title}
            title="Film auswählen"
            className={`${isEditing ? 'hover:pr-11' : 'hover:pr-16'} group relative w-56 my-3 h-8 border-2 ${selectedMovie?.title === movie.title ? borderColor : 'border-gray-300'} rounded-md text-center cursor-pointer overflow-hidden overflow-ellipsis whitespace-nowrap ${isEditing ? '' : colorClass }`}
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
              {showLike ? (  
                <div 
                  className="transform -translate-y-1/2 opacity-0 group-hover:opacity-100"
                  onClick={(e) => isEditing ? null : handleLikeClick(e, movie.title)}
                  >
                  {isEditing ? (
                    <CheckIcon title="Bearbeitung beenden" className="w-5 h-8 text-gray-500 bg-white"/>
                  ) : (movie.like || !movie.rated) ? (
                    <HandThumbUpIcon title="Like" className="w-5 h-8 text-gray-500"/>
                  ) : (
                    <HandThumbDownIcon title="Dislike" className="w-5 h-8 text-gray-500"/>
                  )}
                </div>
              ) : null}
              {showEdit && !movie.rated ? (
                <div className="z-40 transform -translate-y-1/2 opacity-0 group-hover:opacity-100">
                  {!isEditing ? (
                  <PencilSquareIcon
                      title="Filmtitel bearbeiten"
                      className="w-5 h-8 ml-1 text-gray-500"
                      onClick={(e) => handleEditClick(e, movie.title)}
                    />
                    ) : null}
                </div>
              ) : null}
              {movie.rated ? (
                <div className="z-40 transform -translate-y-1/2 opacity-0 group-hover:opacity-100">
                  <NoSymbolIcon
                      title="Bewertung zurücksetzen"
                      className="w-5 h-8 ml-1 text-gray-500"
                      onClick={(e) => handleRatedClick(e, movie.title)}
                    />
                </div>
              ) : null}
              <div className="z-40 transform -translate-y-1/2 opacity-0 group-hover:opacity-100">
                <TrashIcon
                  title="Film löschen"
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