import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ReviewForm from "./components/ReviewForm";
import ReviewTable from "./components/ReviewTable";
import { useNavigate } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review-form" element={<ReviewForm />} />
          <Route path="/submitted-reviews" element={<ReviewTable />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/review-form");
  };

  return (
    <div className="splash-screen">
      <div className="content">
        <h1>Welcome To AI Employee Performance Review System</h1>
        <h3>Designed And Developed By Dhruv Pathak</h3>

        <button className="start-button" onClick={handleStartClick}>
          Let Start
        </button>
      </div>
    </div>
  );
};

export default App;
