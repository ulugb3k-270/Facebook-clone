//STYLES
import "./HomePage.css";

// REACT || HOOKS
import { useEffect } from "react";

// FIREBASE
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/config";

// CONTEXT-API
import { useStateValue } from "../../../Context/StateProvider";

// COMPONENTS
import Posts from "../Posts";
import Stories from "../Stories";
import Upload from "../Upload";

export default function HomePage() {
  const [{ user }] = useStateValue();

  // ADD LOGGED IN USER IN DB

  useEffect(() => {
    const addUser = async () => {
      return await setDoc(doc(db, "users", user?.email), {
        username: user?.displayName,
        userEmail: user?.email,
        userImg: user?.photoURL,
        timestamp: serverTimestamp(),
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
