// REACT HOOKS
import { useEffect, useState } from "react";

//FIREBASE
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { db } from "../../../firebase/config";

// COMPONENTS
import Post from "../Post";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => setPosts(snapshot.docs)
    );
    // eslint-disable-next-line
  }, [db]);

  return (
    <div className="Posts my-4 pb-0 rounded-lg flex flex-col gap-2  ">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userName={post.data().userName}
          postTxt={post.data().postText}
          userImg={post.data().userImg}
          postImg={post.data().postImg}
          timestamp={post.data().timestamp}
          postVideo={post.data().postVideo}
          userEmail={post.data().userEmail}
        />
      ))}
    </div>
  );
}
