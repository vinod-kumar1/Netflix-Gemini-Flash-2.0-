import { useEffect, useState, useRef } from "react";
import { tmdbKeys } from "../tmdb";
import MovieCategories from "./MovieCategories";
import { useSelector } from "react-redux";
import { addPage, addMovies, setTotalPages } from "../utils/moviesPagination";
import { useDispatch } from "react-redux";
import Volume from "./Volume";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${tmdbKeys.api_key}`,
  },
};

function findAndSetMainMovie(movie, setMainMovie) {
  const url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`;

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      let trailerMovie = Array.from(json.results).filter(
        (obj) => obj.type == "Trailer"
      )[0];
      setMainMovie(trailerMovie);
    })
    .catch((err) => console.error(err));
}

export default function MoviesPage() {
  let [movieListType, setMovieListType] = useState("top_rated");
  let [mainMovie, setMainMovie] = useState({});
  let page = useSelector((state) => state.moviesPagn.page);
  let details = useRef();
  let dispatch = useDispatch();

  if (details.current) details.current.removeAttribute("open");
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieListType}?language=en-US&page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${tmdbKeys.api_key}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json);
        let randomMovie = Math.ceil(Math.random() * json.results.length - 2);
        dispatch(addMovies(json.results));
        findAndSetMainMovie(json.results[randomMovie], setMainMovie);
        dispatch(setTotalPages(json.total_pages));
      })
      .catch((err) => console.error(err));
  }, [movieListType, page]);

  return (
    <div>
      <div className="movie-lists">
        <details
          ref={details}
          className="*:bg-red *:hover:underline *:hover:text-white *:hover:cursor-pointer bg-red-500 w-[100%] py-2 z-20 px-2 ease-in-out"
        >
          <summary>{movieListType.split("_").join(" ").toUpperCase()}</summary>
          <option
            onClick={() => setMovieListType("top_rated")}
            value="top_rated"
          >
            Top Rated
          </option>
          <option value="popular" onClick={() => setMovieListType("popular")}>
            Popular
          </option>
          <option
            value="Now Trending"
            onClick={() => setMovieListType("now_playing")}
          >
            Now Trending
          </option>
          <option
            value="Up Coming"
            onClick={() => setMovieListType("upcoming")}
          >
            Up Coming
          </option>
        </details>

        <div className="">
          <div className="main-movie">
            {mainMovie?.id && (
              <iframe
                allowFullScreen={true}
                className="top-10 w-screen relative -translate-y-10 h-[600px]"
                src={`https://www.youtube.com/embed/${mainMovie.key}?autoplay=0&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&fs=1&autohide=1&&color=red&loop=1&playlist=${mainMovie.key}&controls=0&mute=1`}
              ></iframe>
            )}
          </div>
          <MovieCategories />
        </div>
      </div>
    </div>
  );
}

export { findAndSetMainMovie };

{
  /* <img
  className="z-99 w-12 absolute bottom-5 left-2"
  src="https://images.icon-icons.com/1146/PNG/96/1486485571-198high-loud-music-on-sound-speaker-volume_81180.png"
  alt=""
/>; */
}
