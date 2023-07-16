import { useState, useRef, useEffect } from 'react';

export default function useTraining(initialWeights, initialBias, movies, setSelectedMovie) {
  const [weights, setWeights] = useState(initialWeights);
  const [b, setB] = useState(initialBias);
  const [iteration, setIteration] = useState(0);
  const [training, setTraining] = useState(false);
  const [tempo, setTempo] = useState(5);
  const tempoValues = [5, 10, 20, 50, 100, 500];
  const trainingIntervalRef = useRef(null);

  const weightsRef = useRef(weights);
  const bRef = useRef(b);

  useEffect(() => {
    weightsRef.current = weights;
  }, [weights]);

  useEffect(() => {
    bRef.current = b;
  }, [b]);

  const handlePlusClick = (activeSlots = Array(weights.length).fill(1)) => {
    setWeights(prevWeights => prevWeights.map((weight, i) => 
      (activeSlots[i] && weight < 5) ? weight + 1 : weight));
    if (activeSlots[weights.length] && b > -5) {
      setB(prevB => prevB - 1);
    }
  }

  const handleMinusClick = (activeSlots = Array(weights.length).fill(1)) => {
    setWeights(prevWeights => prevWeights.map((weight, i) => 
      (activeSlots[i] && weight > -5) ? weight - 1 : weight));
    if (activeSlots[weights.length] && b < 5) {
      setB(prevB => prevB + 1);
    }
  }

  const stopTraining = () => {
    setTraining(false);
    setIteration(0);
    if (trainingIntervalRef.current) {
      clearInterval(trainingIntervalRef.current);
      trainingIntervalRef.current = null;
    }
  }

  const startTraining = () => {
    setTraining(true);
    let iterationCount = 0;

    let movieIndex = 0; // Set a tracker

    trainingIntervalRef.current = setInterval(() => {
      iterationCount++;
      
      if (iterationCount > tempo) {
        clearInterval(trainingIntervalRef.current);
        trainingIntervalRef.current = null;
        setTraining(false);
        setSelectedMovie(false);
      } else {
        setIteration(iterationCount);
        const movie = movies[movieIndex];

        setSelectedMovie(movie);

        const activeWeightSum = weightsRef.current.reduce((sum, weight, i) => sum + (movie['cat' + (i+1)] ? weight : 0), 0);
        const predictedLike = activeWeightSum > bRef.current ? 1 : 0;

        if (movie.like > predictedLike) {
          handlePlusClick([...Array(weights.length)].map((_, i) => movie['cat' + (i+1)] ? 1 : 0).concat(1));
        } else if (movie.like < predictedLike) {
          handleMinusClick([...Array(weights.length)].map((_, i) => movie['cat' + (i+1)] ? 1 : 0).concat(1));
        }
        
        movieIndex++;
        if (movieIndex >= movies.length) {
          movieIndex = 0;
        }
      }
    }, 5000 / tempo);

  };

  return { 
    weights, b, setWeights, setB, training, iteration, 
    tempo, setTempo, tempoValues, handlePlusClick, handleMinusClick, startTraining, stopTraining
  };
}
