import { useState, useEffect } from 'react';
import Slot from './unplugged/Slot';
import Overlay from './unplugged/Overlay';
import Card from './unplugged/Card';
import useMovies from './Perceptron/useMovies';

function Unplugged() {
  const [perceptrons, setPerceptrons] = useState(1);
  const [slots, setSlots] = useState(2);
  const [sets, setSets] = useState(1);
  const [cards, setCards] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);
  const reversedSlots = new Array(perceptrons).fill(0);
  const normalSlots = new Array(perceptrons*slots).fill(0);
  
  const { generateCards } = useMovies();
  const allSelectedMovies = generateCards(slots, perceptrons + cards);


  useEffect(() => {
    if (isPrinting) {
      window.print();
      setIsPrinting(false);
    }
  }, [isPrinting]);

  return (
    <div className="flex-col">
      {!isPrinting &&
      <div>
        <form className="mb-4 w-60">
          <div className="mb-2">
            <label className="flex">
              <div className="mr-2 flex-1">
                Anzahl Perzeptronkarten
              </div>
              <div className="border-2 rounded-md pl-2">
                <input type="number" min="0" max="8" value={perceptrons} onChange={(e) => setPerceptrons(parseInt(e.target.value, 10))} />
              </div>
            </label>
          </div>
          <div className="mb-2">
            <label className="flex">
              <div className="mr-2 flex-1">
                Anzahl Klassen (Genres)
              </div>
              <div className="border-2 rounded-md pl-2">
                <input type="number" min="1" max="3" value={slots} onChange={(e) => setSlots(parseInt(e.target.value, 10))} />
              </div>
            </label>
          </div>
          <div className="mb-2">
            <label className="flex">
              <div className="mr-2 flex-1">
                Zusätzliche Filmkarten
              </div>
              <div className="border-2 rounded-md pl-2">
                <input type="number" min="0" max="8" value={cards} onChange={(e) => setCards(parseInt(e.target.value, 10))} />
              </div>
            </label>
          </div>
          <div className="border-2 rounded-md w-24 text-center bg-gray-50 hover:bg-gray-200">
            <button type="button" className="p-2 px-4" onClick={() => setIsPrinting(true)}>Drucken</button>
          </div>
        </form>
      </div>}
      <div className="flex flex-wrap w-[600px]">
        <div className={`flex flex-wrap ${((perceptrons + cards)*slots > 8 ) ? 'break-after-page' : ''}`}>
            {allSelectedMovies.map((selectedMovies, k) => 
              selectedMovies.length > 0 && selectedMovies.map((movie, i) => 
                <Card key={`${k}-${i}`} selectedMovie={movie} classes={slots} />
              )
            )}
        </div>
        <div className="flex flex-wrap">
          {Array.from({ length: perceptrons }, (_, i) => <Overlay key={i} classes={slots} />)}
        </div>
        <div className="flex flex-wrap">
          {normalSlots.map((_, i) => <Slot reversed={undefined} key={i} />)}
        </div>
        <div className="flex flex-wrap">
          {reversedSlots.map((_, i) => <Slot reversed key={i} />)}
        </div>
      </div>
    </div>
  );
}

export default Unplugged;
