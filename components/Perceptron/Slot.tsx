import { useContext } from 'react';
import { UpdateContext } from '../Perceptron';
import Number from './Number';

function Slot({ category, reversed, active }) {
  const { weights, setWeights, b, setB, activeSlots } = useContext(UpdateContext);
  let value, setValue;
  
  if (category.startsWith('w')) {
    const index = parseInt(category.slice(1)) - 1;
    value = weights[index];
    setValue = (newValue) => {
      const newWeights = [...weights];
      newWeights[index] = newValue;
      setWeights(newWeights);
    };
  } else if (category === 'b') {
    value = b;
    setValue = setB;
  }

  const change = (delta) => {
    if (active && !(value + delta > 5 || value + delta < -5)) {
      setValue(value + delta);
    }
  }

  const offsetButtons = - Math.max(-2, Math.min(2, value)) * 2;
  const offsetNumbers = - value * 2;

  const numbers = Array.from({ length: 11 }, (_, i) => <Number value={i-5} current={value === i-5} key={i} />);

  return (
    <div className="px-4 flex flex-col items-center relative">
      <div className="w-full relative">
        <div style={{ transform: `translateY(${offsetNumbers}rem)`, transition: 'transform 0.5s ease-in-out' }}>
          {numbers}
        </div>
      </div>
      <div className="w-8 h-40 -mt-24 flex justify-center items-center bg-white text-white absolute" style={{ top: '0', transform: `translateY(${offsetButtons}rem)`, transition: 'transform 0.5s ease-in-out' }}>
        <div className="w-8 h-8 justify-center flex border border-gray-300 mt-32 items-center">
          <div title={reversed ? 'Bewertung verringern, indem Schwellenwert erhöht wird' : 'Gewichtung erhöhen'} className={`w-6 h-6 rounded-full text-center border border-gray-400 cursor-pointer ${reversed ? 'bg-orange-300 text-3xl leading-4' : 'bg-blue-300 text-xl leading-5'}`} onClick={() => change(+1)}>{reversed ? '-' : '+'}</div>
        </div>
      </div>
      <div className="w-8 h-40 -mb-24 flex justify-center bg-white items-center border-white text-white absolute" style={{ bottom: '0', transform: `translateY(${offsetButtons}rem)`, transition: 'transform 0.5s ease-in-out' }}>
        <div className="w-8 h-8 justify-center flex border border-gray-300 mb-32 items-center">
          <div title={reversed ? 'Bewertung erhöhen, indem Schwellenwert verringert wird' : 'Gewichtung verringern'} className={`w-6 h-6 rounded-full text-center border border-gray-400 cursor-pointer ${reversed ? 'bg-blue-300 text-xl leading-5' : 'bg-orange-300 text-3xl leading-4'}`} onClick={() => change(-1)}>{reversed ? '+' : '-'}</div>
        </div>
      </div>
    </div>
  )
}

export default Slot;
