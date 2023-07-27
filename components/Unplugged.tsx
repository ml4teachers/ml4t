import { useState, useEffect } from 'react';
import Slot from './unplugged/Slot';
import Overlay from './unplugged/Overlay';
import Card from './unplugged/Card';
import useMovies from './Perceptron/useMovies';
import Link from 'next/link';

function Unplugged() {
  const [perceptrons, setPerceptrons] = useState(1);
  const [slots, setSlots] = useState(2);
  const [sets, setSets] = useState(1);
  const [cards, setCards] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);
  const reversedSlots = new Array(perceptrons).fill(0);
  const normalSlots = new Array(perceptrons*slots).fill(0);
  
  const { generateCards } = useMovies(0, 100);
  const allSelectedMovies = generateCards(slots, perceptrons + cards);


  useEffect(() => {
    if (isPrinting) {
      window.print();
      setIsPrinting(false);
    }
  }, [isPrinting]);

  return (
    <div className="flex justify-center">
    <div className="flex-col">
      {!isPrinting &&
      <div>
        <div className="flex mt-8 text-gray-900 text-4xl font-bold">Unplugged Perzeptron</div>
        <div className="flex flex-col md:flex-row my-8">
          <div className="mb-4 md:mb-0 md:mr-12">
            Für die Durchführung der Übung <Link className="font-bold hover:underline hover:text-black" href="/movie-recommender/features">Movie Recommender</Link> ohne Computer steht die folgende Druckvorlage zur Verfügung. Es ist empfehlenswert, für jede Tandem-Gruppe eine Perzeptronkarte auszudrucken. Als Einstieg kann es hilfreich sein, zunächst ein Set mit nur einem Genre zu drucken. Je nach Bedarf können zusätzliche Filmkarten ausgedruckt werden.
          </div>
          <div>
            <img src="/PerceptronUnplugged.png" alt="Perzeptron" className="w-2/3 md:w-auto md:max-w-md" />
          </div>
        </div>
        <form className="mb-4 w-72">
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
                Anzahl Merkmale (Genres)
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
          <div className="border-2 rounded-md w-24 text-center bg-gray-50 hover:bg-gray-200 my-12">
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
    </div>
  );
}

export default Unplugged;
