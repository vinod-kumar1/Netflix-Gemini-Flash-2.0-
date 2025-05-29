import { options } from "../Components/MoviesPage";

export function fetchMovieTypeList(type, page) {
  const url = `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${page}`;
  return fetch(url, options);
}

export function fetchMovieKey(id) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    options
  );
}
