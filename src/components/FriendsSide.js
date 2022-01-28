import { People, PersonAdd, Settings } from "@material-ui/icons";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../Context/StateProvider";
import { db } from "../firebase/config";
import "./css/FriendsSide.css";

export default function FriendsSide() {
  const [friends, setFriends] = useState(0);
  const [{ user }] = useStateValue();
  useEffect(() => {
    return onSnapshot(
      collection(db, "users", user?.email, "friends"),
      (snapshot) => setFriends(snapshot.docs)
    );
  }, [db]);

  return (
    <div className="friendsSide gap-2 h-full">
      <div className="friendSide__top">
        <h2>Friends</h2>
        <div className="header__rightIconsBg friendSide__topIcon">
          <Settings />
        </div>
      </div>

      <Link to="/suggestions">
        {" "}
        <div className="friendSide__menu !mb-1">
          <div className="header__rightIconsBg friendSide__menuIcon active">
            <PersonAdd />
          </div>
          <p className="friendSide__menuTxt">Suggestions</p>
        </div>
      </Link>
      <Link to="/friends" onClick={() => setFriends(0)}>
        <div className="friendSide__menu !mb-2 relative">
          <div className="header__rightIconsBg friendSide__menuIcon active">
            <People />
          </div>
          <p className="friendSide__menuTxt">Friends</p>
          {friends.length > 0 && (
            <div className="absolute bg-red-600 text-white font-semibold flex items-center justify-center rounded-full w-[25px] right-0">
              {friends.length}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
