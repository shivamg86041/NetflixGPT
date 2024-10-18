import { useDispatch, useSelector } from "react-redux";
import { MovieVideoOptions } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = ({ movieId }) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector(
    (store) => store.movies.trailerVideo
  );

  const getMoviesVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      MovieVideoOptions
    );
    const json = await data.json();

    let trailer = json.results.filter(
      (video) => video.name === "Official Trailer"
    );

    if (!trailer) {
      trailer = json.results[0];
    }
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    if (trailerVideo.length === 0) getMoviesVideos();
  }, []);
};

export default useMovieTrailer;
