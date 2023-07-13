import { useState, useEffect } from 'react';

function useMovies() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    fetch('/movielist.json')  
      .then(response => response.json())
      .then(data => {
        // Map through the data and reformat each movie
        const reformattedData = data.map((movie) => ({
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
          popularity: movie.popularity,
        }));

        setAllMovies(reformattedData);
        const smartSelection = getSmartSelection(reformattedData, 4);
        setMovies(smartSelection);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  function getSmartSelection(array, count) {
    const tempArray = [...array];
    const result = [];
  
    const desiredCombinations = [
      { cat1: 0, cat2: 0 },
      { cat1: 0, cat2: 1 },
      { cat1: 1, cat2: 0 },
      { cat1: 1, cat2: 1 }
    ];
  
    for (let i = 0; i < desiredCombinations.length; i++) {
      const moviesWithDesiredCombination = tempArray.filter(movie =>
        movie.cat1 === desiredCombinations[i].cat1 && movie.cat2 === desiredCombinations[i].cat2
      );
  
      if (moviesWithDesiredCombination.length > 0) {
        const weights = moviesWithDesiredCombination.map(movie => movie.popularity);
        const index = weightedRandomIndex(weights);
        result.push(moviesWithDesiredCombination[index]);
        tempArray.splice(tempArray.findIndex(movie => movie.id === moviesWithDesiredCombination[index].id), 1);
      }
    }
  
    while (result.length < count && tempArray.length > 0) {
      const weights = tempArray.map(movie => movie.popularity);
      const index = weightedRandomIndex(weights);
  
      if (!hasGenreOverlap(tempArray[index], result)) {
        result.push(tempArray[index]);
        tempArray.splice(index, 1);
      } else {
        // If all genre configurations are already covered, add a movie randomly
        tempArray.splice(index, 1);
      }
    }
    
    return result;
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

  function hasGenreOverlap(movie, movies) {
    return movies.some(m => m.cat1 === movie.cat1 && m.cat2 === movie.cat2 && m.cat3 === movie.cat3 && m.cat4 === movie.cat4 && m.cat5 === movie.cat5);
  }

  const deleteMovie = (title) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.title !== title));
  };

  const addSmartMovie = () => {
    const remainingMovies = allMovies.filter(movie => !movies.find(m => m.id === movie.id));
    if (remainingMovies.length > 0) {
      const smartMovie = getSmartSelection(remainingMovies, 1)[0];
      setMovies(prevMovies => [...prevMovies, smartMovie]);
    }
  };

  return { movies, setMovies, deleteMovie, addSmartMovie };
}

export default useMovies;
