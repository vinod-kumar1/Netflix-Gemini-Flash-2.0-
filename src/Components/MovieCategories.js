import { useEffect, useRef, useState } from "react";
import { tmdbKeys } from "../tmdb";
import {
  setPlaying,
  setTypePageCount,
  setRequestedPaginationType,
  setPlayingMovieDetails,
} from "../utils/moviesPagination";
import { useDispatch } from "react-redux";
import { fetchMovieKey } from "../utils/fetch";

export function MovieCategoryList({ name, movies, type }) {
  let dispatch = useDispatch();
  let [loading, setLoading] = useState(false);

  function findMovieKeyAndSet(id) {
    fetchMovieKey(id)
      .then((res) => res.json())
      .then((json) => {
        dispatch(setPlaying(json.results[0]));
        window.scroll({
          top: 0,
          behavior: "smooth",
        });
      })
      .catch(console.log);
  }

  useEffect(() => {
    setLoading(false);
  }, [movies]);

  return (
    <div className="w-screen px-4 overflow-x-hidden mb-5">
      <h3 className="bg-gradient-to-r from-red-600 to-black/10 w-max px-2">
        {type}
      </h3>
      <div className="flex gap-4 mt-1 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {movies.map((movie, idx) => (
          <img
            key={movie.id + idx}
            className={`w-40 h-50 flex-shrink-0 rounded-sm transition-transform duration-300 hover:scale-110 object-cover hover:cursor-pointer`}
            onClick={() => {
              findMovieKeyAndSet(movie.id);
              dispatch(setPlayingMovieDetails(movie));
            }}
            src={`${tmdbKeys.photo_baseUrl + movie.poster_path}`}
            alt={movie.title}
          />
        ))}
        <button
          onClick={() => {
            setLoading(true);
            let temp = type.split(" ").join("_").toLowerCase();
            dispatch(
              setTypePageCount({
                type: temp,
              })
            );
            dispatch(setRequestedPaginationType(temp));
          }}
          className="font-mono text-2xl h-50 px-2 bg-red-500 text-white rounded-r-md hover:bg-white hover:text-red-500 cursor-pointer hover:border-[0.5px] mr-2"
        >
          {">"}
          {loading && <p class="animate-spin text-xl">🌀</p>}
        </button>
      </div>
    </div>
  );
}
