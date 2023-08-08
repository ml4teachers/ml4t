import { useState, useEffect } from 'react';

function useMovies(initialCount, maxCount) {
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
          cat6: movie.genres.includes("Documentary") ? 1 : 0,
          cat7: movie.genres.includes("Music") ? 1 : 0,
          cat8: movie.genres.includes("Adventure") ? 1 : 0,
          cat9: movie.genres.includes("Thriller") ? 1 : 0,
          like: 0,
          popularity: movie.vote_count,
          rated: false
        }));
  
        setAllMovies(reformattedData);
        const initialMovies = [];

        let remainingMovies = [...reformattedData];

        for(let i = 0; i < initialCount; i++){
            if (remainingMovies.length > 0) {
                const movieToAdd = addSmartMovieLogic(remainingMovies, initialMovies);
                if (movieToAdd) {
                    initialMovies.push(movieToAdd);
                    remainingMovies = remainingMovies.filter(m => m.id !== movieToAdd.id);
                }
            }
        }
        setMovies(initialMovies);
      })
      .catch(error => console.error('Error:', error));
  }

  function generateCards(classes, numberOfSets) {
    const combinations = [];
    let movies = [...allMovies];
    for (let i = 0; i < Math.pow(2, classes); i++) {
      const combination = i.toString(2).padStart(classes, '0').split('').map(Number);
      combinations.push(combination);
    }

    let allSelectedMovies = [];
  
    for (let set = 0; set < numberOfSets; set++) {
      let selectedMovies = combinations.map(combination => {
        for (let i = 0; i < movies.length; i++) {
          const movie = movies[i];
          if (combination.every((value, index) => movie['cat' + (index + 1)] === value)) {
            // Entfernen des ausgewählten Films aus der Filmeliste
            movies = movies.filter((_, index) => index !== i);
            return movie;
          }
        }
      });

      // Filtern der undefinierten Filme aus selectedMovies
      selectedMovies = selectedMovies.filter(movie => movie !== undefined);
      allSelectedMovies.push(selectedMovies);
    }
  
    return allSelectedMovies;
  }

  const resetMovies = () => {
    fetchAndSetMovies();
  };
  
  function getFirstSelection(array) {
    const weights = array.map(movie => movie.popularity);
    const index = weightedRandomIndex(weights);
    return array[index];
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

  function generateCombinations(length) {
    const result = [];
    for (let i = 0; i < Math.pow(2, length); i++) {
      result.push(i.toString(2).padStart(length, '0').split('').map(Number));
    }
    return result;
  }
  

  function addSmartMovieLogic(remainingMovies, currentMovies) {
    let selectedMovie = null;
    let categoriesToConsider;
  
    if (currentMovies.length < 2) {
      // Für den ersten und den zweiten Film
      categoriesToConsider = 1;
    } else {
      // Ab dem dritten Film
      categoriesToConsider = Math.ceil(Math.log2(currentMovies.length + 1));
    }
  
    const allCombinations = generateCombinations(categoriesToConsider);
    const existingCombinations = currentMovies.map(movie => {
      return Array.from({ length: categoriesToConsider }, (_, i) => movie['cat' + (i + 1)]);
    });
  
    let neededCombinations = allCombinations.filter(combination =>
      !existingCombinations.some(existingComb => JSON.stringify(existingComb) === JSON.stringify(combination))
    );
  
    let possibleMovies = remainingMovies.filter(movie =>
      neededCombinations.some(neededComb =>
        neededComb.every((value, index) => movie['cat' + (index + 1)] === value)
      )
    );
  
    while (!possibleMovies.length && categoriesToConsider > 0) {
      categoriesToConsider--;  // Reduziere die Kategorien
      const reducedCombinations = generateCombinations(categoriesToConsider);
      const reducedExistingCombinations = currentMovies.map(movie => {
        return Array.from({ length: categoriesToConsider }, (_, i) => movie['cat' + (i + 1)]);
      });
  
      neededCombinations = reducedCombinations.filter(combination =>
        !reducedExistingCombinations.some(existingComb => JSON.stringify(existingComb) === JSON.stringify(combination))
      );
  
      possibleMovies = remainingMovies.filter(movie =>
        neededCombinations.some(neededComb =>
          neededComb.every((value, index) => movie['cat' + (index + 1)] === value)
        )
      );
    }
  
    if (possibleMovies.length > 0) {
      const weights = possibleMovies.map(movie => movie.popularity);
      const index = weightedRandomIndex(weights);
      selectedMovie = possibleMovies[index];
    }
  
    return selectedMovie;
  }
  

  const addSmartMovie = () => {
    if (movies.length < maxCount) {
        const remainingMovies = allMovies.filter(movie => !movies.find(m => m.id === movie.id));
        const movieToAdd = addSmartMovieLogic(remainingMovies, movies);
        if (movieToAdd) {
            setMovies(prevMovies => [...prevMovies, movieToAdd]);
        } else {
            console.warn("Kein passender Film gefunden.");
        }
    }
};



  return { movies, setMovies, deleteMovie, addSmartMovie, resetMovies, generateCards };
}

export default useMovies;