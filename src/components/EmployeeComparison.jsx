import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateComparisonFeedback, getReviews } from "../api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EmployeeComparison = () => {
  const [employees, setEmployees] = useState([]);
  const [employee1, setEmployee1] = useState("");
  const [employee2, setEmployee2] = useState("");
  const [employee1Data, setEmployee1Data] = useState({});
  const [employee2Data, setEmployee2Data] = useState({});
  const [areaOfComparison, setAreaOfComparison] = useState("All");
  const [comparisonFeedback, setComparisonFeedback] = useState("");
  const [chartData, setChartData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [compareEnabled, setCompareEnabled] = useState(false); // New state for enabling compare button

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getReviews();
      setEmployees(response.data);
    };
    fetchEmployees();
  }, []);

  const handleCheckDetails = () => {
    if (!employee1 || !employee2) return;

    const emp1Data = employees.find((emp) => emp._id === employee1);
    const emp2Data = employees.find((emp) => emp._id === employee2);

    setEmployee1Data(emp1Data);
    setEmployee2Data(emp2Data);
    setShowDetails(true);
    setCompareEnabled(true); // Enable the Compare button after details are checked
    setChartData(null); // Reset chartData to hide chart after re-checking details
    setComparisonFeedback("");
  };

  const handleCompare = async () => {
    if (!employee1 || !employee2) return;

    try {
      const feedback = await generateComparisonFeedback(
        employee1Data,
        employee2Data,
        areaOfComparison
      );
      setComparisonFeedback(feedback);

      const labels = [];
      const emp1Scores = [];
      const emp2Scores = [];

      if (areaOfComparison === "Productivity" || areaOfComparison === "All") {
        labels.push("Productivity");
        emp1Scores.push(employee1Data.productivity);
        emp2Scores.push(employee2Data.productivity);
      }
      if (areaOfComparison === "Punctuality" || areaOfComparison === "All") {
        labels.push("Punctuality");
        emp1Scores.push(employee1Data.punctuality);
        emp2Scores.push(employee2Data.punctuality);
      }
      if (areaOfComparison === "Teamwork" || areaOfComparison === "All") {
        labels.push("Teamwork");
        emp1Scores.push(employee1Data.teamwork);
        emp2Scores.push(employee2Data.teamwork);
      }
      if (areaOfComparison === "Communication" || areaOfComparison === "All") {
        labels.push("Communication");
        emp1Scores.push(employee1Data.communication);
        emp2Scores.push(employee2Data.communication);
      }
      if (
        areaOfComparison === "Problem-solving" ||
        areaOfComparison === "All"
      ) {
        labels.push("Problem-solving");
        emp1Scores.push(employee1Data.problemSolving);
        emp2Scores.push(employee2Data.problemSolving);
      }
      if (
        areaOfComparison === "Evaluation-Period" ||
        areaOfComparison === "All"
      ) {
        labels.push("Evaluation-Period");
        emp1Scores.push(employee1Data.evaluationPeriod);
        emp2Scores.push(employee2Data.evaluationPeriod);
      }

      setChartData({
        labels,
        datasets: [
          {
            label: employee1Data.employeeName,
            data: emp1Scores,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: employee2Data.employeeName,
            data: emp2Scores,
            backgroundColor: "#d9b08c",
          },
        ],
      });
    } catch (error) {
      console.error("Error comparing employees:", error);
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="employee-comparison-container">
      <div className="section-heading">
        <h2 style={{ color: "#c58255" }}>Compare</h2>
        <button className="button" onClick={handleBackClick}>
          Back
        </button>
      </div>

      {/* Selection section */}
      <div className="employee-selection-section">
        <div>
          <label style={{ color: "white" }}>First Employee</label>
          <select
            className="select-input"
            value={employee1}
            onChange={(e) => setEmployee1(e.target.value)}
          >
            <option value="">Select Employee 1</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.employeeName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ color: "white" }}>Second Employee</label>
          <select
            className="select-input"
            value={employee2}
            onChange={(e) => setEmployee2(e.target.value)}
          >
            <option value="">Select Employee 2</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.employeeName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ color: "white" }}>Area of Comparison</label>
          <select
            className="select-input"
            value={areaOfComparison}
            onChange={(e) => setAreaOfComparison(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Productivity">Productivity</option>
            <option value="Punctuality">Punctuality</option>
            <option value="Teamwork">Teamwork</option>
            <option value="Communication">Communication</option>
            <option value="Problem-solving">Problem-solving</option>
            <option value="Evaluation-Period">Evaluation Period</option>
          </select>
        </div>

        <div
          className="button-section"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <button
            className="button"
            onClick={handleCheckDetails}
            disabled={!employee1 || !employee2}
          >
            Check Details
          </button>
        </div>
      </div>

      {showDetails && (
        <>
          <div
            className="details-section"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <div className="employee-details">
              <h4 style={{ color: "#116466" }}>{employee1Data.employeeName}</h4>
              <p>Email: {employee1Data.email}</p>
              <p>Productivity: {employee1Data.productivity}</p>
              <p>Punctuality: {employee1Data.punctuality}</p>
              <p>Teamwork: {employee1Data.teamwork}</p>
              <p>Communication: {employee1Data.communication}</p>
              <p>Problem Solving: {employee1Data.problemSolving}</p>
              <p>Evaluation Period: {employee1Data.evaluationPeriod}</p>
            </div>

            <div className="employee-details">
              <h4 style={{ color: "#d9b08c" }}>{employee2Data.employeeName}</h4>
              <p>Email: {employee2Data.email}</p>
              <p>Productivity: {employee2Data.productivity}</p>
              <p>Punctuality: {employee2Data.punctuality}</p>
              <p>Teamwork: {employee2Data.teamwork}</p>
              <p>Communication: {employee2Data.communication}</p>
              <p>Problem-solving: {employee2Data.problemSolving}</p>
              <p>Evaluation Period: {employee2Data.evaluationPeriod}</p>
            </div>
          </div>

          {/* Ratings Section */}
          <div className="metrics-section" style={{ marginTop: "20px" }}>
            <div className="metric-item">
              <label style={{ color: "white" }}>Overall Ratings:</label>
              <div className="horizontal-bar">
                <div
                  style={{
                    width: `${
                      ((employee1Data.productivity +
                        employee1Data.punctuality +
                        employee1Data.teamwork +
                        employee1Data.communication +
                        employee1Data.problemSolving) *
                        10) /
                      5
                    }%`,
                    backgroundColor: "#116466",
                    height: "20px",
                  }}
                ></div>
                <div
                  style={{
                    width: `${
                      ((employee2Data.productivity +
                        employee2Data.punctuality +
                        employee2Data.teamwork +
                        employee2Data.communication +
                        employee2Data.problemSolving) *
                        10) /
                      5
                    }%`,
                    backgroundColor: "#d9b08c",
                    height: "20px",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Compare Button */}
      {showDetails && !chartData && (
        <div
          className="compare-section"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <button
            className="button"
            onClick={handleCompare}
            disabled={!compareEnabled}
          >
            Compare
          </button>
        </div>
      )}

      {/* Bar Chart Section */}
      {chartData && (
        <div className="chart-container" style={{ marginTop: "20px" }}>
          <Bar data={chartData} />
        </div>
      )}

      {/* Feedback Section */}
      {comparisonFeedback && (
        <div className="feedback-section">Feedback: {comparisonFeedback}</div>
      )}
    </div>
  );
};

export default EmployeeComparison;
