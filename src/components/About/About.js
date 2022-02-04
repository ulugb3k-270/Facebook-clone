import "../css/About.css";
import "../css/Header.css";
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
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../Context/StateProvider";



export default function About() {
  const [logOutHover, setLogOutHover] = useState(true);
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate("/")

  //  Log Out button on/off function
  const hadnleLogOutHover = () => {
    setLogOutHover(!logOutHover);
  };

  // Log Out function

  const logOut = () => {
    navigate("/")
    dispatch({
      user: null,
    });
  };
  return (
    <>
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
            <div className="header__middleIcon ">
              <Home />
            </div>
          </Link>
          <Link to="/friends">
            <div className="header__middleIcon">
              <People />
            </div>
          </Link>
          <Link to="/about">
            <div className="header__middleIcon active">
              <Info />
            </div>
          </Link>
          <Link to="/movies">
            <div className="header__middleIcon">
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
      <div className="About">
        <div className="homePage_post about__post">
          <h2 className="about__title">About Facebook Clone</h2>
          <h3>Used Languages:</h3>
          <p>- React</p>
          <p>- React Context API</p>
          <p>
            - {`Firebase for Backend (Real Time Database and Registration)`}
          </p>
          <p>- Material UI for better style and icons</p>
          <p>- Tailwind CSS</p>
          <h3>About Me:</h3>
          <p>- Creator: Ulugbek</p>
          <p>- Email: Ulugb3k270@gmail.com</p>
          <div className="about__links">
            <a
              href="https://github.com/ulugb3k-270"
              rel="noreferrer"
              target="_blank"
            >
              Github
            </a>
            <a
              href="https://www.instagram.com/ulugb3k_270/"
              rel="noreferrer"
              target="_blank"
            >
              Instagram
            </a>
            <a href="https://t.me/Ulugb3k_270" rel="noreferrer" target="_blank">
              Telegram
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
