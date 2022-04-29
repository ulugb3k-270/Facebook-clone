// COMPONENTS
import Header from "./components/Header";
import Friends from "./components/Friends";
import About from "./components/About";
import HomePage from "./components/Home/HomePage";
import Login from "./firebase/components/Login";
import Movies from "./components/Movies/Movies";
import Bookmark from "./components/Bookmark";
import Description from "./components/Movies/Description/Description";
import Suggestions from "./components/Suggestions/Suggestions";

// HOOKS
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStateValue } from "./Context/StateProvider";

// FIREBASE
import { auth } from "./firebase/config";

// CONTEXT API
import { actionTypes } from "./Context/reducer";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        return dispatch({
          type: actionTypes.SET_USER,
          user: user,
        });
      } else {
        return dispatch({ user: null });
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      {user ? (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header activeHome={"active"} />
                  <div className="App__main">
                    <HomePage />
                  </div>
                </>
              }
            />
            <Route path="/friends" element={<Friends />} />
            <Route path="/suggestions" element={<Suggestions />} />
            <Route path="/about" element={<About />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/description" element={<Description />} />
            <Route path="/bookmark" element={<Bookmark />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
