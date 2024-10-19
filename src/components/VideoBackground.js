import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  useMovieTrailer({movieId});

  const trailer = useSelector((store) => store.movies?.trailerVideo);

  return (
    <div className="top-0 left-0 w-full h-full">
      <iframe
      className="w-full pointer-events-none h-full aspect-video"
        src={"https://www.youtube.com/embed/" + trailer[0]?.key + "?autoplay=1&mute=1&controls=0&loop=1&rel=0"}
        title="YouTube video player"
        allow=" autoplay; clipboard-write; encrypted-media; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
