import React, { useContext, useEffect, useState } from 'react';
import { UpdateContext } from '../Perceptron';
import { genres } from "../data/genres.js";


function Overlay() {
  const { selectedMovie, handlePlusClick, handleMinusClick, predictedLike, classes } = useContext(UpdateContext);
  const [activeSlots, setActiveSlots] = useState(new Array(classes + 1).fill(1));
  const borderColor = !selectedMovie ? 'border-gray-300' : predictedLike ? 'border-blue-300' : 'border-orange-300';

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

  const overlayWidth = 4 * classes + 10;

  return (
      <div className={`z-10 absolute ml-24 h-24 border-2 ${borderColor} rounded-md`} style={{ width: `${overlayWidth}rem` }}>
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
            {
              Array.from({ length: classes }, (_, i) => (
                <div 
                  key={i}
                  className="absolute top-7 w-8 h-8  rounded-sm text-2xl leading-8 text-center text-gray-600"
                  style={{ right: `${8.9 + 4 * i}rem` }}
                >
                  { i === 0 ? '>' : '+' }
                </div>
              ))
            }
          <div className="absolute top-0 left-0 w-full h-[30px] bg-white rounded-md"></div>
          <div className="flex absolute bottom-0 w-full h-[30px] bg-white rounded-md">
            {
              genres.slice(0, classes).map((genre, index) => (
                <div className="text-xs w-16 text-center mt-1" key={index}>{genre}</div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }


export default Overlay;
