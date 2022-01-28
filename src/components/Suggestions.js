import "./css/Header.css";
import "./css/Friends.css";

import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@material-ui/core";
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

import { useStateValue } from "../Context/StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import FriendsSide from "./FriendsSide";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

export default function Suggestions() {
  const [logOutHover, setLogOutHover] = useState(true);
  const [{ user }, dispatch] = useStateValue();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const logOut = () => {
    navigate("/");
    dispatch({
      user: null,
    });
  };

  const addToFriend = async (email, name, img) => {
    await setDoc(doc(db, "users", user?.email, "friends", email), {
      userEmail: email,
      username: name,
      userImg: img,
    })

  };

  const removeFriend = async (email) => {
    await deleteDoc(doc(db, "users", user?.email, "friends", email));
  };


  useEffect(() => {
    return onSnapshot(
      query(collection(db, "users"), orderBy("timestamp", "desc")),
      (snapshot) => setUsers(snapshot.docs)
    );
  }, []);

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
            <div className="header__middleIcon active">
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
          <div
            className="header__rightUser"
            onClick={() => setLogOutHover(!logOutHover)}
          >
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
      <div className="Friends">
        <div className="friends__container ">
          <div className="friends__side">
            <FriendsSide />
          </div>
          <div className="asd relative overflow-y-scroll">
            <h1 className="absolute left-0 -top-1">
              Info: Registrated Users: {users.length}
            </h1>
           
           
            {users.map((use) => (
              <div  key={use.id}>
                <div
                  key={use.id}
                  className={`friend`}
                >
                  <img src={use?.data().userImg} alt="" />
                    <p className="flex gap-2 px-5">
                      {use?.data().username}{" "}
                      {use?.data().userEmail === "gavharshod750@gmail.com" && (
                        <span className="verified translate-y-[6px]"></span>
                      )}
                    </p>
                  <div className="friend__details">

                    <Button
                      className="addFriendBtn"
                      onClick={() =>
                        addToFriend(
                          use?.data().userEmail,
                          use?.data().username,
                          use?.data().userImg
                        )
                      }
                    >
                      Add Friend
                    </Button>
                    <Button
                      className="removeFriendBtn"
                      onClick={() => removeFriend(use?.data().userEmail)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="friend__responsive">
                  <div className="friendResponsive__card">
                    <img src={use?.data().userImg} alt="" />
                    <div className="friendResponsive__cardSide">
                      <p className="flex gap-2">
                        {use?.data().username}{" "}
                        {use?.data().userEmail ===
                          "gavharshod750@gmail.com" && (
                          <span className="verified translate-y-[6px]"></span>
                        )}
                      </p>
                      <div className="friendResponsive__cardSideButtons">
                        <Button
                          className="addFriendBtn"
                          onClick={() =>
                            addToFriend(
                              use?.data().userEmail,
                              use?.data().username,
                              use?.data().userImg
                            )
                          }
                        >
                          Add Friend
                        </Button>
                        <Button
                          className="removeFriendBtn"
                          onClick={() => removeFriend(use?.data().userEmail)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
