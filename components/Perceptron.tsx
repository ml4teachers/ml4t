import React, { useState, createContext, useEffect, useRef } from 'react';
import Slot from './Perceptron/Slot';
import Overlay from './Perceptron/Overlay';
import Card from './Perceptron/Card';
import Cards from './Perceptron/Cards';
import useMovies from './Perceptron/useMovies';
import useTraining from './Perceptron/useTraining';
import MovieInfo from './Perceptron/movieInfo';
import { PlayIcon, StopIcon, ArrowPathIcon, ForwardIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline'

export const UpdateContext = createContext();

function Perceptron() {
  const { movies, setMovies, deleteMovie, addSmartMovie, resetMovies } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { weights, b, setB, setWeights, training, iteration, 
    tempo, setTempo, tempoValues, handlePlusClick, handleMinusClick, startTraining, stopTraining } = useTraining([0], 0, movies, setSelectedMovie);
  const [predictedLike, setPredictedLike] = useState(null);
  const [classes, setClasses] = useState(1);
  const [activeSlots, setActiveSlots] = useState(new Array(classes + 1).fill(1));
  const [showMovieInfo, setShowMovieInfo] = useState(false);

  
  useEffect(() => {
    if (selectedMovie) {
      let newActiveSlots = activeSlots.slice();
      for (let i = 0; i < classes; i++) {
        newActiveSlots[i] = selectedMovie['cat' + (i+1)] ? 1 : 0;
      }
      newActiveSlots[classes] = 1;  // for bias 'b'
      setActiveSlots(newActiveSlots);
    } else {
      setActiveSlots(new Array(classes + 1).fill(1));
    }
  }, [selectedMovie, classes]);

  useEffect(() => {
    if (selectedMovie) {
      const activeWeightSum = weights.reduce((sum, weight, i) => sum + (selectedMovie['cat' + (i+1)] ? weight : 0), 0);
      setPredictedLike(activeWeightSum > b);
    } else {
      setPredictedLike(null);
    }
  }, [selectedMovie, weights, b]);

  const openMovieInfo = () => {
    setShowMovieInfo(true);
  };

  const closeMovieInfo = () => {
    setShowMovieInfo(false);
  };

  const likeMovie = (title) => {
    setMovies((prevMovies) =>
    prevMovies.map((movie) =>
      movie.title === title ? { ...movie, like: movie.like ? 0 : 1 } : movie
    )
  );
  }

  const editMovieTitle = (currentTitle, newTitle) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.title === currentTitle ? { ...movie, title: newTitle } : movie
      )
    );
  }

  const changeMovieCategory = (title, catNum) => {
    setMovies((prevMovies) => {
      const updatedMovies = prevMovies.map((movie) =>
        movie.title === title
          ? {
              ...movie,
              ["cat" + catNum]: movie["cat" + catNum] ? 0 : 1,
            }
          : movie
      );
      if (selectedMovie && selectedMovie.title === title) {
        setSelectedMovie(updatedMovies.find(movie => movie.title === title));
      }
      return updatedMovies;
    });
};

  
  const reset = () => {
    setWeights(new Array(classes).fill(0));
    setB(0);
    setSelectedMovie(null);
    setActiveSlots(new Array(classes + 1).fill(1));
    setPredictedLike(null);
};

  const faster = () => {
    const currentTempoIndex = tempoValues.indexOf(tempo);

    if (currentTempoIndex === tempoValues.length - 1) {
      setTempo(tempoValues[0]);
    } else {
      setTempo(tempoValues[currentTempoIndex + 1]);
    }
  }

  const classesPlus = (plus) => {
    let newClasses;
    if (plus) {
      newClasses = classes < 5 ? classes + 1 : classes;
    } else {
      newClasses = classes > 1 ? classes - 1 : classes;
    }
    setClasses(newClasses);
    setWeights(new Array(newClasses).fill(0));
  };
  
  const removeLastMovie = () => {
    setMovies((prevMovies) => {
      let newMovies = [...prevMovies];
      newMovies.pop();
      return newMovies;
    });
  };

  
  
  return (
    <UpdateContext.Provider value={{ 
      weights, b, setWeights, setB, selectedMovie, setSelectedMovie,
      predictedLike, movies, classes, activeSlots,
      showMovieInfo, openMovieInfo, closeMovieInfo,
      addSmartMovie, handlePlusClick, handleMinusClick, deleteMovie,
      likeMovie, editMovieTitle, changeMovieCategory
      }}>
      {showMovieInfo && <MovieInfo movie={selectedMovie} closeMovieInfo={closeMovieInfo} />}
      <div className="flex flex-col md:flex-row justify-center">
        <div className="flex justify-center items-center mt-10 mr-32 mb-8 relative">
          <Card />
          <Overlay />
          {weights.map((weight, i) => (
            <Slot key={"w" + i} category={"w" + (i + 1)} reversed={undefined} active={activeSlots[i]} />
          ))}
          <Slot key={"bias"} category="b" reversed active />
        </div>
        <div className="z-30 flex mt-10 sm:mt-0 justify-center">
          <div className="flex-row">
            <div className="flex my-2">
              <div className="flex-1 ">
                Filme({movies.length})
              </div>
              <div className="flex">
                <button 
                  className="w-6 p-0.5 text-gray-500 rounded-md text-center cursor-pointer"
                  onClick={addSmartMovie}
                  >
                  <PlusCircleIcon />
                </button>
                <button 
                  className="w-6 p-0.5 text-gray-500 rounded-md text-center cursor-pointer"
                  onClick={removeLastMovie}
                  >
                  <MinusCircleIcon />
                </button>
                <button 
                  className="w-6 p-0.5 text-gray-500 rounded-md text-center cursor-pointer"
                  onClick={resetMovies}>
                  <ArrowPathIcon />
                </button>
              </div>
            </div>
            <div className="flex my-2">
              <div className="flex-1 ">
                Genres({classes}/5)
              </div>
              <div className="flex">
                <button 
                  className="w-6 p-0.5 text-gray-500 rounded-md text-center cursor-pointer"
                  onClick={() => classesPlus(true)}
                  >
                  <PlusCircleIcon />
                </button>
                <button 
                  className="w-6 p-0.5 text-gray-500 rounded-md text-center cursor-pointer"
                  onClick={() => classesPlus(false)}
                  >
                  <MinusCircleIcon />
                </button>
                <button 
                  className="w-6 p-0.5 text-gray-500 rounded-md text-center cursor-pointer"
                  onClick={reset}>
                  <ArrowPathIcon />
                </button>
              </div>
            </div>
            <div className="flex my-2">
              <div className="flex-1 ">
               Training({iteration}/{tempo})
              </div>
              <div className="flex">
                <button 
                  className="w-6 p-0.5 text-gray-500 rounded-md text-center cursor-pointer"
                  onClick={startTraining} 
                  disabled={training}
                  >
                  <PlayIcon />
                </button>
                <button 
                  className="w-6 mb-0.5 text-gray-500 rounded-md text-center cursor-pointer"
                  onClick={faster}
                  >
                  <ForwardIcon />
                </button>
                <button 
                  className="w-6 text-gray-500 rounded-md text-center cursor-pointer"
                  onClick={stopTraining}
                  >
                  <StopIcon />
                </button>
              </div>
            </div>
            <Cards />
          </div>
        </div>
      </div>
    </UpdateContext.Provider>
  )
}

export default Perceptron;
