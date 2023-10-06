import { XCircleIcon } from '@heroicons/react/24/outline';

function MovieInfo({ movie, closeMovieInfo }) {

  if (!movie) return null;

  return (
    <div onClick={closeMovieInfo} className="fixed z-50 inset-0 px-24 flex items-center justify-center bg-opacity-25">
      <div onClick={(e) => e.stopPropagation()} className={`p-4 border-2 border-gray-400 lg:w-2/3 rounded-lg bg-white`}>
        <div className="flex">
            <h2 className="text-2xl mb-2 flex-1">{movie.title}{` (`}{movie.release.slice(0, -6)}{`)`}</h2>
            <XCircleIcon title="Filminformationen schliessen" className="w-6 h-6 text-gray-500 cursor-pointer flex-2" onClick={closeMovieInfo}/>
        </div>
        <div className="mb-4 text-gray-500 text-sm">{`(`}{movie.genres.join(', ')}{`)`}</div>

        <div className="flex justify-center">
            <div className="flex-1 text-sm mr-4">
              <div>
                {movie.summary.slice(1, -1)}
              </div>
              <div className="mt-4">
                (Filmdaten von <a className="underline hover:font-semibold" href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" rel="noopener noreferrer">themoviedb.org</a>)
              </div>
            </div>
            <img src={movie.poster} alt={movie.title} className="w-32 h-48 rounded-md border border-gray-500" />
        </div>
        <div className={`mt-4 flex bg-white`}>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
