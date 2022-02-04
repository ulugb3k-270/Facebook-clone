import React, { useEffect, useState } from "react";
import "../css/Movies.css";
import { Avatar } from "@material-ui/core";
import {
  Menu,
  Apps,
  Chat,
  ExitToApp,
  Home,
  Notifications,
  OndemandVideo,
  People,
  Search,
  Info,
} from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css";
import { useStateValue } from "../../Context/StateProvider";
import MoviesRow from "../Movies/MoviesRow";
import requests from "../../moviesGenres";
import Loader from "./Loader";

export default function Movies() {
  const [logOutHover, setLogOutHover] = useState(true);

  const [loading, setLoading] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  //  Log Out button on/off function
  const hadnleLogOutHover = () => {
    setLogOutHover(!logOutHover);
  };

  // Log Out function

  const logOut = () => {
    navigate("/");
    dispatch({
      user: null,
    });
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="Movies">
      <div className="Header">
        <div className="header__left">
          <img src="https://i.ibb.co/wKfB2v3/facebook.png" alt="" />
          <div className="header__leftSearch">
            <Search />
            <input type="text" placeholder="Search Facebook" />
          </div>
          <Link to="/bookmark">
            <div className="header__leftBurger">
              <Menu />
            </div>
          </Link>
        </div>
        <div className="header__middle">
          <Link to="/">
            <div className="header__middleIcon">
              <Home />
            </div>
          </Link>
          <Link to="/friends">
            <div className="header__middleIcon">
              <People />
            </div>
          </Link>
          <Link to="/about">
            <div className="header__middleIcon">
              <Info />
            </div>
          </Link>
          <Link to="/movies">
            <div className="header__middleIcon active">
              <OndemandVideo />
            </div>
          </Link>
        </div>
        <div className="header__right">
          <div className="header__rightUser" onClick={hadnleLogOutHover}>
            <Avatar src={user?.photoURL} />

            <p>{user?.displayName}</p>
            <div
              className={
                logOutHover
                  ? `header__rightUserLogOut`
                  : `header__rightUserLogOut active`
              }
              onClick={logOut}
            >
              <ExitToApp />
              <p onClick={logOut}>Log Out</p>
            </div>
          </div>
          <div className="header__rightIcons">
            <div className="header__rightIconsBg">
              <Apps />
            </div>
            <div className="header__rightIconsBg">
              <Chat />
            </div>
            <div className="header__rightIconsBg">
              <Notifications />
            </div>
          </div>
        </div>
      </div>
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
