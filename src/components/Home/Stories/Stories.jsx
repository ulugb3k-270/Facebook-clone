// REACT || HOOKS
import React, { useEffect, useState } from "react";

// MUI ICONS || CORE
import { Add } from "@material-ui/icons";

// CONTEXT-API
import { useStateValue } from "../../../Context/StateProvider";

// FIREBASE
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase/config";

export default function Stories() {
  const [suggestions, setSuggestions] = useState([]);
  const [{ user }] = useStateValue();
  useEffect(() => {
    return onSnapshot(query(collection(db, "users")), (snapshot) =>
      setSuggestions(snapshot.docs)
    );
  }, []);

  return (
    <div className="flex mb-4 gap-2 overflow-x-scroll p-1 stories__component">
      <div className="box__stories box overflow-hidden relative bg-white rounded-lg hover:scale-105 transition 1s ease-out cursor-pointer min-w-[106px]">
        <img
          src={user?.photoURL}
          alt=""
          className="cursor-pointer  w-[106px] h-[160px] object-cover rounded-lg"
        />
        <div className=" rounded-lg absolute w-[106px] h-[160px] left-0 top-0 bg-black opacity-70 "></div>
        <Add className="plus__Icon-stories " />
        <div className="w-[2em] h-[2em] absolute bottom-[29px] left-[36%] rounded-full bg-white"></div>
        <p className=" absolute left-[12px] bottom-1  text-black p-1 font-semibold text-sm">
          Create Story
        </p>
      </div>
      {suggestions
        .filter((suggestion) => suggestion?.data().userEmail !== user?.email)
        .map((user, id) => (
          <div
            key={id}
            className="box overflow-hidden relative bg-white rounded-lg hover:scale-105 transition 1s ease-out cursor-pointer min-w-[106px]"
          >
            <img
              src={user?.data().userImg}
              alt={user?.data().username}
              className="cursor-pointer  w-[111px] h-[200px] object-cover rounded-lg"
            />
            <div className=" rounded-lg absolute w-[106px] h-full left-0 top-0 bg-black opacity-70"></div>
            <p className=" absolute  bottom-1 text-white p-1">
              {user.data().username}
            </p>
            <div className="absolute top-0 left-0  m-2 rounded-full bg-white">
              <img
                src={user?.data().userImg}
                className=" rounded-full w-[40px] h-[40px]"
                alt=""
              />
            </div>
          </div>
        ))}
    </div>
  );
}
