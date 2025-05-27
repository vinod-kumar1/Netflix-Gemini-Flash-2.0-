import { useEffect, useRef, useState } from "react";
import { tmdbKeys } from "../tmdb";
import { findAndSetMainMovie } from "./MoviesPage";

function MovieCategoryList({ name, moviesList, setPopUpModel }) {
  return (
    <div className="w-screen z-99">
      <h3>{name}</h3>
      <div className="flex px-1 gap-4 mt-1 *:hover:cursor-pointer overflow-x-scroll *:hover:bg-cover">
        {moviesList.map((movie) => {
          return (
            <img
              className="relative w-80 hover:scale-125 h-50 rounded-sm transition-all duration-40"
              onClick={() => findAndSetMainMovie(movie, setPopUpModel)}
              src={`${tmdbKeys.photo_baseUrl + movie.poster_path}`}
              alt={movie.title}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function MovieCategories({ movies }) {
  let [categories, setCategories] = useState({ morePopular: [], popular: [] });
  let [popupModel, setPopUpModel] = useState({});
  let model = useRef();

  useEffect(() => {
    let popularityLessThan20 = movies.filter((movie) => movie.popularity <= 20);
    let popularityMorethan20 = movies.filter((movie) => movie.popularity > 20);
    setCategories({
      morePopular: popularityMorethan20,
      popular: popularityLessThan20,
    });
  }, []);

  return (
    <div>
      {popupModel.key && (
        <div className="absolute z-99 top-20">
          <dialog open ref={model}>
            <iframe
              allowFullScreen={true}
              className="top-10 w-screen -translate-y-10 h-[600px]"
              src={`https://www.youtube.com/embed/${popupModel.key}?autoplay=0&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&fs=1&autohide=1&mute=1&color=red&loop=1&playlist=${popupModel.key}`}
            ></iframe>
            <button
              onClick={() => {
                model.current.close();
                setPopUpModel({});
              }}
              className="text-2xl"
            >
              X
            </button>
          </dialog>
        </div>
      )}
      <MovieCategoryList
        setPopUpModel={setPopUpModel}
        name={"Popular Movies"}
        moviesList={categories.morePopular}
      />
      <MovieCategoryList
        setPopUpModel={setPopUpModel}
        name={"Silver Movies"}
        moviesList={categories.popular}
      />
    </div>
  );
}
