import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import openAI from "../utils/openai";
import { Api_options } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
        Api_options
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data from TMDB');
      }

      const json = await response.json();
      return json.results || []; // Ensure it returns an array even if undefined
    } catch (error) {
      console.error("Error fetching TMDB data:", error);
      return []; // Return an empty array on error
    }
  };

  const handleGptSearchClick = async () => {
    try {
      const model = openAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const query =
        "Act as a Movie Recommendation system and suggest some movies for the query - " +
        searchText.current.value +
        " only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Dhamaal, Golmaal, Koi Mil Gaya";

      const result = await model.generateContent(query);

      if (!result || !result.response || !result.response.candidates.length) {
        console.error("No result returned from GPT API");
        return; // Handle no results case
      }

      const getMovies =
        result.response.candidates[0]?.content?.parts[0]?.text?.split(",") || []; // Default to an empty array

      const promiseArray = getMovies.map((movie) => searchMovieTMDB(movie.trim())); // Trim movie names

      const tmdbResults = await Promise.all(promiseArray);

      console.log(tmdbResults);
      dispatch(addGptMovieResult({ movieNames: getMovies, movieResults: tmdbResults }));
    } catch (error) {
      console.error("Error during GPT search:", error);
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-1/2 rounded-lg bg-opacity-70 bg-black grid grid-cols-12"
      >
        <input
          type="text"
          ref={searchText}
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          className="py-2 col-span-3 m-4 px-4 rounded-lg bg-[#ff0b0b] text-white font-semibold"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
