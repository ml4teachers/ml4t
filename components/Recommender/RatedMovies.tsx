import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const RatedMovies = ({ likedMoviesIDs, dislikedMoviesIDs, setLikedMoviesIDs, setDislikedMoviesIDs }) => {
    const [likedMovies, setLikedMovies] = useState([]);
    const [dislikedMovies, setDislikedMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async (ids) => {
            const { data } = await supabase.from('movies').select('*').in('id', ids);
            return data;
        };

        fetchMovies(likedMoviesIDs).then(data => setLikedMovies(data));
        fetchMovies(dislikedMoviesIDs).then(data => setDislikedMovies(data));
    }, [likedMoviesIDs, dislikedMoviesIDs]);

    const removeMovieFromList = (movieId, listSetter) => {
        listSetter(prev => prev.filter(id => id !== movieId));
    }

    return (
      <div className="overflow-auto">
        <h2 className="text-xl font-bold mt-4">Like ({likedMovies.length})</h2>
        <div className="overflow-auto max-h-80">
            {likedMovies.map(movie => (
            <div key={movie.id} className="flex items-center py-2 my-2 rounded-md border">
                <img src={movie.poster} alt={movie.title} className="w-8 h-12 mx-2 rounded-sm" />
                <span>{movie.title} ({new Date(movie.release).getFullYear()})</span>
                <button 
                className="border rounded-md ml-auto mr-4"
                onClick={() => removeMovieFromList(movie.id, setLikedMoviesIDs)}>
                  <div className="right-0 p-2 text-gray-500 bg-red-100 hover:bg-red-200 hover:text-gray-600" >Löschen</div>
                </button>
            </div>
            ))}
        </div>

        <h2 className="text-xl font-bold mt-4">Dislike ({dislikedMovies.length})</h2>
        <div className="overflow-auto max-h-80">
        {dislikedMovies.map(movie => (
          <div key={movie.id} className="flex items-center py-2 my-2 rounded-md border">
            <img src={movie.poster} alt={movie.title} className="w-8 h-12 mr-4 rounded-sm" />
            <span>{movie.title} ({new Date(movie.release).getFullYear()})</span>
            <button
            className="border rounded-md ml-auto mr-4"
            onClick={() => removeMovieFromList(movie.id, setDislikedMoviesIDs)}>
                <div className="right-0 p-2 text-gray-500 bg-red-100 hover:bg-red-200 hover:text-gray-600" >Löschen</div>
            </button>
          </div>
        ))}
        </div>
      </div>
    );
};

export default RatedMovies;
