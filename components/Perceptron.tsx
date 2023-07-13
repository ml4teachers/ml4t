import React, { useState, createContext, useEffect, useRef } from 'react';
import Slot from './Perceptron/Slot';
import Overlay from './Perceptron/Overlay';
import Card from './Perceptron/Card';
import Cards from './Perceptron/Cards';
import useMovies from './Perceptron/useMovies';
import useTraining from './Perceptron/useTraining';
import { PlayIcon, StopIcon, ArrowPathIcon, ForwardIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline'

export const UpdateContext = createContext();

function Perceptron() {
  const { movies, setMovies, deleteMovie, addRandomMovie } = useMovies();
  const { w1, w2, b, setW1, setW2, setB, training, iteration, 
    tempo, setTempo, tempoValues, handlePlusClick, handleMinusClick, startTraining, stopTraining } = useTraining([0, 0], 0, movies);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeSlots, setActiveSlots] = useState([1, 1, 1]);
  const [predictedLike, setPredictedLike] = useState(null);
  const [classes, setClasses] = useState(2);

  useEffect(() => {
    if (selectedMovie) {
      setActiveSlots([selectedMovie.cat1 ? 1 : 0, selectedMovie.cat2 ? 1 : 0, 1]);
    } else {
      setActiveSlots([1, 1, 1]);
    }
  }, [selectedMovie]);

  useEffect(() => {
    if (selectedMovie) {
      const activeWeightSum = (selectedMovie.cat1 ? w1 : 0) + (selectedMovie.cat2 ? w2 : 0);
      setPredictedLike(activeWeightSum > b);
    } else {
      setPredictedLike(null);
    }
  }, [selectedMovie, w1, w2, b]);


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
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.title === title
          ? {
              ...movie,
              [catNum === 1 ? "cat1" : "cat2"]: movie[catNum === 1 ? "cat1" : "cat2"] ? 0 : 1,
            }
          : movie
      )
    );
  };
  
  const reset = () => {
    setW1(0);
    setW2(0);
    setB(0);
    setSelectedMovie(null);
    setActiveSlots([1, 1, 1]);
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
    if (plus) {
      setClasses(classes => classes < 5 ? classes + 1 : classes);
    } else {
      setClasses(classes => classes > 1 ? classes - 1 : classes);
    }
    console.log(classes)
}
  
  return (
    <UpdateContext.Provider value={{ 
      w1, w2, b, setW1, setW2, setB, selectedMovie, setSelectedMovie, predictedLike, movies, 
      addRandomMovie, handlePlusClick, handleMinusClick, deleteMovie, likeMovie, editMovieTitle, changeMovieCategory,
      }}>
      <div className="flex flex-col sm:flex-row justify-center">
        <div className="flex justify-center items-center mr-12 mt-10 sm:mr-32 relative">
          <Card />
          <Overlay />
          <Slot category="w1" reversed={undefined} active={activeSlots[0]} />
          <Slot category="w2" reversed={undefined} active={activeSlots[1]} />
          <Slot category="b" reversed active={activeSlots[2]} />
        </div>
        <div className="z-30 flex mt-10 sm:mt-0 justify-center">
          <div className="flex-row">
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
            <div className="flex">
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
