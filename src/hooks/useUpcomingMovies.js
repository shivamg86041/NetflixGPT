import { useDispatch, useSelector } from "react-redux";
import { Api_options } from "../utils/constants";
import {
  addNowPlayingMovies,
  addPopularMovies,
  addUpcomingMovies,
} from "../utils/moviesSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);
  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming",
      Api_options
    );
    const json = await data.json();

    dispatch(addUpcomingMovies(json.results));
  };

  useEffect(() => {
    if (upcomingMovies.length === 0) getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
