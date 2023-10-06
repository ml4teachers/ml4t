// components/Recommender.tsx
import { useState, useEffect } from 'react';
import RatedMovies from './Recommender/RatedMovies';
import RecommenderGrid from './Recommender/RecommenderGrid';
import SearchBar from './Recommender/SearchBar';
import Cookies from 'js-cookie';

const Recommender = () => {
  const [view, setView] = useState('grid'); // 'grid', 'rated'
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState(JSON.parse(Cookies.get('likedMovies') || '[]'));
  const [dislikedMovies, setDislikedMovies] = useState(JSON.parse(Cookies.get('dislikedMovies') || '[]'));


  useEffect(() => {
    Cookies.set('likedMovies', JSON.stringify(likedMovies));
    Cookies.set('dislikedMovies', JSON.stringify(dislikedMovies));
  }, [likedMovies, dislikedMovies]);

  return (
    <div>
      <SearchBar setSearchedMovies={setSearchedMovies} setView={setView} />
      {view === 'grid' ? 
        <RecommenderGrid 
        searchedMovies={searchedMovies} 
        likedMovies={likedMovies} 
        dislikedMovies={dislikedMovies} 
        setLikedMovies={setLikedMovies} 
        setDislikedMovies={setDislikedMovies}
    />     :
        <RatedMovies
        likedMoviesIDs={likedMovies}
        dislikedMoviesIDs={dislikedMovies}
        setLikedMoviesIDs={setLikedMovies} 
        setDislikedMoviesIDs={setDislikedMovies}
        />
      }
    </div>
  );
};

export default Recommender;
