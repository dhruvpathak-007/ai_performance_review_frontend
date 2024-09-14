import { useState } from "react";
import PropTypes from "prop-types";
import "../App.css"; // Ensure to style the popup

const ReviewPopup = ({ review, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(review);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Edit Review</h2>
        <form onSubmit={handleSubmit} className="review-form">
          {/* Section for Personal Information */}
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="employeeEmail">Employee Email</label>
              <input
                type="text"
                name="employeeEmail"
                id="employeeEmail"
                value={formData.employeeEmail}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="employeePhone">Employee Phone</label>
              <input
                type="text"
                name="employeePhone"
                id="employeePhone"
                value={formData.employeePhone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="evaluationPeriod">Evaluation Period</label>
              <input
                type="text"
                name="evaluationPeriod"
                id="evaluationPeriod"
                value={formData.evaluationPeriod}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="productivity">Productivity (1-10)</label>
              <input
                type="number"
                name="productivity"
                id="productivity"
                value={formData.productivity}
                onChange={handleChange}
                min="1"
                max="10"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="teamwork">Teamwork (1-10)</label>
              <input
                type="number"
                name="teamwork"
                id="teamwork"
                value={formData.teamwork}
                onChange={handleChange}
                min="1"
                max="10"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="punctuality">Punctuality (1-10)</label>
              <input
                type="number"
                name="punctuality"
                id="punctuality"
                value={formData.punctuality}
                onChange={handleChange}
                min="1"
                max="10"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="communication">Communication (1-10)</label>
              <input
                type="number"
                name="communication"
                id="communication"
                value={formData.communication}
                onChange={handleChange}
                min="1"
                max="10"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="problemSolving">Problem-solving (1-10)</label>
              <input
                type="number"
                name="problemSolving"
                id="problemSolving"
                value={formData.problemSolving}
                onChange={handleChange}
                min="1"
                max="10"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Update
          </button>
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

ReviewPopup.propTypes = {
  review: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ReviewPopup;
