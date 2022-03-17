import {
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect } from "react";
import { useStateValue } from "../../Context/StateProvider";
import { db } from "../../firebase/config";
import "../css/HomePage.css";

import Posts from "./Posts";
import Stories from "./Stories";
import Upload from "./Upload";

export default function HomePage() {
  const [{ user }] = useStateValue();

  // ADD LOGGED IN USER IN DB

  useEffect(() => {
    const addUser = async () => {
      return await setDoc(doc(db, "users", user?.email), {
        username: user?.displayName,
        userEmail: user?.email,
        userImg: user?.photoURL,
        timestamp: serverTimestamp()
      });
    };
    addUser();
  }, [user]);

  return (
    <div className="homepage bg-gray-100">
      <Stories />
      <Upload />
      <Posts />
    </div>
  );
}
