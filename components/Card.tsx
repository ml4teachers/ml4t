import { useContext, useEffect, useState } from 'react';
import { UpdateContext } from './Perceptron';

function Card() {
  const { selectedMovie, setSelectedMovie, changeMovieCategory } = useContext(UpdateContext);
  const [movieCategories, setMovieCategories] = useState({cat1: selectedMovie?.cat1, cat2: selectedMovie?.cat2});

  const handleCardClick = () => {
    setSelectedMovie(null);
  };

  const handleCategoryClick = (category) => {
    changeMovieCategory(selectedMovie.title, category);
    setMovieCategories(prev => ({...prev, [category === 1 ? 'cat1' : 'cat2']: prev[category === 1 ? 'cat1' : 'cat2'] ? 0 : 1}));
  };

  useEffect(() => {
    if (selectedMovie) {
      setMovieCategories({cat1: selectedMovie.cat1, cat2: selectedMovie.cat2});
    }
  }, [selectedMovie]);

  if (!selectedMovie) return null;

  const colorClass = selectedMovie?.like ? 'bg-blue-100' : 'bg-orange-100';

  return (
    <div className={`z-30 absolute w-36 mr-12 h-24 border-2 border-gray-400 rounded-md`}>
      <div className="relative h-full">
        <div className={`absolute top-0 left-0 w-full h-[30px] rounded-t-md ${colorClass} cursor-pointer`} onClick={() => handleCardClick()}>
          <div className="text-center text-sm mt-2">{selectedMovie.title}</div>
        </div>
        <div className={`absolute top-7 left-0 w-3.5 h-10 ${colorClass}`}></div>
        <div className={`absolute top-7 left-3.5 w-8 h-10 rounded-sm text-lg leading-9 indent-3 text-gray-600 ${movieCategories.cat1 ? 'hidden' : ''} ${colorClass}`}>0</div>
        <div className={`absolute top-7 ml-1.5 left-10 w-8 h-10 rounded-sm text-2xl leading-8 text-center ${colorClass} text-gray-600`}>+</div>
        <div className={`absolute top-7 ml-3.5 left-16 w-8 h-10 rounded-sm text-lg leading-9 indent-2.5 text-gray-600 ${movieCategories.cat2 ? 'hidden' : ''} ${colorClass}`}>0</div>
        <div className={`absolute top-7 ml-3.5 left-24 h-10 rounded-sm text-2xl leading-8 text-center ${colorClass} text-gray-600`} style={{width: '30px'}}>{'>'}</div>
        <div className={`absolute flex bottom-0 left-0 w-full h-[30px] rounded-b-md ${colorClass}`}>
          <div className={`flex-auto text-xs mt-1 ml-3 ${movieCategories.cat1 ? '' : 'line-through text-gray-400'}`}>Action</div>
          <div className={`text-xs text-right mr-5 mt-1 ${movieCategories.cat2 ? '' : 'line-through text-gray-400'}`}>Comedy</div>
        </div>
        <div className={`z-40 absolute top-7 left-3.5 w-8 h-16 cursor-pointer`} onClick={() => handleCategoryClick(1)}></div>
        <div className={`z-40 absolute top-7 left-20 w-8 h-16 cursor-pointer`} onClick={() => handleCategoryClick(2)}></div>
      </div>
    </div>
  );
}

export default Card;
