import Header from "./components/Header";
import Friends from "./components/Friends/Friends";
import About from "./components/About/About";
import HomePage from "./components/Home/HomePage";
import Login from "./firebase/components/Login";
import Signup from "./firebase/components/Signup";
import Movies from "./components/Movies/Movies";
import Bookmark from "./components/Friends/Bookmark";
import Description from "./components/Movies/Description";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStateValue } from "./Context/StateProvider";
import Suggestions from "./components/Friends/Suggestions";
import { auth } from "./firebase/config";
import { useEffect } from "react";
import { actionTypes } from "./Context/reducer";
function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        return  dispatch({
          type: actionTypes.SET_USER,
          user: user,
        });
      } else {
        return dispatch({ user: null });
      }
    });
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
            <Route path="/reg" element={<Signup />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
