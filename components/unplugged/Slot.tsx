import Number from '../Perceptron/Number';

function Slot({ reversed }) {
  let value, setValue;

  const numbers = Array.from({ length: 7 }, (_, i) => <Number value={i-3} current={value === i-5} key={i} />);

  return (
    <div className="flex flex-col items-center border border-gray-400">
        <div className="w-8 h-8 justify-center flex items-center">
          <div className={`w-6 h-6 rounded-full text-center text-white border border-gray-400
          ${reversed ? 'bg-orange-300 text-3xl leading-4' : 'bg-blue-300 text-xl leading-5'}`}
          >{reversed ? '-' : '+'}</div>
      </div>
      <div className="w-full">
          {numbers}
      </div>
        <div className="w-8 h-8 justify-center flex items-center">
          <div className={`w-6 h-6 rounded-full text-center text-white border border-gray-400
          ${reversed ? 'bg-blue-300 text-xl leading-5' : 'bg-orange-300 text-3xl leading-4'}`} 
          >{reversed ? '+' : '-'}</div>
      </div>
    </div>
  )
}

export default Slot;
