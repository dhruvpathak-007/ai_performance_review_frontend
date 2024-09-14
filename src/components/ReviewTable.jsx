import { useEffect, useState } from "react";
import {
  getReviews,
  deleteReview,
  updateReview,
  generateFeedback,
} from "../api";
import {
  faEdit,
  faTrashAlt,
  faDownload,
  faRedo,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import ReviewPopup from "./ReviewPopUp";
import ShowNewReview from "./ShowNewReview";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReviewHistory from "./ReviewHistory";

const ReviewTable = () => {
  const [reviews, setReviews] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isNewReviewPopupOpen, setIsNewReviewPopupOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [newFeedback, setNewFeedback] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviews();
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleDownloadPDF = (review) => {
    console.log("revew dat ias", review);
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = 30;
    const margin = 14;
    const lineHeight = 10;

    const addText = (text) => {
      const lines = doc.splitTextToSize(
        text,
        doc.internal.pageSize.width - 2 * margin
      );
      lines.forEach((line) => {
        if (yPosition + lineHeight > pageHeight) {
          doc.addPage();
          yPosition = 30;
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
    };

    doc.setFontSize(16);
    addText("Current Employee Reviews");

    doc.setFontSize(12);
    addText(`Name: ${review.employeeName}`);
    addText(`ID: ${review.employeeID}`);
    addText(`Email: ${review.employeeEmail}`);
    addText(`Phone: ${review.employeePhone}`);

    yPosition += lineHeight * 2;

    addText("Metrics");
    addText(`Teamwork: ${review.teamwork}`);
    addText(`Punctuality: ${review.punctuality}`);
    addText(`Productivity: ${review.productivity}`);
    addText(`Communication: ${review.communication}`);
    addText(`EvaluationPeriod: ${review.evaluationPeriod} months`);

    yPosition += lineHeight;

    addText("Reviews");

    (review.feedback || []).forEach((feedback, feedbackIndex) => {
      const reviewContent = feedback.review || "";
      addText(
        `Review ${feedbackIndex + 1}, Created At: ${new Date(
          feedback.createdAt
        ).toLocaleDateString()}`
      );
      addText(reviewContent);
      yPosition += lineHeight * 2;
    });

    yPosition += lineHeight * 2;

    doc.save("all_reviews.pdf");
  };

  const handleGenerateAgain = async (review) => {
    setIsNewReviewPopupOpen(true);
    setIsFetching(true);

    try {
      const newFeedback = await generateFeedback(review);

      const feedbackObject = {
        review: newFeedback,
        createdAt: new Date(),
      };

      setNewFeedback(feedbackObject);

      const updatedReview = {
        ...review,
        feedback: [...(review.feedback || []), feedbackObject],
      };

      await updateReview(updatedReview._id, updatedReview);
      setReviews(
        reviews.map((r) => (r._id === updatedReview._id ? updatedReview : r))
      );
    } catch (error) {
      console.error("Error generating feedback or updating review:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleEditClick = (review) => {
    setSelectedReview(review);
    setIsPopupOpen(true);
  };

  const handleUpdate = async (updatedReview) => {
    try {
      await updateReview(updatedReview._id, updatedReview);
      setReviews(
        reviews.map((review) =>
          review._id === updatedReview._id ? updatedReview : review
        )
      );
      setIsPopupOpen(false);
      setSelectedReview(null);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleHistoryClick = (review) => {
    setSelectedReview(review);
    setIsHistoryOpen(true);
  };

  return (
    <div className="review-table-container">
      <h2>Performance Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Productivity</th>
            <th>Teamwork</th>
            <th>Punctuality</th>
            <th>Problem Solving</th>
            <th>Period mnts.</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id}>
              <td>{review.employeeName}</td>
              <td>{review.employeeID}</td>
              <td>{review.employeeEmail}</td>
              <td>{review.employeePhone}</td>
              <td>{review.productivity}</td>
              <td>{review.teamwork}</td>
              <td>{review.punctuality}</td>
              <td>{review.problemSolving}</td>
              <td>{review.evaluationPeriod}</td>
              <td>
                <FontAwesomeIcon
                  icon={faEdit}
                  data-tooltip="Edit"
                  className="action-icon edit-icon"
                  onClick={() => handleEditClick(review)}
                />
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="action-icon delete-icon"
                  onClick={() => handleDelete(review._id)}
                />
                <FontAwesomeIcon
                  icon={faDownload}
                  className="action-icon download-icon"
                  onClick={() => handleDownloadPDF(review)}
                />
                <FontAwesomeIcon
                  icon={faRedo}
                  className="action-icon generate-icon"
                  onClick={() => handleGenerateAgain(review)}
                />
                <FontAwesomeIcon
                  icon={faHistory}
                  data-tooltip="View History"
                  className="action-icon history-icon"
                  onClick={() => handleHistoryClick(review)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && (
        <ReviewPopup
          review={selectedReview}
          onClose={() => setIsPopupOpen(false)}
          onUpdate={handleUpdate}
        />
      )}

      {isNewReviewPopupOpen && (
        <ShowNewReview
          feedback={newFeedback}
          onClose={() => setIsNewReviewPopupOpen(false)}
          isFetching={isFetching}
        />
      )}

      {isHistoryOpen && (
        <ReviewHistory
          review={selectedReview}
          onClose={() => setIsHistoryOpen(false)}
        />
      )}
    </div>
  );
};

export default ReviewTable;
