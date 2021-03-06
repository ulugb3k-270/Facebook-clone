// STYLES
import "./Movies.css";

// REACT || HOOKS
import { useEffect, useState } from "react";

// ASSESTS
import requests from "../../../assets/moviesGenres";

// COMPOENTS
import MoviesRow from "../MoviesRow";
import Loader from "../Loader";
import Header from "../../Header";

export default function Movies() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="Movies">
      <Header activeMovies={"active"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="movies__body">
          <MoviesRow name={requests.fetchTopRated} title="Top Rated" />
          <MoviesRow name={requests.fetchTrending} title="Trending" />
          <MoviesRow name={requests.fetchComedy} title="Comedy" />
          <MoviesRow name={requests.fetchAction} title="Action" />
          <MoviesRow name={requests.fetchHorror} title="Horror" />
        </div>
      )}
    </div>
  );
}
