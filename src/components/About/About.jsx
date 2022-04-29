// STYLES
import "./About.css";

// COMPONENTS
import Header from "../Header";

export default function About() {
  return (
    <>
      <Header activeInfo={"active"} />
      <div className="About">
        <div className="homePage_post about__post">
          <h2 className="about__title">About Facebook Clone</h2>
          <h3>Used Languages:</h3>
          <p>- React</p>
          <p>- React Context API</p>
          <p>
            - {`Firebase for Backend (Real Time Database and Registration)`}
          </p>
          <p>- Material UI for better style and icons</p>
          <p>- Tailwind CSS</p>
          <h3>About Me:</h3>
          <p>- Creator: Ulugbek</p>
          <p>- Email: Ulugb3k270@gmail.com</p>
          <div className="about__links">
            <a
              href="https://github.com/ulugb3k-270"
              rel="noreferrer"
              target="_blank"
            >
              Github
            </a>
            <a
              href="https://www.instagram.com/ulugb3k_270/"
              rel="noreferrer"
              target="_blank"
            >
              Instagram
            </a>
            <a href="https://t.me/Ulugb3k_270" rel="noreferrer" target="_blank">
              Telegram
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
