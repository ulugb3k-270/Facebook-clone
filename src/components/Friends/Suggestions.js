import "../css/Friends.css";

import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";

import { useStateValue } from "../../Context/StateProvider";

import { db } from "../../firebase/config";
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
import Header from "../Header";

export default function Suggestions() {
  const [{ user }] = useStateValue();
  const [users, setUsers] = useState([]);

  const addToFriend = async (email, name, img) => {
    await setDoc(doc(db, "users", user?.email, "friends", email), {
      userEmail: email,
      username: name,
      userImg: img,
    });
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
      <Header activePeople={"active"} />
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
              <div key={use.id}>
                <div key={use.id} className={`friend`}>
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
