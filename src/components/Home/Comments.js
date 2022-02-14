import { Delete, MoreHoriz } from "@material-ui/icons";
import { deleteDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Moment from "react-moment";
import { useStateValue } from "../../Context/StateProvider";
import { db } from "../../firebase/config";
import { admin } from "../../assets/admin";

export default function Comments({
  userName,
  userImg,
  userComment,
  timestamp,
  userCommentImg,
  postId,
  commentId,
  userEmail,
}) {
  const [{ user }] = useStateValue();
  const [delCommentBool, setDelCommentBool] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [{ reply }, dispatch] = useStateValue();

  // Check user admin or not

  useEffect(() => {
    for (let i = 0; i < admin.length; i++) {
      if (admin[i] === userEmail) {
        setIsAdmin(true);
        return;
      }
    }
  }, [userEmail]);

  const replyClick = () => {
    setIsReply(!isReply);

    dispatch({
      type: "SET_REPLY",
      reply: userComment,
      replyAuthor: userName,
      commentId: commentId,
    });
  };

  return (
    <>
      <div className="flex items-start gap-2">
        <div className="flex flex-col items-end">
          <div className="flex gap-3 items-end">
            <img
              src={userImg}
              alt={userName}
              className="h-[32px] w-[32px] object-cover rounded-full"
            />
            <div className=" bg-[#f0f2f5] rounded-lg border ">
              <h2 className="text-md font-semibold px-2 pt-2">
                {userName} <span className={isAdmin && "verified"}></span>
              </h2>

              {userCommentImg && (
                <img
                  src={userCommentImg}
                  alt=""
                  className="max-w-[240px] w-full h-auto object-contain my-2 cursor-pointer"
                />
              )}
              <p className="text-sm font-normal px-2 pb-2">{userComment}</p>
            </div>
          </div>
          <div className="flex justify-between items-start w-full pl-[3rem] ">
            <p
              className="text-[#65676B] font-bold text-[10px] cursor-pointer hover:underline"
              onClick={replyClick}
            >
              Reply
            </p>
            <Moment
              fromNow
              interval={1000}
              className="text-gray-400 text-[10px]"
            >
              {timestamp?.toDate()}
            </Moment>
          </div>
        </div>
        {user?.email === userEmail ||
        user?.email === "gavharshod750@gmail.com" ? (
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
      {/* <ReplyComments
        postId={postId}
        commentIdqwe={commentId}
        replyId
        isReply={isReply}
        commentUserName={userName}
      /> */}
    </>
  );
}
