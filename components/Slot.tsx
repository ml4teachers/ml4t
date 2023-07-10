import { useContext } from 'react';
import { UpdateContext } from './Perceptron';
import Number from './Number';


function Slot({ category, reversed, active }) {
  const { w1, w2, b, setW1, setW2, setB } = useContext(UpdateContext);
  let value, setValue;
  switch(category) {
    case 'w1':
      value = w1;
      setValue = setW1;
      break;
    case 'w2':
      value = w2;
      setValue = setW2;
      break;
    case 'b':
      value = b;
      setValue = setB;
      break;
    default:
      break;
  }

  const change = (delta) => {
    if (active && !(value + delta > 3 || value + delta < -3)) {
      setValue(value + delta);
    }
  }

  const offset = - value * 2;
  
  
  const numbers = Array.from({ length: 7 }, (_, i) => <Number value={i-3} current={value === i-3} key={i} />);

  return (
    <div className="px-4 flex flex-col items-center relative" style={{ transform: `translateY(${offset}rem)`, transition: 'transform 0.5s ease-in-out' }}>
      <div className="w-8 h-8 flex justify-center items-center bg-white border border-gray-300 text-white cursor-pointer" onClick={() => change(+1)}>
        <div className={`w-6 h-6 rounded-full text-center border border-gray-400 ${reversed ? 'bg-orange-300 text-3xl leading-4' : 'bg-blue-300 text-xl leading-5'}`}>{reversed ? '-' : '+'}</div>
      </div>
        {numbers}
      <div className="w-8 h-8 flex justify-center bg-white items-center border border-gray-300 text-white cursor-pointer" onClick={() => change(-1)}>
        <div className={`w-6 h-6 rounded-full text-center border border-gray-400 ${reversed ? 'bg-blue-300 text-xl leading-5' : 'bg-orange-300 text-3xl leading-4'}`}>{reversed ? '+' : '-'}</div>
      </div>
    </div>
  )
}

export default Slot;
