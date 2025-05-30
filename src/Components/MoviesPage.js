import { useEffect, useState } from "react";
import { tmdbKeys } from "../tmdb";
import { useSelector } from "react-redux";
import {
  updateMoviesType,
  setPlaying,
  setMuted,
  setPlayingMovieDetails,
} from "../utils/moviesPagination";
import { useDispatch } from "react-redux";
import { MovieCategoryList } from "./MovieCategories";
import { fetchMovieTypeList } from "../utils/fetch";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${tmdbKeys.api_key}`,
  },
};

export default function MoviesPage() {
  let moviesType = useSelector((state) => state.moviesPagn.moviesType);
  let playing = useSelector((state) => state.moviesPagn.playing);
  let page = useSelector((state) => state.moviesPagn.typePageCount);
  let curType = useSelector(
    (state) => state.moviesPagn.requestedPaginationType
  );
  let muted = useSelector((state) => state.moviesPagn.muted);
  let movieDetails = useSelector(
    (state) => state.moviesPagn.playingMovieDetails
  );

  let [render, forceRender] = useState(true);
  let dispatch = useDispatch();
  let types = ["now_playing", "top_rated", "upcoming", "popular"];

  console.log("page", movieDetails);
  useEffect(() => {
    types.forEach((type) => {
      const url = `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${page[type]}`;
      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          let randomMovie = Math.ceil(Math.random() * json.results.length - 2);
          let movie = json.results[randomMovie];
          if (!playing.id) {
            fetch(
              `https://api.themoviedb.org/3/movie/${json.results[randomMovie].id}/videos?language=en-US`,
              options
            )
              .then((res) => res.json())
              .then((json) => {
                console.log("tra", movie);
                dispatch(
                  setPlayingMovieDetails({
                    title: movie.title,
                    overview: movie.overview,
                  })
                );
                dispatch(setPlaying(json.results[0]));
              })
              .catch(console.log);
          }
          // console.log("random", json.results[randomMovie]);
          dispatch(updateMoviesType({ type: type, movies: json.results }));
        })
        .catch((err) => console.error(err));
    });
  }, []);

  useEffect(() => {
    forceRender((p) => !p);
  }, [muted]);

  useEffect(() => {
    fetchMovieTypeList(curType, page[curType])
      .then((res) => res.json())
      .then((json) => {
        dispatch(updateMoviesType({ type: curType, movies: json.results }));
      })
      .catch((err) => console.error(err));
  }, [page]);

  return (
    <div>
      <div className="movie-lists z-2 relative -top-10">
        <div className="">
          <div className="main-movie">
            {playing?.id && (
              <>
                <iframe
                  allowFullScreen={true}
                  className="-top-8 w-screen relative -translate-y-10 h-[650px]"
                  src={`https://www.youtube.com/embed/${playing.key}?origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&fs=1&autohide=1&&color=red&loop=1&playlist=${playing.key}&controls=0&mute=${muted}&autoplay=0`}
                ></iframe>
                <img
                  className="absolute z-999  w-10 top-95 right-4 cursor-pointer"
                  onClick={() => dispatch(setMuted())}
                  src={
                    muted == 1
                      ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23ef4444' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5'/%3E%3Cline x1='22' y1='9' x2='16' y2='15'/%3E%3Cline x1='16' y1='9' x2='22' y2='15'/%3E%3C/svg%3E"
                      : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23ef4444' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5'/%3E%3Cpath d='M15.54 8.46a5 5 0 0 1 0 7.07'/%3E%3Cpath d='M19.07 4.93a10 10 0 0 1 0 14.14'/%3E%3C/svg%3E"
                  }
                  alt="volume icon"
                />
                {movieDetails.name && (
                  <div className="text-white flex flex-wrap flex-col w-100 bg-gradient-to-r from-black to-transparent z-10000 top-50 h-[100%] absolute">
                    <p className="text-2xl font-[monospace] w-max mb-4 px-4">
                      {movieDetails.name}
                    </p>
                    <p className="w-[100%] font-extralight">
                      {movieDetails.description.slice(0, 150)}...
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="movie-list-type py-2 translate-y-1 relative bottom-40 flex flex-col gap-4">
            {moviesType?.top_rated.length ? (
              <div>
                {types.map((type) => {
                  return (
                    <MovieCategoryList
                      movies={moviesType[type]}
                      type={type.split("_").join(" ").toUpperCase()}
                    />
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
