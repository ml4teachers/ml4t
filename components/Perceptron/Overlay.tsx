import React, { useContext, useEffect, useState } from 'react';
import { UpdateContext } from '../Perceptron';

function Overlay() {
  const { selectedMovie, handlePlusClick, handleMinusClick, predictedLike } = useContext(UpdateContext);
  const [activeSlots, setActiveSlots] = useState([1, 1, 1]);

  useEffect(() => {
    if (selectedMovie) {
      setActiveSlots([selectedMovie.cat1 ? 1 : 0, selectedMovie.cat2 ? 1 : 0, 1]);
    } else {
      setActiveSlots([1, 1, 1]);
    }
  }, [selectedMovie]);

  return (
      <div className="z-10 absolute w-72 ml-24 h-24 border-2 border-gray-300 rounded-md">
        <div className="relative h-full">
          <div className="absolute z-20 right-0 bg-gradient-to-r from-white to-blue-200 w-24 h-12 rounded-t-sm">
            <div className="absolute top-2 left-1">
              {selectedMovie && predictedLike ? 'Like' : ''}
            </div>
            <div className="absolute z-20 top-2 right-2 w-6 h-6 bg-blue-300 rounded-full text-2xl border border-gray-400 text-white leading-4 text-center cursor-pointer" onClick={() => handlePlusClick(activeSlots)}>+</div>
          </div>
          <div className="absolute bottom-0 z-20 right-0 bg-gradient-to-r from-white to-orange-200 w-24 h-12 rounded-b-sm">
            <div className="absolute top-3 left-1">
              {selectedMovie && !predictedLike ? 'Dislike' : ''}
            </div>
            <div className="absolute z-20 bottom-3 right-2 w-6 h-6 bg-orange-300 rounded-full text-3xl border border-gray-400 text-white leading-4 text-center cursor-pointer" onClick={() => handleMinusClick(activeSlots)}>-</div>
          </div>
          <div className="absolute top-7 ml-1.5 left-10 w-8 h-8  rounded-sm text-2xl leading-8 text-center text-gray-600">+</div>
          <div className="absolute top-7 ml-3.5 left-24 w-8 h-8  rounded-sm text-2xl leading-8 text-center text-gray-600">{'>'}</div>
          <div className="absolute top-0 left-0 w-full h-[30px] bg-white rounded-md"></div>
          <div className="flex absolute bottom-0 left-0 w-full h-[30px] bg-white rounded-md">
            <div className="text-xs mt-1 ml-3">Action</div>
            <div className="text-xs mt-1 ml-6">Comedy</div>
          </div>
        </div>
      </div>
    );
  }


export default Overlay;
