import Header from "./components/Header";
import Friends from "./components/Friends";
import About from "./components/About";
import HomePage from "./components/HomePage";
import Login from "./firebase/components/Login";
import Signup from "./firebase/components/Signup";
import Movies from "./components/Movies";
import Bookmark from "./components/Bookmark";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStateValue } from "./Context/StateProvider";
import Suggestions from "./components/Suggestions";
function App() {
  const [{ user }] = useStateValue();
  return (
    <div className="App">
      {!user ? (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/reg" element={<Signup />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
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
            <Route path="/bookmark" element={<Bookmark />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
