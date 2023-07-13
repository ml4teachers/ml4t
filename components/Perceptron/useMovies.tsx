import { useState, useEffect } from 'react';

function useMovies() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    fetch('/movielist.json')  // Fetch movielist.json instead of movies.json
      .then(response => response.json())
      .then(data => {
        // Map through the data and reformat each movie
        const reformattedData = data.map((movie) => ({
          title: movie.title,
          cat1: movie.genres.includes("Action") ? 1 : 0,
          cat2: movie.genres.includes("Comedy") ? 1 : 0,
          cat3: movie.genres.includes("Drama") ? 1 : 0,
          cat4: movie.genres.includes("Horror") ? 1 : 0,
          cat5: movie.genres.includes("Family") ? 1 : 0,
          like: movie.vote_average > 7 ? 1 : 0,
        }));

        setAllMovies(reformattedData);
        const randomSelection = getRandomSelection(reformattedData, 4);
        setMovies(randomSelection);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  function getRandomSelection(array, count) {
    const tempArray = [...array];
    const result = [];
    while (result.length < count && tempArray.length > 0) {
      const index = Math.floor(Math.random() * tempArray.length);
      result.push(tempArray[index]);
      tempArray.splice(index, 1);
    }
    return result;
  }

  const deleteMovie = (title) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.title !== title));
  };

  const addRandomMovie = () => {
    const remainingMovies = allMovies.filter(movie => !movies.includes(movie));
    if (remainingMovies.length > 0) {
      const randomMovie = getRandomSelection(remainingMovies, 1)[0];
      setMovies(prevMovies => [...prevMovies, randomMovie]);
    }
  };

  return { movies, setMovies, deleteMovie, addRandomMovie };
}

export default useMovies;
