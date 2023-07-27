import { useState, useEffect } from "react";
import Draggable from "react-draggable";

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [topMost, setTopMost] = useState(null);

  const selectMovies = (movies) => {
    const actionMovies = getRandom(
      movies.filter(
        (movie) =>
          movie.genres.includes("Action") && !movie.genres.includes("Comedy")
      ),
      3
    );
    const comedyMovies = getRandom(
      movies.filter(
        (movie) =>
          movie.genres.includes("Comedy") && !movie.genres.includes("Action")
      ),
      3
    );
    const actionComedyMovies = getRandom(
      movies.filter(
        (movie) =>
          movie.genres.includes("Action") && movie.genres.includes("Comedy")
      ),
      3
    );
    const neitherMovies = getRandom(
      movies.filter(
        (movie) =>
          !movie.genres.includes("Action") && !movie.genres.includes("Comedy")
      ),
      3
    );

    return shuffle([
      ...actionMovies,
      ...comedyMovies,
      ...actionComedyMovies,
      ...neitherMovies,
    ]);
  };

  function getRandom(arr, n) {
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      const x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  useEffect(() => {
    fetch("/movielist.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedMovies = selectMovies(data);
        setMovies(selectedMovies);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="my-8 w-full flex flex-wrap justify-center">
      <div className="flex flex-wrap w-80">
        {movies.map((movie, index) => {
          return (
            <Draggable key={movie.id} onStart={() => setTopMost(movie.id)}>
              <div
                className="stackable"
                style={{
                  zIndex: movie.id === topMost ? movies.length + 1 : index,
                }}
              >
                <img
                  draggable="false"
                  className="rounded-md shadow-md w-16 m-2 cursor-pointer"
                  src={movie.poster}
                  alt={movie.title}
                />
              </div>
            </Draggable>
          );
        })}
      </div>
      <div className="-z-10 flex flex-2">
        <div className="flex w-0">
          <div className="-rotate-90 absolute mt-20">
            <p>Comedy</p>
          </div>
          <div className="-rotate-90 absolute mt-52">
            <p className="line-through">Comedy</p>
          </div>
        </div>
        <div className="flex w-80 h-80 justify-around items-center">
          <div className="grid grid-rows-2 grid-cols-2 h-72 w-72 ml-12 border border-gray-500">
            <div className="border border-gray-500 w-full h-full"></div>
            <div className="border border-gray-500 w-full h-full"></div>
            <div className="border border-gray-500 w-full h-full relative">
              <p className="absolute -bottom-6 w-full text-center line-through">
                Action
              </p>
            </div>
            <div className="border border-gray-500 w-full h-full relative">
              <p className="absolute -bottom-6 w-full text-center">Action</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieGrid;
