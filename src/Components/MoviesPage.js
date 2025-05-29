import { useEffect } from "react";
import { tmdbKeys } from "../tmdb";
import { useSelector } from "react-redux";
import {
  updateMoviesType,
  setPlaying,
  setRequestedPaginationType,
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

function findAndSetMainMovie(movie) {
  const url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`;

  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      let trailerMovie = Array.from(json.results).filter(
        (obj) => obj.type == "Trailer"
      )[0];
      return trailerMovie;
    })
    .catch((err) => console.error(err));
}

export default function MoviesPage() {
  // let [movieListType, setMovieListType] = useState("top_rated");
  let moviesType = useSelector((state) => state.moviesPagn.moviesType);
  let playing = useSelector((state) => state.moviesPagn.playing);
  let page = useSelector((state) => state.moviesPagn.typePageCount);
  let curType = useSelector(
    (state) => state.moviesPagn.requestedPaginationType
  );
  let dispatch = useDispatch();
  let types = ["now_playing", "top_rated", "upcoming", "popular"];

  console.log("page", page);
  useEffect(() => {
    types.forEach((type) => {
      const url = `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${page[type]}`;
      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          let randomMovie = Math.ceil(Math.random() * json.results.length - 2);
          if (!playing.id) {
            fetch(
              `https://api.themoviedb.org/3/movie/${json.results[randomMovie].id}/videos?language=en-US`,
              options
            )
              .then((res) => res.json())
              .then((json) => {
                console.log("trailer", json);
                dispatch(setPlaying(json.results[0]));
              })
              .catch(console.log);
          }
          dispatch(updateMoviesType({ type: type, movies: json.results }));
        })
        .catch((err) => console.error(err));
    });
  }, []);

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
      <div className="movie-lists z-2">
        <div className="">
          <div className="main-movie">
            {playing?.id && (
              <iframe
                allowFullScreen={true}
                className="-top-8 w-screen relative -translate-y-10 h-[650px]"
                src={`https://www.youtube.com/embed/${playing.key}?autoplay=0&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&fs=1&autohide=1&&color=red&loop=1&playlist=${playing.key}&controls=0&mute=1`}
              ></iframe>
            )}
          </div>
          <div className="movie-list-type py-2 translate-y-1 bg-gradient-to-r from-black to-red-600 to-100% relative bottom-40 text-white flex flex-col gap-4">
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

export { findAndSetMainMovie };
