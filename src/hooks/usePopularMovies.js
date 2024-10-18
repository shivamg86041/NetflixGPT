import { useDispatch, useSelector } from "react-redux";
import { Api_options } from "../utils/constants";
import { addNowPlayingMovies, addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector(store => store.movies.popularMovies);
  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular",
      Api_options
    );
    const json = await data.json();
    
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    if(popularMovies.length === 0)getPopularMovies();
  }, []);
};

export default usePopularMovies;
