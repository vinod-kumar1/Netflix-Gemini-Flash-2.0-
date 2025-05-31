import { GoogleGenAI } from "@google/genai";
import { useEffect, useRef, useState } from "react";
import { tmdbKeys } from "../tmdb";
import { GeminiKey } from "../privateKey";
import { options } from "./MoviesPage";
import { useDispatch } from "react-redux";
import { setPlayingMovieDetails, setPlaying } from "../utils/moviesPagination";
import { fetchMovieKey } from "../utils/fetch";

const GptSearch = ({ setGpt }) => {
  let search = useRef("");
  let [error, setError] = useState({ exists: false, message: "" });
  let [movies, setMovies] = useState([]);
  let [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  useEffect(() => {
    if (search.current) {
      search.current.focus();
    }
  }, []);
  useEffect(() => {
    setLoading(false);
  }, [movies]);

  //   useEffect(() => {
  console.log(movies);
  //   }, [movies]);

  async function searchMovies() {
    try {
      if (search.current) {
        const ai = new GoogleGenAI({
          apiKey: GeminiKey.apiKey,
        });

        async function main() {
          let query = `Act as a movie recomendations tool. Give me the movies as per this query: ${search.current.value}. And only give the movie names in comma separated value. Example: Gadar, Kgf, Salaar, etc... . But make sure to respond with only the movie names`;

          const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: query,
          });
          console.log("ai ", response.text);
          let promiiseMovies = response.text.split(", ").map(async (movie) => {
            try {
              let fetchs = await fetch(
                `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
                options
              );

              let res = await fetchs.json();
              let movieData = res.results[0];
              console.log(movieData);
              return movieData;
            } catch (err) {
              setError({ exists: true, message: err.message });
            }
          });

          let res = await Promise.all(promiiseMovies);
          res = res.filter(Boolean);
          setMovies(res);
        }
        main();
      }
    } catch (err) {
      console.log(new Error(err));
    }
  }

  return (
    <div
      className={`*:-translate-y-40 absolute h-full justify-center gap-1 items-center top-0 flex w-screen bg-[url(${tmdbKeys.loginPageBgImg})]`}
    >
      <input
        type="text"
        ref={search}
        className="bg-white h-10 w-100 outline-red-500 outline-[1px] px-2 relative  shadow-[2px_5px_1px_red]"
        placeholder="GPT: Hey! What do you want to watch"
      />
      <button
        onClick={() => {
          setLoading(true);
          searchMovies();
        }}
        className="bg-white text-red-600 px-2 cursor-pointer h-10"
      >
        Search{" "}
        {loading && <p className="inline-block animate-spin size-xl">🌀</p>}
      </button>
      {movies.length && (
        <div className="flex flex-wrap absolute top-100 gap-2 bg-black w-screen px-5">
          {movies.map(
            (movie, idx) =>
              movie.poster_path && (
                <img
                  key={movie.id + idx}
                  className={`w-40 h-50 flex-shrink-0 hover:shadow-[2px_2px_2px_red] rounded-sm transition-transform duration-300 hover:scale-110 object-cover hover:cursor-pointer`}
                  onClick={() => {
                    fetchMovieKey(movie.id)
                      .then((res) => res.json())
                      .then((json) => {
                        dispatch(setPlayingMovieDetails(movie));
                        dispatch(setPlaying(json.results[0]));
                        setGpt(false);
                      })
                      .catch(console.log);
                  }}
                  src={`${tmdbKeys.photo_baseUrl + movie.poster_path}`}
                  alt={movie.title}
                />
              )
          )}
        </div>
      )}
    </div>
  );
};

export default GptSearch;
