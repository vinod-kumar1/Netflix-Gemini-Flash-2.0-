import { useEffect, useRef, useState } from "react";
import { tmdbKeys } from "../tmdb";
import { findAndSetMainMovie } from "./MoviesPage";

function MovieCategoryList({ name, moviesList, setPopUpModel }) {
  return (
    <div className="w-[80%] z-99 bg-red-500 px-4 h-[40%] py-4">
      <h3>{name} </h3>
      <div className="flex px-1 gap-4 mt-1 *:hover:cursor-pointer overflow-y-hidden overflow-x-scroll *:hover:bg-cover">
        {moviesList.map((movie) => {
          return (
            <img
              className="relative w-80 hover:bg-cover hover:scale-120 h-50 rounded-sm transition-all duration-400"
              onClick={() => findAndSetMainMovie(movie, setPopUpModel)}
              src={`${tmdbKeys.photo_baseUrl + movie.poster_path}`}
              alt={movie.title}
            />
          );
        })}
        <button className=" px-4 text-2xl hover:bg-gray-200 hover:rounded-r-2xl ">
          {">"}
        </button>
      </div>
    </div>
  );
}

export default function MovieCategories({ movies, type }) {
  let [categories, setCategories] = useState({ morePopular: [], popular: [] });
  let [popupModel, setPopUpModel] = useState({});
  let model = useRef();
  let popUpMovie = useRef();

  useEffect(() => {
    console.log(movies);
    let popularityLessThan20 = movies.filter((movie) => movie.popularity <= 20);
    let popularityMorethan20 = movies.filter((movie) => movie.popularity > 20);
    setCategories({
      morePopular: popularityMorethan20,
      popular: popularityLessThan20,
    });

    return () => setCategories({});
  }, []);
  useEffect(() => {
    if (popUpMovie.current) {
      window.scroll({ top: 10, behavior: "smooth" });
    }
  }, [popupModel]);

  return (
    <div className="transition-all duration-500">
      {popupModel.key && (
        <div className="absolute z-99 top-20">
          <dialog open ref={model}>
            <iframe
              ref={popUpMovie}
              allowFullScreen={true}
              className="top-10 w-screen relative h-[600px]"
              src={`https://www.youtube.com/embed/${popupModel.key}?autoplay=0&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&fs=1&autohide=1&mute=1&color=red&loop=1&playlist=${popupModel.key}`}
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
      <div className="gap-2 *:rounded-4xl flex flex-col items-center mt-4">
        <MovieCategoryList
          setPopUpModel={setPopUpModel}
          type={type}
          name={"Popular Movies"}
          moviesList={categories.morePopular}
        />
        <MovieCategoryList
          type={type}
          setPopUpModel={setPopUpModel}
          name={"Silver Movies"}
          moviesList={categories.popular}
        />
      </div>
    </div>
  );
}
