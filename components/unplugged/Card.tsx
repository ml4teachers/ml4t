import { useState, useEffect } from 'react';
import { genres } from "../data/genres.js";

const Card = ({ selectedMovie, classes }) => {
  const colorClass = 'white';
  const cardWidth = 4 * classes + 1;
  const [movieCategories, setMovieCategories] = useState(new Array(classes).fill(false));

  useEffect(() => {
    if (selectedMovie) {
      const newMovieCategories = new Array(classes).fill(false);
      for (let i = 0; i < classes; i++) {
        newMovieCategories[i] = Boolean(selectedMovie['cat' + (i + 1)]);
      }
      setMovieCategories(newMovieCategories);
    }
  }, [selectedMovie, classes]);


  if (!selectedMovie) return null;


  return (
    <div className={`z-30 h-24 border bg-gray-100 border-gray-400`} style={{ width: `${cardWidth}rem` }}>
      <div className="relative h-full">
        <div className={`absolute top-0 left-0 w-full h-[30px] ${colorClass}`}>
          <div className="text-center text-xs mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap px-2">{(classes > 1) ? selectedMovie.title : ''}</div>
        </div>
        <div className={`absolute top-6 left-0 w-[14px] h-10 ${colorClass}`}></div>
        <div className={`absolute flex bottom-0 left-0 w-full h-[30px] ${colorClass}`}>
          <div className="absolute flex">
          {
            movieCategories.map((isActive, index) => (
              <div 
                key={index} 
                className={`w-16 text-xs text-center mt-1 ${isActive ? '' : 'line-through text-gray-400'}`}
              >
                {genres[index]}
              </div>
            ))
          }
          </div>
        </div>
        <div className={`absolute top-7 right-0 w-[30px] h-9 ${colorClass} rounded-sm text-2xl leading-8 text-center text-gray-600`}>{`>`}</div>
        {
          movieCategories.map((isActive, index) => (
            <div 
              key={index} 
              className={`${isActive ? 'h-8 mt-[30px] w-8 border bg-white border-gray-400 absolute' : ''}`}
              style={{ right: `${(classes-1) * 4 + 1.9 - 4 * index}rem` }}
            >
            </div>
          ))
        }
 
        {
          Array.from({ length: classes-1 }, (_, i) => (
              <div 
                key={i}
                className={`absolute top-7 w-[31px] h-9 ${colorClass} rounded-sm text-2xl leading-8 text-center text-gray-600`}
                style={{ right: `${3.9 + 4 * i}rem` }}
              >+</div>
          ))
        }
        {
          Array.from({ length: classes }, (_, i) => {
            const isActive = movieCategories[classes - i - 1];
            const className = isActive ? '' : colorClass;
            return (
              <div 
                key={i}
                className={`absolute top-7 w-9 h-9 text-center pt-1.5 text-gray-600 ${className}`}
                style={{ right: `${1.8 + 4 * i}rem` }}
              >{isActive ? '' : '0'}</div>
            );
          })
        }
      </div>
    </div>
  );
}

export default Card;
