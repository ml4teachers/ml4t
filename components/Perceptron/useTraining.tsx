import { useState, useRef, useEffect } from 'react';

export default function usePerceptronTraining(initialWeights, initialBias, movies) {
  const [w1, setW1] = useState(initialWeights[0]);
  const [w2, setW2] = useState(initialWeights[1]);
  const [b, setB] = useState(initialBias);
  const [iteration, setIteration] = useState(0);
  const [training, setTraining] = useState(false);
  const [tempo, setTempo] = useState(10);
  const tempoValues = [10, 20, 50, 100];
  const trainingIntervalRef = useRef(null);
  
  const w1Ref = useRef(w1);
  const w2Ref = useRef(w2);
  const bRef = useRef(b);

  useEffect(() => {
    w1Ref.current = w1;
  }, [w1]);

  useEffect(() => {
    w2Ref.current = w2;
  }, [w2]);

  useEffect(() => {
    bRef.current = b;
  }, [b]);

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
  
    trainingIntervalRef.current = setInterval(() => {
      iterationCount++;
      setIteration(iterationCount);
      if (iterationCount > tempo-1) {
        clearInterval(trainingIntervalRef.current);
        trainingIntervalRef.current = null;
        setTraining(false);
      } else {
        const movie = movies[Math.floor(Math.random() * movies.length)];
        const activeWeightSum = (movie.cat1 ? w1Ref.current : 0) + (movie.cat2 ? w2Ref.current : 0);
        const predictedLike = activeWeightSum > bRef.current ? 1 : 0;
  
        if (movie.like > predictedLike) {
          handlePlusClick([movie.cat1 ? 1 : 0, movie.cat2 ? 1 : 0, 1]);
        } else if (movie.like < predictedLike) {
          handleMinusClick([movie.cat1 ? 1 : 0, movie.cat2 ? 1 : 0, 1]);
        }        
      }
    }, 5000/tempo);
  };

  return { 
    w1, w2, b, setW1, setW2, setB, training, iteration, 
    tempo, setTempo, tempoValues, handlePlusClick, handleMinusClick, startTraining, stopTraining
  };
}
