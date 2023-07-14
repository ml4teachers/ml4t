import { useState, useEffect } from 'react';

function useMovies() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    fetchAndSetMovies();
  }, []);

  function fetchAndSetMovies() {
    fetch('/movielist.json')  
      .then(response => response.json())
      .then(data => {
        const reformattedData = data.filter(movie => movie.summary).map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster: movie.poster,
          summary: movie.summary,
          genres: movie.genres,
          cat1: movie.genres.includes("Action") ? 1 : 0,
          cat2: movie.genres.includes("Comedy") ? 1 : 0,
          cat3: movie.genres.includes("Drama") ? 1 : 0,
          cat4: movie.genres.includes("Horror") ? 1 : 0,
          cat5: movie.genres.includes("Family") ? 1 : 0,
          like: movie.vote_average > 7 ? 1 : 0,
          popularity: movie.vote_count,
        }));
  
        setAllMovies(reformattedData);
        const firstSelection = getFirstSelection(reformattedData);
        const remainingMovies = reformattedData.filter(movie => movie.id !== firstSelection.id);
        const secondSelection = getFirstSelection(remainingMovies);
        setMovies([firstSelection, secondSelection]);
      })
      .catch(error => console.error('Error:', error));
  }

  //...

  const resetMovies = () => {
    fetchAndSetMovies();
  };
  
  function getFirstSelection(array) {
    const weights = array.map(movie => movie.popularity);
    const index = weightedRandomIndex(weights);
    return array[index];
  }
  
  function getSmartSelection(array, count) {
    const tempArray = [...array];
    const result = [];
    const genreCategories = ['cat1', 'cat2', 'cat3', 'cat4', 'cat5'];
    
    for (let i = 0; i < genreCategories.length; i++) {
      let moviesWithGenre = tempArray.filter(movie => movie[genreCategories[i]] === 1 && !hasGenreOverlap(movie, result));
      if (moviesWithGenre.length > 0) {
        const index = Math.floor(Math.random() * moviesWithGenre.length);
        result.push(moviesWithGenre[index]);
        tempArray.splice(tempArray.findIndex(movie => movie.id === moviesWithGenre[index].id), 1);
      }
      let moviesWithoutGenre = tempArray.filter(movie => movie[genreCategories[i]] === 0 && !hasGenreOverlap(movie, result));
      if (moviesWithoutGenre.length > 0) {
        const index = Math.floor(Math.random() * moviesWithoutGenre.length);
        result.push(moviesWithoutGenre[index]);
        tempArray.splice(tempArray.findIndex(movie => movie.id === moviesWithoutGenre[index].id), 1);
      }
    }
    
    while (result.length < count && tempArray.length > 0) {
      const weights = tempArray.map(movie => movie.popularity);
      const index = weightedRandomIndex(weights);
    
      if (!hasGenreOverlap(tempArray[index], result)) {
        result.push(tempArray[index]);
        tempArray.splice(index, 1);
      } else {
        tempArray.splice(index, 1);
      }
    }
      
    return result;
  }
  
  
  function hasGenreOverlap(movie, movies) {
    const genreCategories = ['cat1', 'cat2', 'cat3', 'cat4', 'cat5'];
    return movies.some(m => genreCategories.every(category => m[category] === movie[category]));
  }

  function weightedRandomIndex(weights) {
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const randomNum = Math.random() * totalWeight;
    let weightSum = 0;
    for (let i = 0; i < weights.length; i++) {
      weightSum += weights[i];
      weightSum = +weightSum.toFixed(2);
      if (randomNum <= weightSum) {
        return i;
      }
    }
  }

  const deleteMovie = (title) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.title !== title));
  };

  const isGenreCombinationUnique = (newMovie, movies) => {
    const genreCategories = ['cat1', 'cat2', 'cat3', 'cat4', 'cat5'];
    return !movies.some(m => genreCategories.every(category => m[category] === newMovie[category]));
  };

  const generateUniqueMovie = (remainingMovies, existingMovies) => {
    for(let movie of remainingMovies){
      if(isGenreCombinationUnique(movie, existingMovies)){
        return movie;
      }
    }
    return null;
  };

  const addSmartMovie = () => {
    const remainingMovies = allMovies.filter(movie => !movies.find(m => m.id === movie.id));
    if (remainingMovies.length > 0) {
      const uniqueMovie = generateUniqueMovie(remainingMovies, movies);
      if (uniqueMovie) {
        setMovies(prevMovies => [...prevMovies, uniqueMovie]);
      } else {
        const smartMovie = getSmartSelection(remainingMovies, 1)[0];
        setMovies(prevMovies => [...prevMovies, smartMovie]);
      }
    }
  };


  return { movies, setMovies, deleteMovie, addSmartMovie, resetMovies };
}

export default useMovies;
