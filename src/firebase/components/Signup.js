import "./css/Signup.css";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { auth, storage, db } from "../config";
import { actionTypes } from "../../Context/reducer";
import { useStateValue } from "../../Context/StateProvider";
export default function Signup() {
  const [{}, dispatch] = useStateValue();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [signUpClass, setSignUpClass] = useState("login__formSignin");
  const [signUpText, setSignUpText] = useState("Sign Up");
  let navigate = useNavigate();

  // set profile image

  const imgHandleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const signUp = (e) => {
    e.preventDefault();

    if (email.includes("@") && firstName && lastName && password.length > 6) {
      setSignUpClass("login__formSignin active");
      setSignUpText("Signing in. Wait....");
    }

    const uploadPhoto = storage.ref(`images/${email}`).put(photo);

    // uploadPhoto.on(
    //   "state_changed",
    //   (snapshot) => {},
    //   (error) => {
    //     alert(error)
    //   },

    //   () => {
    //     storage
    //       .ref("images")
    //       .child(`${email}`)
    //       .getDownloadURL()
    //       .then((url) => {
    //         auth
    //           .createUserWithEmailAndPassword(email, password)
    //           .then((result) => {
    //             dispatch({
    //               type: actionTypes.SET_USER,
    //               user: {
    //                 displayName: firstName + " " + lastName,
    //                 email: email,
    //                 photoURL: url,
    //               },
    //             });
    //             db.collection("reguser")
    //               .doc(email)
    //               .set({
    //                 name: firstName + " " + lastName,
    //                 email: email,
    //                 pass: password,
    //               });
    //             history.push("/");
    //           })
    //           .then(
    //             setTimeout(() => {
    //               setSignUpClass("login__formSignin");
    //             }, 3000)
    //           )
    //           .then(
    //             setTimeout(() => {
    //               setSignUpText("Sign Up");
    //             }, 3000)
    //           )
    //           .catch((error) => {
    //             setSignUpClass("login__formSignin active");
    //             setSignUpText("Signing in. Wait....");
    //           });
    //       });
    //   }
    // );
  };

  return (
    <div className="Signup">
      <div className="Login">
        <div className="login__left">
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
            alt=""
          />

          <p>Create Facebuk Account not Facebook</p>
          <form action="" className="login__form">
            <div className="reg__formTop">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="reg__formPass"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="reg__formPass"
            />
            <p>Select image for profile</p>
            <input
              type="file"
              onChange={imgHandleChange}
              className="reg__formImg"
              accept="image/x-png,image/jpeg"
            />
            <Button className={signUpClass} type="submit" onClick={signUp}>
              {signUpText}
            </Button>

            <Link to="/" className="reg__formChoice">
              Already have account? Click this.{" "}
            </Link>
          </form>

          <p className="login__footerTxt">Facebook but made in Uzbekistan</p>
        </div>
      </div>
    </div>
  );
}
