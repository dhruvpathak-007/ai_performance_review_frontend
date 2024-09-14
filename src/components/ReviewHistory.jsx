import PropTypes from "prop-types";

const ReviewHistory = ({ review, onClose }) => {
  return (
    <div className="review-history">
      <h3>Review History for {review.employeeName}</h3>
      <button onClick={onClose}>Close</button>
      <ul>
        {review.feedback.map((rev) => (
          <li key={rev._id}>
            <strong>Review Date:</strong>{" "}
            {new Date(rev.createdAt).toISOString()}
            <p>{rev.review}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

ReviewHistory.propTypes = {
  review: PropTypes.shape({
    employeeName: PropTypes.string.isRequired,
    employeeID: PropTypes.string.isRequired,
    feedback: PropTypes.array,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReviewHistory;
