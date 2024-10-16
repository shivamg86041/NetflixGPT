import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: [],
    trailerVideo: [] // Initial state should be correctly defined
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo :(state, action) => {
      state.trailerVideo = action.payload;
    }
  },
});

export const { addNowPlayingMovies, addTrailerVideo } = moviesSlice.actions;
export default moviesSlice.reducer;
