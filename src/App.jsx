import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReviewForm from "./components/ReviewForm";
import ReviewTable from "./components/ReviewTable";
import Home from "./components/Home";
import EmployeeComparison from "./components/EmployeeComparison";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review-form" element={<ReviewForm />} />
          <Route path="/submitted-reviews" element={<ReviewTable />} />
          <Route path="employee-comparison" element={<EmployeeComparison />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
