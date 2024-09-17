import PropTypes from "prop-types";
import "../App.css";

const ShowNewReview = ({ feedback, onClose, isFetching }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{isFetching ? "Fetching New Feedback..." : "New Feedback"}</h2>
        {isFetching ? <p>Loading...</p> : <h5>{feedback.review}</h5>}
        <button type="button" className="cancel-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

ShowNewReview.propTypes = {
  feedback: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default ShowNewReview;
