import "./css/Bookmark.css";
import React, { useState } from "react";
import {
  ArrowBack,
  ExitToApp,
  Home,
  People,
  Info,
  OndemandVideo,
  Search,
} from "@material-ui/icons";

import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../Context/StateProvider";
import { Button } from "@material-ui/core";


export default function Bookmark() {
  const [{ user }, dispatch] = useStateValue();
  const [popUp, setPopUp] = useState(false);

  let navigate = useNavigate();

  const handlePopUp = () => {
    setPopUp(!popUp);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const logOut = () => {
    navigate("/");
    dispatch({
      user: null,
    });
    setPopUp(false);
  };

  return (
    <div className="Bookmark">
      <div className="bookmark__header">
        <div className="bookmark__headerContent">
          <ArrowBack onClick={handleBack} />
          <img
            src="https://i.ibb.co/HBmWYrQ/pngfind-com-find-us-on-facebook-2211195.png"
            alt=""
          />
        </div>
      </div>

      <div className="bookmark__body">
        <Link to="/">
          <div className="header__bodyCard">
            <div className={`friendSide__menu  bookmark__cardHover`}>
              <div className="header__rightIconsBg friendSide__menuIcon bookmark__cardButtonHover">
                <Home />
              </div>
              <p className="friendSide__menuTxt">Home</p>
            </div>
          </div>
        </Link>
        <Link to="/suggestions">
          <div className="header__bodyCard">
            <div className={`friendSide__menu  bookmark__cardHover`}>
              <div className="header__rightIconsBg friendSide__menuIcon bookmark__cardButtonHover">
                <Search />
              </div>
              <p className="friendSide__menuTxt">Suggestions</p>
            </div>
          </div>
        </Link>
        <Link to="/friends">
          <div className="header__bodyCard">
            <div className={`friendSide__menu  bookmark__cardHover`}>
              <div className="header__rightIconsBg friendSide__menuIcon bookmark__cardButtonHover">
                <People />
              </div>
              <p className="friendSide__menuTxt">Friends</p>
            </div>
          </div>
        </Link>
        
        <Link to="/about">
          <div className="header__bodyCard">
            <div className={`friendSide__menu  bookmark__cardHover`}>
              <div className="header__rightIconsBg friendSide__menuIcon bookmark__cardButtonHover">
                <Info />
              </div>
              <p className="friendSide__menuTxt">About</p>
            </div>
          </div>
        </Link>
        <Link to="/movies">
          <div className="header__bodyCard">
            <div className={`friendSide__menu  bookmark__cardHover`}>
              <div className="header__rightIconsBg friendSide__menuIcon bookmark__cardButtonHover">
                <OndemandVideo  />
              </div>
              <p className="friendSide__menuTxt">Movies</p>
            </div>
          </div>
        </Link>

        <div className="header__bodyCard" onClick={handlePopUp}>
          <div className={`friendSide__menu  bookmark__cardHover`}>
            <div className="header__rightIconsBg friendSide__menuIcon bookmark__cardButtonHover">
              <ExitToApp />
            </div>
            <p className="friendSide__menuTxt">Log Out</p>
          </div>
        </div>
      </div>

      <div className={`bookmark__logOutPopUp ${popUp && "active"}`}>
        <div className="bookmark__logOutPopUpContainer">
          <p>{user?.displayName}, Do you want to log out?</p>
          <Button className="bookmark__cancel" onClick={handlePopUp}>
            Cancel
          </Button>
          <Button className="bookmark__logOut" onClick={logOut}>
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
