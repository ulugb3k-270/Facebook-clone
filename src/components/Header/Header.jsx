// STYLES
import "./Header.css";

// REACT || HOOKS
import { useEffect, useState } from "react";

// MUI CORE || ICONS
import { Avatar } from "@material-ui/core";
import {
  Menu,
  Apps,
  Chat,
  ExitToApp,
  Home,
  Notifications,
  OndemandVideo,
  People,
  Search,
  Info,
} from "@material-ui/icons";

// REACT-ROUTER-DOM
import { Link, useNavigate } from "react-router-dom";

// CONTEXT-API
import { useStateValue } from "../../Context/StateProvider";

// ASSESTS
import { admin } from "../../assets/admin";

// FIREBASE
import { auth } from "../../firebase/config";

export default function Header({
  activeHome,
  activePeople,
  activeInfo,
  activeMovies,
}) {
  const [logOutHover, setLogOutHover] = useState(true);
  const [{ user }] = useStateValue();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  // Log Out function

  const logOut = () => {
    navigate("/");
    auth.signOut();
  };

  // Check user admin or not

  useEffect(() => {
    for (let i = 0; i < admin.length; i++) {
      if (admin[i] === user?.email) {
        setIsAdmin(true);
        return;
      }
    }
    //  eslint-disable-next-line
  }, []);

  return (
    <div className="Header">
      <div className="header__left">
        <img src="https://i.ibb.co/wKfB2v3/facebook.png" alt="" />
        <div className="header__leftSearch">
          <Search />
          <input type="text" placeholder="Search Facebook" />
        </div>
        <Link to="/bookmark">
          <div className="header__leftBurger">
            <Menu />
          </div>
        </Link>
      </div>
      <div className="header__middle">
        <Link to="/">
          <div className={`header__middleIcon ${activeHome}`}>
            <Home />
          </div>
        </Link>
        <Link to="/friends">
          <div className={`header__middleIcon ${activePeople}`}>
            <People />
          </div>
        </Link>
        <Link to="/about">
          <div className={`header__middleIcon ${activeInfo}`}>
            <Info />
          </div>
        </Link>
        <Link to="/movies">
          <div className={`header__middleIcon ${activeMovies}`}>
            <OndemandVideo />
          </div>
        </Link>
      </div>
      <div className="header__right">
        <div
          className="header__rightUser"
          onClick={() => setLogOutHover(!logOutHover)}
        >
          <Avatar src={user?.photoURL} />

          <p>
            {user?.displayName}{" "}
            <span className={`${isAdmin ? "verified" : undefined} `}></span>
          </p>
          <div
            className={
              logOutHover
                ? `header__rightUserLogOut`
                : `header__rightUserLogOut active`
            }
            onClick={logOut}
          >
            <ExitToApp />
            <p onClick={logOut}>Log Out</p>
          </div>
        </div>
        <div className="header__rightIcons">
          <div className="header__rightIconsBg">
            <Apps />
          </div>
          <div className="header__rightIconsBg">
            <Chat />
          </div>
          <div className="header__rightIconsBg">
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  );
}
