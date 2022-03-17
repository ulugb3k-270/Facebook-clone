import React, { useEffect, useState } from "react";
import "../css/MoviesRow.css";
import { useStateValue } from "../../Context/StateProvider";
import { useNavigate } from "react-router-dom";

export default function MoviesRow({ title, name }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  //eslint-disable-next-line
  const [{}, dispatch] = useStateValue();

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const movieFetch = async () => {
      const response = await fetch(`https://api.themoviedb.org/3${name}`);
      const res = await response.json();
      setMovies(res?.results);
    };
    movieFetch();
  }, [name]);

  const handleClick = (movie) => {
    navigate("/movies/description");

    dispatch({
      type: "SET_DESCRIPTION",
      description: movie,
    });
  };

  return (
    <div className="moviesRow">
      <h2>{title}</h2>
      <div className="flex movieRow__poster overflow-scroll">
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`${base_url}${movie.poster_path || movie.backdrop_path}`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
    </div>
  );
}
