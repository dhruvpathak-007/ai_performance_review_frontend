import PropTypes from "prop-types";

const ReviewHistory = ({ review, onClose }) => {
  // Function to format date to IST
  const formatDateToIST = (dateString) => {
    const date = new Date(dateString);
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    return new Intl.DateTimeFormat("en-IN", options).format(date);
  };

  return (
    <div className="review-history">
      <div className="section-heading">
        <h3 style={{ color: "#c58255" }}>
          Review History for {review.employeeName}
        </h3>
        <button onClick={onClose}>Close</button>
      </div>

      <ul>
        {review.feedback.map((rev) => {
          // Format the date to IST
          const formattedDate = formatDateToIST(rev.createdAt);

          return (
            <li key={rev._id} style={{ marginTop: "10px", color: "white" }}>
              <strong style={{ color: "white" }}>Review Date:</strong>{" "}
              {formattedDate}
              <p>{rev.review}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ReviewHistory.propTypes = {
  review: PropTypes.shape({
    employeeName: PropTypes.string.isRequired,
    employeeID: PropTypes.string.isRequired,
    feedback: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        review: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReviewHistory;
