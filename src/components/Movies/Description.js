import { ArrowBack } from "@material-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../Context/StateProvider";
import "../css/Description.css";

export default function Description() {
  const [{ description }] = useStateValue();

  const navigate = useNavigate();

  return (
    <div className="description">
      {/* BANNER */}

      <header
        className="banner "
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${description?.backdrop_path})`,
          backgroundPosition: "center center",
        }}
      >
        <ArrowBack
          className="!text-white absolute left-[1%] top-[1%]"
          onClick={() => navigate(-1)}
        />
        <div className="banner__content">
          <h1 className="banner__title">
            {description?.title ||
              description?.name ||
              description?.original_name}
          </h1>

          <div className="banner__buttons">
            <button className="banner__button">Play</button>
            <button className="banner__button">My List</button>
          </div>

          <h2 className="banner__description">{description?.overview}</h2>
        </div>
        <div className="banner--fade-Bottom"></div>
      </header>

      {/* BANNER */}
      <div className="desctiption__bottom">
        <div className="desctiption__bottomLeft">
          <img
            src={`https://image.tmdb.org/t/p/original/${description?.poster_path}`}
            alt=""
          />
          <div className="des__bottomLeftText">
            <h2>{description?.title}</h2>
            <br />
            <p className="original__name des__bottomDetails">
              Original Name:{" "}
              <span>
                {" "}
                {description?.original_title
                  ? description?.original_title
                  : "Unavailable "}
              </span>
            </p>

            <p className="realise__description des__bottomDetails">
              Realise data:{" "}
              <span>
                {" "}
                {description?.release_date
                  ? description?.release_date
                  : "Unavailable "}
              </span>{" "}
            </p>

            <p className="popularity des__bottomDetails">
              Popularity:{" "}
              <span>
                {" "}
                {description?.popularity
                  ? description?.popularity
                  : "Unavailable"}
              </span>{" "}
            </p>

            <p className="voted des__bottomDetails">
              Voted:{" "}
              <span>
                {" "}
                {description?.vote_count
                  ? description?.vote_count
                  : "Unavailable"}
              </span>{" "}
            </p>

            <p className="rating des__bottomDetails">
              Rating:{" "}
              <span>
                {" "}
                {description?.vote_average
                  ? description?.vote_average
                  : "Unavailable"}
                /10
              </span>{" "}
            </p>
          </div>
        </div>
        <div className="desctiption__bottomRight">
          <h2>Description: </h2>
          <br />
          <p>{description?.overview}</p>
        </div>
      </div>
    </div>
  );
}
