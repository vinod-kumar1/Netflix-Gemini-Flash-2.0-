import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateMoviesType,
  setPlaying,
  setMuted,
  setPlayingMovieDetails,
} from "../utils/moviesPagination";
import { MovieCategoryList } from "./MovieCategories";
import { fetchMovieTypeList } from "../utils/fetch";
import { tmdbKeys } from "../tmdb";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${tmdbKeys.api_key}`,
  },
};

export default function MoviesPage() {
  const dispatch = useDispatch();
  const moviesType = useSelector((state) => state.moviesPagn.moviesType);
  const playing = useSelector((state) => state.moviesPagn.playing);
  const page = useSelector((state) => state.moviesPagn.typePageCount);
  const curType = useSelector(
    (state) => state.moviesPagn.requestedPaginationType
  );
  const muted = useSelector((state) => state.moviesPagn.muted);
  const movieDetails = useSelector(
    (state) => state.moviesPagn.playingMovieDetails
  );
  const [render, forceRender] = useState(true);

  const types = ["now_playing", "top_rated", "upcoming", "popular"];

  useEffect(() => {
    types.forEach((type) => {
      const url = `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${page[type]}`;
      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          if (!json.results || !json.results.length) return;

          const randomIndex = Math.floor(Math.random() * json.results.length);
          const movie = json.results[randomIndex];

          // If nothing is playing, set something
          if (!playing?.id) {
            fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
              options
            )
              .then((res) => res.json())
              .then((videoJson) => {
                dispatch(
                  setPlayingMovieDetails({
                    title: movie.title,
                    overview: movie.overview,
                  })
                );
                if (videoJson.results && videoJson.results.length) {
                  dispatch(setPlaying(videoJson.results[0]));
                }
              })
              .catch(console.error);
          }

          dispatch(updateMoviesType({ type, movies: json.results }));
        })
        .catch(console.error);
    });
  }, []);

  useEffect(() => {
    forceRender((prev) => !prev);
  }, [muted]);

  useEffect(() => {
    fetchMovieTypeList(curType, page[curType])
      .then((res) => res.json())
      .then((json) => {
        if (json.results) {
          dispatch(updateMoviesType({ type: curType, movies: json.results }));
        }
      })
      .catch(console.error);
  }, [page]);

  return (
    <div>
      <div className="movie-lists z-2 relative -top-10">
        <div className="">
          <div className="main-movie">
            {playing?.key ? (
              <>
                <iframe
                  allowFullScreen
                  className="-top-8 w-screen relative -translate-y-10 h-[650px]"
                  src={`https://www.youtube.com/embed/${playing.key}?origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&fs=1&autohide=1&color=red&loop=1&playlist=${playing.key}&controls=0&mute=${muted}&autoplay=1`}
                ></iframe>
                <img
                  className="absolute w-10 top-95 right-4 cursor-pointer"
                  onClick={() => dispatch(setMuted())}
                  src={muted == 1 ? tmdbKeys.muteIcon : tmdbKeys.unmuteIcon}
                  alt="volume icon"
                />
                {movieDetails?.name && (
                  <div className="text-white flex flex-wrap flex-col w-100 h-max z-10000 top-50 absolute">
                    <p className="text-2xl font-[monospace] w-max mb-4 px-4">
                      {movieDetails.name}
                    </p>
                    <p className="w-[100%] font-extralight">
                      {movieDetails.description?.slice(0, 150)}...
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-white text-center py-10">
                Loading trailer...
              </div>
            )}
          </div>

          <div className="movie-list-type py-2 translate-y-1 relative bottom-40 flex flex-col gap-4">
            {types.map((type) => (
              <MovieCategoryList
                key={type}
                movies={moviesType[type]}
                type={type.split("_").join(" ").toUpperCase()}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
