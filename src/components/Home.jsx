import { useNavigate, Link } from "react-router-dom";
import "../Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleStartClick = () => {
    navigate("/review-form");
  };

  const handleSubmittedReviewsClick = () => {
    navigate("/submitted-reviews");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Navigation */}
      <nav>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="menu-icon">&#9776;</span>
        </button>
        <ul className={`nav__links ${isMenuOpen ? "open" : ""}`}>
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/review-form">Generate</Link>
          </li>
          <li className="link">
            <Link to="/submitted-reviews">Reviews</Link>
          </li>
          <li className="link">
            <a
              href="https://www.linkedin.com/in/dhruv-pathak-7773191b6/"
              target="_blank"
              rel="noopener noreferrer"
            >
              About
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Container */}
      <div className="container">
        {/* Left Content */}
        <div className="container__left">
          <div className="left__content">
            <h4>Welcome to the AI Performance Review System</h4>
            <p>
              Our intelligent system analyzes employee performance to ensure
              efficiency and growth in your organization.
            </p>
          </div>
        </div>

        {/* Right Content */}
        <div className="container__right">
          <div className="right__content">
            <h1>AI Insights</h1>
            <h4>Employee Review System</h4>
            <p>
              Effortlessly evaluate your team’s performance with our AI-powered
              review system. Designed to provide actionable feedback for
              enhanced productivity.
            </p>
            <div className="action__btns">
              <button className="btn primary__btn" onClick={handleStartClick}>
                Start Review
              </button>
              <button
                className="btn secondary__btn"
                onClick={handleSubmittedReviewsClick}
              >
                Submitted Reviews
              </button>
            </div>
            <div className="socials">
              <span>
                <a
                  href="https://www.linkedin.com/in/dhruv-pathak-7773191b6/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    size="1x"
                    style={{ color: "#ffffff" }}
                  />
                </a>
              </span>
              <span>
                <a
                  href="https://github.com/dhruvpathak-007"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    size="1x"
                    style={{ color: "#ffffff" }}
                  />
                </a>
              </span>
              <span>
                <a
                  href="https://mail.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faGoogle}
                    size="1x"
                    style={{ color: "#ffffff" }}
                  />
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
