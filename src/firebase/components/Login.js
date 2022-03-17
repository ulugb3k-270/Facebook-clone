import "./css/Login.css";
import React, { useState } from "react";
import { useStateValue } from "../../Context/StateProvider";
import { auth } from "../config";
import { provider} from "../config";
import { actionTypes } from "../../Context/reducer";
import { useNavigate } from "react-router";
import {signInWithPopup } from "firebase/auth";

export default function Login() {
  
  // eslint-disable-next-line
  const [{ }, dispatch] = useStateValue();

  let navigate = useNavigate();

  const signInGoogle = () => {
    navigate("/");

    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error));
  };



  return (
    <div className="Login">
      <div className="login__left">
        <img
          src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
          alt=""
        />
        <p>Connect with friends and the world around you on Facebook.</p>
        <div className="login__loginMethods">
          <p className="login__formOtherWays">Login in using social medias</p>
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt=""
            onClick={signInGoogle}
          />
        </div>
        <p className="login__footerTxt">Facebook but made in Uzbekistan</p>
      </div>
    </div>
  );
}
