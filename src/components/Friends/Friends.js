import "../css/Friends.css";
import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useStateValue } from "../../Context/StateProvider";
import { Link } from "react-router-dom";
import { db } from "../../firebase/config";
import FriendsSide from "./FriendsSide";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import Header from "../Header";
export default function Friends() {
  const [{ user }] = useStateValue();
  const [friends, setFriends] = useState([]);
  const removeFriend = async (email) => {
    await deleteDoc(doc(db, "users", user?.email, "friends", email));
  };
  useEffect(() => {
    return onSnapshot(
      collection(db, "users", user?.email, "friends"),
      (snapshot) => setFriends(snapshot.docs)
    );
    // eslint-disable-next-line
  }, [db]);

  return (
    <>
      <Header activePeople={"active"} />

      <div className="Friends">
        <div className="friends__container ">
          <div className="friends__side">
            <FriendsSide peopleActive={"active"} />
          </div>
          <div className="asd relative">
            {friends.length ? (
              <>
                <h1 className="absolute right-0 -top-1">
                  Info: Your Friends: {friends.length}
                </h1>

                {friends.map((use) => (
                  <div key={use.id}>
                    <div className={`friend`}>
                      <img src={use?.data().userImg} alt="" />
                      <p className="flex gap-2 px-5">
                        {use?.data().username}{" "}
                        {use?.data().userEmail ===
                          "gavharshod750@gmail.com" && (
                          <span className="verified translate-y-[6px]"></span>
                        )}
                      </p>
                      <div className="friend__details">
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
                          <div className="friendResponsive__cardSideButtons">
                            <p className="flex gap-2 flex-1">
                              {use?.data().username}{" "}
                              {use?.data().userEmail ===
                                "gavharshod750@gmail.com" && (
                                <span className="verified translate-y-[6px]"></span>
                              )}
                            </p>
                            <Button
                              className="removeFriendBtn"
                              onClick={() =>
                                removeFriend(use?.data().userEmail)
                              }
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <h2 className="text-center w-full">
                You have no any Friends.{" "}
                <Link to="/suggestions" className="underline  text-blue-400">
                  Click here
                </Link>{" "}
                to find your friends.
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
