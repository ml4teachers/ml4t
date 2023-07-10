import React, { useState, createContext, useEffect, useRef } from 'react';
import Slot from './Slot';
import Overlay from './Overlay';
import Card from './Card';
import Cards from './Cards';

export const UpdateContext = createContext();

function Perceptron() {
  const [w1, setW1] = useState(0);
  const [w2, setW2] = useState(0);
  const [b, setB] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeSlots, setActiveSlots] = useState([1, 1, 1]);
  const [movies, setMovies] = useState([
    { title: 'Scream', cat1: 0, cat2: 0, like: 0 },
    { title: 'Batman', cat1: 1, cat2: 0, like: 1 },
    { title: 'Simpsons', cat1: 0, cat2: 1, like: 1 },
    { title: '21 Jump Street', cat1: 1, cat2: 1, like: 1 },
  ]);
  const [training, setTraining] = useState(false);
  const [predictedLike, setPredictedLike] = useState(null);
  const w1Ref = useRef(w1);
  const w2Ref = useRef(w2);
  const bRef = useRef(b);
  const deleteMovie = (title) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.title !== title));
  };

  useEffect(() => {
    w1Ref.current = w1;
  }, [w1]);

  useEffect(() => {
    w2Ref.current = w2;
  }, [w2]);

  useEffect(() => {
    bRef.current = b;
  }, [b]);

  useEffect(() => {
    if (selectedMovie) {
      setActiveSlots([selectedMovie.cat1 ? 1 : 0, selectedMovie.cat2 ? 1 : 0, 1]);
    } else {
      setActiveSlots([1, 1, 1]);
    }
  }, [selectedMovie]);

  const handlePlusClick = (activeSlots = [1, 1, 1]) => {
    if (activeSlots[0] && w1 < 5) {
      setW1(prevW1 => prevW1 + 1);
    }
    if (activeSlots[1] && w2 < 5) {
      setW2(prevW2 => prevW2 + 1);
    }
    if (activeSlots[2] && b > -5) {
      setB(prevB => prevB - 1);
    }
  }
  
  const handleMinusClick = (activeSlots = [1, 1, 1]) => {
    if (activeSlots[0] && w1 > -5) {
      setW1(prevW1 => prevW1 - 1);
    }
    if (activeSlots[1] && w2 > -5) {
      setW2(prevW2 => prevW2 - 1);
    }
    if (activeSlots[2] && b < 5) {
      setB(prevB => prevB + 1);
    }
  }

  useEffect(() => {
    if (selectedMovie) {
      const activeWeightSum = (selectedMovie.cat1 ? w1 : 0) + (selectedMovie.cat2 ? w2 : 0);
      setPredictedLike(activeWeightSum > b);
    } else {
      setPredictedLike(null);
    }
  }, [selectedMovie, w1, w2, b]);

  
  const train = () => {
    setTraining(true);
    let iteration = 0;
    
    const trainingInterval = setInterval(() => {
      iteration++;
      if (iteration > 20) {
        clearInterval(trainingInterval);
        setTraining(false);
        setSelectedMovie(false);
      } else {
        const movie = movies[Math.floor(Math.random() * movies.length)];
        setSelectedMovie(movie);
  
        const activeWeightSum = (movie.cat1 ? w1Ref.current : 0) + (movie.cat2 ? w2Ref.current : 0);
        const predictedLike = activeWeightSum > bRef.current ? 1 : 0;
  
        if (movie.like > predictedLike) {
          setActiveSlots([movie.cat1 ? 1 : 0, movie.cat2 ? 1 : 0, 1]);
          handlePlusClick([movie.cat1 ? 1 : 0, movie.cat2 ? 1 : 0, 1]);
        } else if (movie.like < predictedLike) {
          setActiveSlots([movie.cat1 ? 1 : 0, movie.cat2 ? 1 : 0, 1]);
          handleMinusClick([movie.cat1 ? 1 : 0, movie.cat2 ? 1 : 0, 1]);
        }        
      }
    }, 200);
  };
  

  return (
    <UpdateContext.Provider value={{ 
      w1, w2, b, setW1, setW2, setB,
      selectedMovie, setSelectedMovie,
      handlePlusClick, handleMinusClick,
      predictedLike, movies, deleteMovie
      }}>
      <div className="flex flex-col sm:flex-row justify-center">
        <div className="flex justify-center items-center mr-12 mt-10 sm:mr-32 relative">
          <Card classes={activeSlots} />
          <Overlay />
          <Slot category="w1" reversed={undefined} active={activeSlots[0]} />
          <Slot category="w2" reversed={undefined} active={activeSlots[1]} />
          <Slot category="b" reversed active={activeSlots[2]} />
        </div>
        <div className="flex mt-10 sm:mt-0 justify-center">
          <Cards />
        </div>
        <button 
          className="w-36 h-8 bg-blue-500 text-white rounded-md text-center mt-6 cursor-pointer" 
          onClick={train} 
          disabled={training}>
          Training
        </button>
      </div>
    </UpdateContext.Provider>
  )
}

export default Perceptron;
