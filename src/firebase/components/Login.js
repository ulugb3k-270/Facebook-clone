import "./css/Login.css";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../../Context/StateProvider";
import { Button } from "@material-ui/core";
import { auth } from "../config";
import { provider, storage, db } from "../config";
import { actionTypes } from "../../Context/reducer";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export default function Login() {
  const [{ user }, dispatch] = useStateValue();

  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginBtnClass, setLoginBtnClass] = useState("login__formSignin");

  // pull name of  user from db

  // sign in with email

  const signInWithAccount = (e) => {
    console.log("asd");
  };

  // sign in using Google

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
        {/* <form action="" className="login__form">
          <input
            type="text"
            className="login__formEmail"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="login__formPassword"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className={loginBtnClass}
            type="submit"
            onClick={signInWithAccount}
          >
            Log In
          </Button>
          <p className="login__formOr">or</p>
          <Link to="/reg">
            <Button className="login__formSignup"> create new account </Button>
          </Link>
        </form> */}
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
