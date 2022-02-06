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
import { CameraAlt, Delete } from "@material-ui/icons";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import VideoPlayer from "./VideoPlayer";

export default function Post({
  id,
  userName,
  userImg,
  postTxt,
  postImg,
  timestamp,
  postVideo,
}) {
  const [{ user }] = useStateValue();
  const [commentBool] = useState(false);
  const commentRef = useRef(null);
  const commentCameraRef = useRef();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentMedia, setCommentMedia] = useState("");
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [deleteBool, setDeleteBool] = useState(false);

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
    alert("uploaded");
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

  return (
    <div className="post relative bg-white w-full rounded-lg">
      <div className="flex items-center justify-between p-3 ">
        <div className="flex items-center gap-3 ">
          <img src={userImg} alt="" className="userImg rounded-full" />

          <div className="">
            <h2 className="font-semibold">
              {userName}{" "}
              <span className={userName === "Ulugb3k270" && "verified"} />
            </h2>
            <Moment fromNow interval={1000} className="text-gray-400 text-sm">
              {timestamp?.toDate()}
            </Moment>
          </div>
        </div>
        {userName === user?.displayName ||
        user?.email === "gavharshod750@gmail.com" ? (
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
      {postVideo && (
        <VideoPlayer src={postVideo} />
      )}
      <div className="flex justify-between p-3">
        <p>{likes.length} Likes</p>
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
          <div className=" comments__component border overflow-y-scroll p-3 max-h-[200px] flex flex-col gap-2">
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
              <CameraAlt onClick={() => commentCameraRef.current.click()} />
              <input
                type="file"
                accept=" image/*, image/heic, image/heif"
                ref={commentCameraRef}
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
