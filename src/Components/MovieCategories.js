import { useEffect, useRef, useState } from "react";
import { tmdbKeys } from "../tmdb";
import { findAndSetMainMovie } from "./MoviesPage";
import { addPage } from "../utils/moviesPagination";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function MovieCategoryList({ name, moviesList, setPopUpModel }) {
  return (
    <div className="w-[900px]  mb-2 bg-red-500 px-4 py-4 overflow-x-hidden">
      <h3>{name}</h3>
      <div className="flex gap-2 mt-1 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {moviesList.map((movie) => (
          <img
            key={movie.id}
            className="w-40 h-50 flex-shrink-0 rounded-sm transition-transform duration-300 hover:scale-110 hover:cursor-pointer"
            onClick={() => findAndSetMainMovie(movie, setPopUpModel)}
            src={`${tmdbKeys.photo_baseUrl + movie.poster_path}`}
            alt={movie.title}
          />
        ))}
        <abbr
          title="Click the button on right to load more movies"
          className="text-4xl bg-white p-2 h-max rounded-xl relative top-15 no-underline flex-shrink-0"
        >
          ⛳️
        </abbr>
      </div>
    </div>
  );
}

export default function MovieCategories() {
  let [categories, setCategories] = useState({ morePopular: [], popular: [] });
  let [popupModel, setPopUpModel] = useState({});
  let model = useRef();
  let popUpMovie = useRef();
  let movies = useSelector((state) => state.moviesPagn.movies);
  let page = useSelector((state) => state.moviesPagn.page);
  let pages = useSelector((state) => state.moviesPagn.totalPages);
  let dispatch = useDispatch();

  useEffect(() => {
    let popularityLessThan20 = movies.filter((movie) => movie.popularity <= 20);
    let popularityMorethan20 = movies.filter((movie) => movie.popularity > 20);
    setCategories({
      morePopular: popularityMorethan20,
      popular: popularityLessThan20,
    });

    return () => setCategories({});
  }, [movies]);

  useEffect(() => {
    if (popUpMovie.current) {
      window.scroll({ top: 80, behavior: "smooth" });
    }
  }, [popupModel]);

  return (
    <div className="transition-all duration-500">
      {popupModel.key && (
        <div className="absolute top-0" key={`${popupModel.key}-main`}>
          <dialog open ref={model}>
            <iframe
              ref={popUpMovie}
              allowFullScreen={true}
              className="w-screen relative h-screen z-99"
              src={`https://www.youtube.com/embed/${popupModel.key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&fs=1&autohide=1&mute=1&color=red&loop=1&playlist=${popupModel.key}`}
            ></iframe>
            <button
              onClick={() => {
                model.current.close();
                setPopUpModel({});
              }}
              className="text-2xl text-white z-199 absolute bg-red-500 right-4 top-25 cursor-pointer rounded-[100px] rotate-90 p-3 hover:bg-white hover:text-red-500 hover:shadow-[2px_0px_10px_white]"
            >
              <abbr title="close" className="no-underline">
                X
              </abbr>
            </button>
          </dialog>
        </div>
      )}
      <div className="flex">
        <div className="*:rounded-4xl flex flex-col w-screen items-center mt-4">
          <MovieCategoryList
            setPopUpModel={setPopUpModel}
            name={"Popular Movies"}
            moviesList={categories.morePopular}
          />
          <p>
            Total Pages : {page} / {pages}
          </p>
          <MovieCategoryList
            setPopUpModel={setPopUpModel}
            name={"Silver Movies"}
            moviesList={categories.popular}
          />
        </div>
        <button
          disabled={page >= pages}
          onClick={() => dispatch(addPage())}
          className="bg-red-500 h-max translate-y-15 -translate-x-20 py-2 px-2 rounded-r-lg w-max text-white hover:bg-white hover:text-red-500 hover:border-red-500 hover:border-[0.5px] cursor-pointer"
        >
          {[..."Load More Movies"].map((char, i) =>
            char == " " ? (
              <br key={i} />
            ) : (
              <p key={i} className="px-2">
                {char}
              </p>
            )
          )}
        </button>
      </div>
    </div>
  );
}
