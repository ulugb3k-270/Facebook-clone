// import { useEffect, useRef, useState } from "react";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   query,
//   serverTimestamp,
//   updateDoc,
// } from "firebase/firestore";
// import { useStateValue } from "../../Context/StateProvider";
// import { Delete, MoreHoriz } from "@material-ui/icons";
// import { db, storage } from "../../firebase/config";

// import { admin } from "../../assets/admin";
// import Moment from "react-moment";
// import { getDownloadURL, ref, uploadString } from "firebase/storage";

// function ReplyComments({
//   userImg,
//   userName,
//   userEmail,
//   userReplyImg,
//   userReply,
//   timestamp,
//   postId,

//   replyId,
//   isReply,
//   commentIdqwe,
//   commentUserName,
// }) {
//   const [{ user }] = useStateValue();
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [delReplyBool, setDelReplyBool] = useState(false);
//   const [replyComment, setReplyComment] = useState("");
//   const replyRef = useRef();
//   const replyGifRef = useRef(null);
//   const [replyMedia, setReplyMedia] = useState();
//   const [{ commentId }] = useStateValue();
//   const [replies, setReplies] = useState([]);

//   const postReply = async (e) => {
//     e.preventDefault();
//     const docRef = await addDoc(
//       collection(db, "posts", postId, "comment", commentId, "reply"),
//       {
//         userName: user?.displayName,
//         userEmail: user?.email,
//         postText: replyComment,
//         userImg: user?.photoURL,
//         timestamp: serverTimestamp(),
//       }
//     );

//     if (replyMedia) {
//       const imageRef = ref(storage, `message/${docRef.id}/image/replies`);

//       await uploadString(imageRef, replyMedia, "data_url").then(
//         async (snapshot) => {
//           const downloadURL = await getDownloadURL(imageRef);
//           await updateDoc(doc(db, "posts", docRef.id), {
//             replyImg: downloadURL,
//           });
//         }
//       );
//     }

//     setReplyComment("");
//     setReplyMedia("");
//   };

//   const addImgToReply = (e) => {
//     const reader = new FileReader();

//     if (e.target.files[0]) {
//       reader.readAsDataURL(e.target.files[0]);
//     }

//     reader.onload = (readerEvent) => {
//       setReplyMedia(readerEvent.target.result);
//     };
//   };

//   //   GET REPLIES

//   useEffect(() => {
//       return onSnapshot(
//         query(collection(db, "posts", postId, "comment", commentIdqwe, "reply")),
//         (snapshot) => setReplies(snapshot.docs)
//       );
    
//   }, [db]);

//   console.log(commentId);

//   return (
//     <>
//       {replies.map((reply) => (
//         <>
//           <div className="flex items-start gap-2 ml-20">
//             <div className="flex flex-col items-end">
//               <div className="flex gap-3 items-end">
//                 <img
//                   src={reply.data()?.userImg}
//                   alt={reply.data().userName}
//                   className="h-[24px] w-[24px] object-cover rounded-full"
//                 />
//                 <div className=" bg-[#f0f2f5] rounded-lg border ">
//                   <h2 className="text-md font-semibold px-2 pt-2">
//                     {reply.data().userName}{" "}
//                     <span className={isAdmin && "verified"}></span>
//                   </h2>

//                   {reply.data().replyImg && (
//                     <img
//                       src={reply.data().replyImg}
//                       alt=""
//                       className="max-w-[240px] w-full h-auto object-contain my-2 cursor-pointer"
//                     />
//                   )}
//                   <p className="text-sm font-normal px-2 pb-2">
//                     {reply.data().postText}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex justify-between items-start w-full pl-[3rem] ">
//                 <Moment
//                   fromNow
//                   interval={1000}
//                   className="text-gray-400 text-[10px]"
//                 >
//                   {reply.data().timestamp?.toDate()}
//                 </Moment>
//               </div>
//             </div>
//             {user.email === userEmail ||
//           user.email === "gavharshod750@gmail.com" ? (
//             <div className="relative">
//               <MoreHoriz onClick={() => setDelReplyBool(!delReplyBool)} />
//               {delReplyBool && (
//                 <div
//                   className="absolute right-[-200%] sm:right-[-550%] top-[0%] border bg-white p-3 sm:px-12 rounded-full shadow-md cursor-pointer hover:bg-gray-100"
//                   onClick={() =>
//                     deleteDoc(
//                       doc(
//                         db,
//                         "posts",
//                         postId,
//                         "comment",
//                         commentId,
//                         "reply",
//                         reply.data().id
//                       )
//                     )
//                   }
//                 >
//                   <Delete />
//                 </div>
//               )}
//             </div>
//           ) : (
//             <></>
//           )}
//           </div>

          
//         </>
//       ))}

//       {isReply && (
//         <form className="p-2 flex justify-between gap-2 items-center w-[50%]">
//           <div className="relative">
//             <img
//               src={user?.photoURL || userImg}
//               className="w-[24px] h-[24px] object-cover rounded-full"
//               alt=""
//             />
//             <div className="absolute bg-white right-[-3px] bottom-[0px] rounded-full w-[11px] h-[11px] flex justify-center items-center">
//               <div className=" w-[8px] h-[8px] rounded-full bg-[#31a24c] p-1 mt-[1px]"></div>
//             </div>
//           </div>
//           <div className="flex-1 flex items-center bg-[#f0f2f5] rounded-full px-2">
//             <input
//               value={replyComment}
//               onChange={(e) => setReplyComment(e.target.value)}
//               type="text"
//               placeholder={`Reply to ${commentUserName}`}
//               className=" w-full focus:outline-none p-1  bg-[#f0f2f5] rounded-full"
//               ref={replyRef}
//             />
//             <div
//               className="gif__icon"
//               onClick={() => replyGifRef.current.click()}
//             />
//             <input
//               type="file"
//               accept=" .gif"
//               ref={replyGifRef}
//               className="hidden"
//               onChange={addImgToReply}
//             />
//           </div>
//           <button hidden type="submit" onClick={postReply}>
//             Send
//           </button>
//         </form>
//       )}
//     </>
//   );
// }

// export default ReplyComments;
