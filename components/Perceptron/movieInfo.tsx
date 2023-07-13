import { useContext, useEffect, useState } from 'react';
import { UpdateContext } from '../Perceptron';
import { XCircleIcon } from '@heroicons/react/24/outline';

function MovieInfo({ movie, closeMovieInfo }) {
  const { openMovieInfo, changeMovieCategory, classes } = useContext(UpdateContext);
  const [movieCategories, setMovieCategories] = useState(new Array(classes).fill(false));

  useEffect(() => {
    if (movie) {
      const newMovieCategories = new Array(classes).fill(false);
      for (let i = 0; i < classes; i++) {
        newMovieCategories[i] = Boolean(movie['cat' + (i + 1)]);
      }
      setMovieCategories(newMovieCategories);
    }
  }, [movie, classes]);

  if (!movie) return null;

  const colorClass = movie.like ? 'bg-blue-100' : 'bg-orange-100';

  return (
    <div onClick={closeMovieInfo} className="fixed z-50 inset-0 px-24 flex items-center justify-center bg-black bg-opacity-40">
      <div onClick={(e) => e.stopPropagation()} className={`p-4 border-2 border-gray-400 rounded-lg shadow-lg ${colorClass}`}>
        <div className="flex">
            <h2 className="text-2xl mb-2 flex-1">{movie.title}</h2>
            <XCircleIcon className="w-6 h-6 text-gray-500 cursor-pointer flex-2" onClick={closeMovieInfo}/>
        </div>
        <div className="mb-4 text-gray-500 text-sm">{`(`}{movie.genres.join(', ')}{`)`}</div>

        <div className="flex justify-center">
            <div className="flex-1 text-sm mr-4">
                {movie.summary}
            </div>
            <img src={movie.poster} alt={movie.title} className="w-32 h-48 rounded-md border border-gray-500" />
        </div>
        <div className={`mt-4 flex ${colorClass}`}>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;