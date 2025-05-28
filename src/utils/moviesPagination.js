import { createSlice } from "@reduxjs/toolkit";

let moviesPagination = createSlice({
  name: "Movies Pagination",
  initialState: {
    page: 1,
    movies: [],
  },
  reducers: {
    addPage: (state) => {
      state.page += 1;
    },
    addMovies: (state, action) => {
      // state.movies = [...state.movies, ...action.payload.movies];
      state.movies = [...state.movies, ...action.payload];
    },
  },
});

export default moviesPagination.reducer;
export let { addPage, addMovies } = moviesPagination.actions;
