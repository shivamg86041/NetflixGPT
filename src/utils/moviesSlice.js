import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: [],
    trailerVideo: [], // Initial state should be correctly defined
    popularMovies:[],
    upcomingMovies:[],
    topRatedMovies:[]
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo :(state, action) => {
      state.trailerVideo = action.payload;
    },
    addPopularMovies:(state, action) =>{
      state.popularMovies = action.payload;
    },
    addUpcomingMovies:(state, action) =>{
      state.upcomingMovies = action.payload;
    },
    addTopRatedMovies:(state, action) =>{
      state.topRatedMovies = action.payload;
    }
  },
});

export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies, addUpcomingMovies, addTopRatedMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
