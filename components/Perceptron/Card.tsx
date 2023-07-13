import { useContext, useEffect, useState } from 'react';
import { UpdateContext } from '../Perceptron';
import { genres } from "../data/genres.js";
import { InformationCircleIcon } from '@heroicons/react/24/outline'


function Card() {
  const { selectedMovie, setSelectedMovie, changeMovieCategory, classes, openMovieInfo } = useContext(UpdateContext);
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

  const handleCategoryClick = (index) => {
    index = classes - index;
    const newMovieCategories = [...movieCategories];
    newMovieCategories[index] = !newMovieCategories[index];
    setMovieCategories(newMovieCategories);
    changeMovieCategory(selectedMovie.title, index);
  };

  const showMovieInfo = () => {
    openMovieInfo(true);
  };


  const colorClass = selectedMovie.like ? 'bg-blue-100' : 'bg-orange-100';

  const cardWidth = 4 * classes + 1;

  return (
    <div className={`z-30 absolute mr-12 h-24 border-2 border-gray-400 rounded-md`} style={{ width: `${cardWidth}rem` }}>
      <div className="relative h-full">
        <div className={`absolute top-0 left-0 w-full h-[30px] rounded-t-md ${colorClass} cursor-pointer`} onClick={() => setSelectedMovie(null)}>
          <div className="text-center text-sm mt-2 pr-7 overflow-hidden overflow-ellipsis whitespace-nowrap px-2">{selectedMovie.title}</div>
        </div>
        <InformationCircleIcon className="z-40 absolute w-6 right-1 pt-1 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={showMovieInfo}/>
        <div className={`absolute top-6 left-0 w-[14px] h-10 ${colorClass}`}></div>
        <div className={`absolute flex bottom-0 left-0 w-full h-[30px] rounded-b-md ${colorClass}`}>
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
          Array.from({ length: classes-1 }, (_, i) => (
              <div 
                key={i}
                className={`absolute top-7 w-[31px] h-9 ${colorClass} rounded-sm text-2xl leading-8 text-center text-gray-600`}
                style={{ right: `${3.9 + 4 * i}rem` }}
              >+</div>
          ))
        }
        {
          Array.from({ length: classes }, (_, i) => (
              <div key={i} className={`z-40 absolute top-7 w-8 h-16 cursor-pointer`} onClick={() => handleCategoryClick(i)}
              style={{ right: `${1.9 + 4 * i}rem` }}></div>
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
