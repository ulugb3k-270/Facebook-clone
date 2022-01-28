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
import "./css/Header.css";
import { useStateValue } from "../Context/StateProvider";

export default function Header() {
  const [logOutHover, setLogOutHover] = useState(true);
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate()

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
          <div className="header__middleIcon active">
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
          <div className="header__middleIcon">
            <OndemandVideo />
          </div>
        </Link>
        
      </div>
      <div className="header__right">
        <div className="header__rightUser" onClick={hadnleLogOutHover}>
          <Avatar src={user?.photoURL} />

          <p>{user?.displayName} <span className={user?.displayName === "Ulugb3k270" && "verified"}></span></p>
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
  );
}
