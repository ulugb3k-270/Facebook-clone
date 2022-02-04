import { Delete, MoreHoriz } from "@material-ui/icons";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import Moment from "react-moment";
import { useStateValue } from "../../Context/StateProvider";
import { db } from "../../firebase/config";

export default function Comments({
  userName,
  userImg,
  userComment,
  timestamp,
  userCommentImg,
  postId,
  commentId,
}) {
  const [{ user }] = useStateValue();
  const [delCommentBool, setDelCommentBool] = useState(false);

  return (
    <div className="flex items-start gap-2">
      <div className="flex flex-col items-end">
        <div className="flex gap-3 items-end">
          <img
            src={userImg}
            alt={userName}
            className="h-[32px] w-[32px] object-cover rounded-full"
          />
          <div className=" bg-gray-100 rounded-lg">
            <h2 className="text-md font-semibold px-2 pt-2">
              {userName}{" "}
              <span
                className={userName === "Ulugb3k270" ? "verified" : ""}
              ></span>
            </h2>

            {userCommentImg && (
              <>
                <img
                  src={userCommentImg}
                  alt=""
                  className="max-w-[240px] w-full h-auto object-contain my-2 cursor-pointer"
                />
              </>
            )}
            <p className="text-sm font-normal px-2 pb-2">{userComment}</p>
          </div>
        </div>

        <Moment fromNow interval={1000} className="text-gray-400 text-[10px]">
          {timestamp?.toDate()}
        </Moment>
      </div>
      {user.displayName === userName ||
      user.email === "gavharshod750@gmail.com" ? (
        <div className="relative">
          <MoreHoriz onClick={() => setDelCommentBool(!delCommentBool)} />
          {delCommentBool && (
            <div
              className="absolute right-[-200%] sm:right-[-550%] top-[0%] border bg-white p-3 sm:px-12 rounded-full shadow-md cursor-pointer hover:bg-gray-100"
              onClick={() =>
                deleteDoc(doc(db, "posts", postId, "comment", commentId))
              }
            >
              <Delete />
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
