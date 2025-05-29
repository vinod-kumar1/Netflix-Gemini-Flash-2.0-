import { createSlice } from "@reduxjs/toolkit";

const moviesPagination = createSlice({
  name: "Movies Pagination",
  initialState: {
    totalPages: 0,
    movies: [],
    moviesType: {
      popular: [],
      top_rated: [],
      now_playing: [],
      upcoming: [],
    },
    playing: {},
    typePageCount: {
      popular: 1,
      top_rated: 1,
      now_playing: 1,
      upcoming: 1,
    },
    requestedPaginationType: "",
    muted: 1,
  },
  reducers: {
    addMovies: (state, action) => {
      state.movies.push(...action.payload);
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    updateMoviesType: (state, action) => {
      const { type, movies } = action.payload;
      if (state.moviesType[type] && Array.isArray(movies)) {
        state.moviesType[type].push(...movies);
      }
    },
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
    setTypePageCount: (state, action) => {
      const type = action.payload.type;
      if (type in state.typePageCount) {
        state.typePageCount[type] += 1;
      }
    },
    setRequestedPaginationType: (state, action) => {
      state.requestedPaginationType = action.payload;
    },
    setMuted: (state) => {
      state.muted = state.muted == 0 ? 1 : 0;
    },
  },
});

export default moviesPagination.reducer;
export let {
  addMovies,
  setTotalPages,
  updateMoviesType,
  setPlaying,
  setTypePageCount,
  setRequestedPaginationType,
  setMuted,
} = moviesPagination.actions;
