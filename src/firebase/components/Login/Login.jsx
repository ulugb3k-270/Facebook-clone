// STYLES
import "./Login.css";

// REACT
import React from "react";

// CONTEXT-API
import { useStateValue } from "../../../Context/StateProvider";
import { actionTypes } from "../../../Context/reducer";

// FIREBASE
import { auth } from "../../config";
import { provider } from "../../config";
import { signInWithPopup } from "firebase/auth";

// REACT-ROUTER-DOm
import { useNavigate } from "react-router";

export default function Login() {
  // eslint-disable-next-line
  const [{}, dispatch] = useStateValue();

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
