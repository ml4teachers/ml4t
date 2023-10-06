// components/RecommenderGrid.tsx
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import MovieInfo from './movieInfo';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie';


const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const RecommenderGrid = ({ searchedMovies, likedMovies, dislikedMovies, setLikedMovies, setDislikedMovies }) => {
  const [movieData, setMovieData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (searchedMovies.length === 0) {
        const { data, error } = await supabase.from('random_movies').select('*').limit(20);
        if (error) {
          console.error("Error fetching movies:", error);
        } else {
          setMovieData(data);
        }
      } else {
        setMovieData(searchedMovies);
      }
    };

    fetchMovies();
  }, [searchedMovies]);

  const fetchRandomMovie = async () => {
    const { data, error } = await supabase.from('random_movies').select('*').limit(1);
    if (error) {
      console.error("Error fetching a random movie:", error);
    } else {
      return data[0];
    }
  };

  const handleLikeDislike = async(movie, isLike) => {
    if (isLike) {
        if (likedMovies.includes(movie.id)) {
            setLikedMovies(prev => {
                const updated = prev.filter(id => id !== movie.id);
                Cookies.set('likedMovies', JSON.stringify(updated));
                return updated;
            });
        } else {
            setLikedMovies(prev => {
                const updated = [...prev, movie.id];
                Cookies.set('likedMovies', JSON.stringify(updated));
                return updated;
            });
            setDislikedMovies(prev => {
                const updated = prev.filter(id => id !== movie.id);
                Cookies.set('dislikedMovies', JSON.stringify(updated));
                return updated;
            });
        }
    } else {
        if (dislikedMovies.includes(movie.id)) {
            setDislikedMovies(prev => {
                const updated = prev.filter(id => id !== movie.id);
                Cookies.set('dislikedMovies', JSON.stringify(updated));
                return updated;
            });
        } else {
            setDislikedMovies(prev => {
                const updated = [...prev, movie.id];
                Cookies.set('dislikedMovies', JSON.stringify(updated));
                return updated;
            });
            setLikedMovies(prev => {
                const updated = prev.filter(id => id !== movie.id);
                Cookies.set('likedMovies', JSON.stringify(updated));
                return updated;
            });
        }
    }
    setMovieData(prev => prev.filter(m => m.id !== movie.id));

        const newMovie = await fetchRandomMovie();
        if (newMovie) {
          setMovieData(prev => [...prev, newMovie]);
        }
};


  

  return (
    <div className="flex flex-wrap">
      {movieData.map((movie) => (
        <div 
          key={movie.id} 
          className="w-36 h-54 mr-8 my-4 relative"
          onMouseEnter={() => setHoveredMovie(movie)}
          onMouseLeave={() => setHoveredMovie(null)}
        >
          <div className="shadow-md rounded-md cursor-pointer">
            <img 
              className={`hover:opacity-80 rounded-md ${likedMovies.includes(movie) ? 'border-blue-500 border-2' : dislikedMovies.includes(movie) ? 'border-orange-500 border-2' : ''}`}
              src={movie.poster} 
              alt={movie.title}
              draggable="false"
              onClick={() => setSelectedMovie(movie)}
            />
          </div>
          {selectedMovie && 
            <MovieInfo 
              movie={selectedMovie} 
              closeMovieInfo={() => setSelectedMovie(null)}
            />
          }
          {hoveredMovie === movie && (
            <div className="absolute w-full bottom-0 rounded-b-md bg-white left-1/2 transform -translate-x-1/2 flex justify-center">
              <button 
                className={`w-8 mx-2 ${likedMovies.includes(movie) ? 'text-blue-500' : 'text-gray-700'}`}
                onClick={() => handleLikeDislike(movie, true)}
              >
                <HandThumbUpIcon />
              </button>
              <button 
                className={`w-8 mx-2 ${dislikedMovies.includes(movie) ? 'text-orange-500' : 'text-gray-700'}`}
                onClick={() => handleLikeDislike(movie, false)}
              >
                <HandThumbDownIcon />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecommenderGrid;