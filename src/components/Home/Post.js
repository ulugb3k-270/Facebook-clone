import "../css/Post.css";
import { useStateValue } from "../../Context/StateProvider";
import Moment from "react-moment";
import { useState, useRef, useEffect } from "react";
import { db, storage } from "../../firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Comments from "./Comments";
import { Delete } from "@material-ui/icons";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import VideoPlayer from "./VideoPlayer";
import { admin } from "../../assets/admin";

export default function Post({
  id,
  userName,
  userImg,
  postTxt,
  postImg,
  timestamp,
  postVideo,
  userEmail
}) {
  const [{ user }] = useStateValue();
  const [commentBool] = useState(false);
  const commentRef = useRef(null);
  const commentgifRef = useRef();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentMedia, setCommentMedia] = useState("");
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [deleteBool, setDeleteBool] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAdminPost, setIsAdminPost] = useState(false)

  const like = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", user?.email));
    } else {
      await setDoc(doc(db, "posts", id, "likes", user?.email), {
        username: user?.email,
      });
    }
  };

  const addImageToComment = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setCommentMedia(readerEvent.target.result);
    };
  };

  const postComment = async (e) => {
    e.preventDefault();

    const docRef = await addDoc(collection(db, "posts", id, "comment"), {
      userName: user?.displayName,
      userImg: user?.photoURL,
      userComment: comment,
      timestamp: serverTimestamp(),
      userEmail: user?.email,
    });

    if (commentMedia) {
      const imageRef = ref(storage, `comments/${docRef.id}/image`);

      await uploadString(imageRef, commentMedia, "data_url").then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRef);

          await updateDoc(doc(db, "posts", id, "comment", docRef.id), {
            userCommentImg: downloadURL,
          });
        }
      );
    }

    setComment("");
    setCommentMedia("");
  };

  const handleDelete = async () => {
    return await deleteDoc(doc(db, "posts", id));
  };

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === user?.email) !== -1);
  }, [likes]);

  useEffect(() => {
    return onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, "posts", id, "comment"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db]);

   // Check user admin or not

   useEffect(() => {
    for(let i = 0; i < admin.length; i++){
      if( admin[i] === user?.email ){
        setIsAdmin(true)
       
      }
      
      if(admin[i] === userEmail){
        setIsAdminPost(true)
      }
    }
  }, [userEmail])

  return (
    <div className="post relative bg-white w-full rounded-lg">
      <div className="flex items-center justify-between p-3 ">
        <div className="flex items-center gap-3 ">
          <img src={userImg} alt="" className="userImg rounded-full" />

          <div className="">
            <h2 className="font-semibold flex items-center gap-1">
              {userName}{" "}
              <span
                className={
                  isAdminPost && "verified"
                }
              />
            </h2>
            <Moment fromNow interval={1000} className="text-gray-400 text-sm">
              {timestamp?.toDate()}
            </Moment>
          </div>
        </div>
        {userName === user?.displayName ||
        isAdmin ? (
          <div>
            <Delete onClick={() => setDeleteBool(true)} />
            {deleteBool && (
              <div className="absolute left-0 top-0 bg-[#0000007e] w-full h-full flex flex-col justify-center items-center rounded-lg">
                <div className="bg-white p-2 rounded-lg w-[40%] z-40">
                  <p className="p-4 text-sm sm:text-md">
                    Do you want to delete this photo?
                  </p>
                  <hr />
                  <div className="flex justify-between gap-4 mt-2">
                    <button
                      onClick={handleDelete}
                      className="text-red-600 cursor-pointer text-center w-full text-sm sm:text-md"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeleteBool(false)}
                      className="cursor-pointer text-center w-full text-sm sm:text-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      <p className="flex-1 py-2 p-3 ">{postTxt}</p>
      {postImg && <img src={postImg} className="postImg" alt="" />}
      {postVideo && <VideoPlayer src={postVideo} />}
      <div className="flex justify-between p-3">
        <p className="flex gap-2 items-center">
          <img
            className="w-5 h-5"
            src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e"
            alt=""
          />{" "}
          {hasLiked && "You and "} {hasLiked ? likes.length - 1 : likes.length}{" "}
          {hasLiked && "others"}
        </p>
        <p>{comments.length} Comments</p>
      </div>
      <div className="flex justify-between p-3 items-center post__buttons">
        {!hasLiked ? (
          <button className="like__btn text-center w-full p-2" onClick={like}>
            <p className="post__media-text like__btn-span">Like</p>
          </button>
        ) : (
          <button className="liked__btn text-center w-full p-2" onClick={like}>
            <p className="post__media-text like__btn-span">Like</p>
          </button>
        )}
        <button
          className="comment__btn text-center w-full p-2"
          onClick={() => commentRef.current.click()}
        >
          <p className=" post__media-text like__btn-span-comment">Comment</p>
        </button>
      </div>
      {!commentBool && (
        <>
          <div className={`comments__component border overflow-y-scroll ${!comments.length && "hidden"} p-3 max-h-[200px] flex flex-col gap-2 bg-white`}>
            {comments.map((comment) => (
              <Comments
                key={comment.id}
                userName={comment.data().userName}
                userImg={comment.data().userImg}
                userComment={comment.data().userComment}
                timestamp={comment.data().timestamp}
                userCommentImg={comment.data()?.userCommentImg}
                postId={id}
                commentId={comment.id}
                userEmail = {comment.data()?.userEmail}
              />
            ))}
          </div>
          <form className="p-3 flex justify-between gap-2 items-center">
            <div className="relative">
              <img
                src={user?.photoURL || userImg}
                className="w-[32px] h-[32px] object-cover rounded-full"
                alt=""
              />
              <div className="absolute bg-white right-[-3px] bottom-[0px] rounded-full w-[13px] h-[13px] flex justify-center items-center">
                <div className=" w-[10px] h-[10px] rounded-full bg-[#31a24c] p-1"></div>
              </div>
            </div>
            <div className="flex-1 flex items-center bg-[#f0f2f5] rounded-full px-3">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="Write a comment ..."
                className=" w-full focus:outline-none p-2  bg-[#f0f2f5] rounded-full"
                ref={commentRef}
              />
              <div
                className="gif__icon"
                onClick={() => commentgifRef.current.click()}
              />
              <input
                type="file"
                accept=" .gif"
                ref={commentgifRef}
                className="hidden"
                onChange={addImageToComment}
              />
            </div>
            <button hidden type="submit" onClick={postComment}>
              Send
            </button>
          </form>
          {commentMedia && (
            <div className="mx-[12px] mb-2 flex gap-2 items-center">
              <img
                className="rounded-lg  max-w-[150px] object-contain"
                src={commentMedia}
                alt=""
              />
              <Delete onClick={() => setCommentMedia("")} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
