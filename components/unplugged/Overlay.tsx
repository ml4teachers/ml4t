import { genres } from "../data/genres.js";

const Overlay = ({ classes }) => {
  const overlayWidth = 4 * classes + 10;

  return (
    <div className="z-10 h-24 border border-gray-400" style={{ width: `${overlayWidth}rem` }}>
      <div className="relative h-full">
        <div className="absolute z-20 right-0 bg-gradient-to-r from-white to-blue-200 w-24 h-12">
          <div className="absolute top-2 left-1">Like</div>
          <div className="absolute z-20 top-2 right-2 w-6 h-6 bg-blue-300 rounded-full text-2xl border border-gray-400 text-white leading-4 text-center">+</div>
        </div>
        <div className="absolute bottom-0 z-20 right-0 bg-gradient-to-r from-white to-orange-200 w-24 h-12 rounded-b-sm">
          <div className="absolute top-3 left-1">Dislike</div>
          <div className="absolute z-20 bottom-3 right-2 w-6 h-6 bg-orange-300 rounded-full text-3xl border border-gray-400 text-white leading-4 text-center">-</div>
        </div>
          {
            Array.from({ length: classes+1 }, (_, i) => (
            <div className="flex">
                <div className="h-8 mt-[30px] w-8 border border-gray-400 absolute"
                style={{ right: `${6.9 + 4 * i}rem` }}></div>
            </div>
            ))
          }
          {
            Array.from({ length: classes }, (_, i) => (
            <div 
                key={i}
                className="absolute top-7 w-8 h-8  text-2xl leading-8 text-center text-gray-600"
                style={{ right: `${8.9 + 4 * i}rem` }}
            >
                { i === 0 ? '>' : '+' }
            </div>
            ))
          }
        <div className="flex absolute bottom-0 w-full h-[30px]">
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
