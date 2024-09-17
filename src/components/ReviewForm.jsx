import { useState } from "react";
import { createReview, generateFeedback, updateReview } from "../api";
import "../App.css";
import { useNavigate } from "react-router-dom";

const ReviewForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeName: "",
    employeeID: "",
    employeeEmail: "",
    employeePhone: "",
    evaluationPeriod: "",
    productivity: "",
    teamwork: "",
    punctuality: "",
    communication: "",
    problemSolving: "",
  });

  const [submittedReview, setSubmittedReview] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createReview(formData);
      setSubmittedReview(result.data);

      setFormData({
        employeeName: "",
        employeeID: "",
        employeeEmail: "",
        employeePhone: "",
        evaluationPeriod: "",
        productivity: "",
        teamwork: "",
        punctuality: "",
        communication: "",
        problemSolving: "",
      });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleGenerateFeedback = async () => {
    if (!submittedReview) return;

    try {
      setIsGenerating(true);

      const payload = {
        productivity: submittedReview.productivity,
        teamwork: submittedReview.teamwork,
        punctuality: submittedReview.punctuality,
        communication: submittedReview.communication,
        problemSolving: submittedReview.problemSolving,
      };

      console.log("Payload for feedback generation:", payload);

      const newFeedback = await generateFeedback(payload);

      console.log("New feedback:", newFeedback);

      const feedbackObject = {
        review: newFeedback,
        createdAt: new Date(),
      };

      setFeedback(feedbackObject);

      const updatedReview = {
        ...submittedReview,
        feedback: [...(submittedReview.feedback || []), feedbackObject],
      };

      await updateReview(updatedReview._id, updatedReview);

      setSubmittedReview(updatedReview);
    } catch (error) {
      console.error("Error generating feedback or updating review:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="review-form-container">
      <div className="section-heading">
        <h2 style={{ color: "#c58255" }}>Genrate</h2>
        <button className="button" onClick={handleBackClick}>
          Back
        </button>
      </div>

      <div className="top-section">
        {/* Form Section */}
        <div className="form-section">
          <h2>Submit Performance Review</h2>
          <form onSubmit={handleSubmit} className="review-form">
            {/* Form inputs */}
            <input
              type="text"
              name="employeeName"
              placeholder="Employee Name"
              value={formData.employeeName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="employeeID"
              placeholder="Employee ID"
              value={formData.employeeID}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="employeeEmail"
              placeholder="Employee Email"
              value={formData.employeeEmail}
              onChange={handleChange}
            />
            <input
              type="text"
              name="employeePhone"
              placeholder="Employee Phone"
              value={formData.employeePhone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="evaluationPeriod"
              placeholder="Evaluation Period"
              value={formData.evaluationPeriod}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="productivity"
              placeholder="Productivity (1-10)"
              value={formData.productivity}
              onChange={handleChange}
              min="1"
              max="10"
              required
            />
            <input
              type="number"
              name="teamwork"
              placeholder="Teamwork (1-10)"
              value={formData.teamwork}
              onChange={handleChange}
              min="1"
              max="10"
              required
            />
            <input
              type="number"
              name="punctuality"
              placeholder="Punctuality (1-10)"
              value={formData.punctuality}
              onChange={handleChange}
              min="1"
              max="10"
              required
            />
            <input
              type="number"
              name="communication"
              placeholder="Communication (1-10)"
              value={formData.communication}
              onChange={handleChange}
              min="1"
              max="10"
              required
            />
            <input
              type="number"
              name="problemSolving"
              placeholder="Problem-solving (1-10)"
              value={formData.problemSolving}
              onChange={handleChange}
              min="1"
              max="10"
              required
            />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>

        {/* Submitted Details Section */}
        <div className="submitted-details">
          <h2>
            {submittedReview ? "Submitted Review Details" : "Submitted Details"}
          </h2>
          {submittedReview && (
            <div>
              <p>
                <strong>Employee Name:</strong> {submittedReview.employeeName}
              </p>
              <p>
                <strong>Employee ID:</strong> {submittedReview.employeeID}
              </p>
              <p>
                <strong>Employee Email:</strong> {submittedReview.employeeEmail}
              </p>
              <p>
                <strong>Employee Phone:</strong> {submittedReview.employeePhone}
              </p>
              <p>
                <strong>Evaluation Period:</strong>{" "}
                {submittedReview.evaluationPeriod}
              </p>
              <p>
                <strong>Productivity:</strong> {submittedReview.productivity}
              </p>
              <p>
                <strong>Teamwork:</strong> {submittedReview.teamwork}
              </p>
              <p>
                <strong>Punctuality:</strong> {submittedReview.punctuality}
              </p>
              <p>
                <strong>Communication:</strong> {submittedReview.communication}
              </p>
              <p>
                <strong>Problem-solving:</strong>{" "}
                {submittedReview.problemSolving}
              </p>
            </div>
          )}
          <button
            onClick={handleGenerateFeedback}
            className="generate-feedback-button"
            disabled={!submittedReview}
          >
            Generate Feedback
          </button>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="feedback-section">
        <h3>{feedback.review ? "Generated Feedback" : "Feedback"}</h3>
        {isGenerating ? (
          <p>Generating...</p>
        ) : feedback.review ? (
          <div>
            <p>{feedback.review}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ReviewForm;
