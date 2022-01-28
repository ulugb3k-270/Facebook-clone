import React, { useEffect, useState } from "react";
import "./css/MoviesRow.css";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

export default function MoviesRow({ title, name }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const base_url = "https://image.tmdb.org/t/p/original/";


  useEffect(() => {
    const movieFetch = async () => {
      const response = await fetch(`https://api.themoviedb.org/3${name}`)
      const res = await response.json()
      // return res
      setMovies(res?.results)
      
    }

    movieFetch()
  }, [name])

  console.log(movies)

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search).get("v");

          setTrailerUrl(urlParams);
        })
        .catch((error) => console.log(error));
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="moviesRow">
      <h2>{title}</h2>
      <div className="movieRow__poster">
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`${base_url}${movie.poster_path || movie.backdrop_path}`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}
