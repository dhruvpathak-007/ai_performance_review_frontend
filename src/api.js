import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const getReviews = () => {
  return axios.get(`${BASE_URL}/reviews`);
};

export const createReview = (reviewData) => {
  return axios.post(`${BASE_URL}/reviews`, reviewData);
};

export const deleteReview = (id) => {
  return axios.delete(`${BASE_URL}/reviews/${id}`);
};

export const updateReview = (id, updatedReview) => {
  return axios.put(`${BASE_URL}/reviews/${id}`, updatedReview);
};

export const getReviewHistory = (employeeID) => {
  return axios.get(`${BASE_URL}/reviews/employee/${employeeID}`);
};

export const generateFeedback = async (metrics) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/generate-feedback`,
      metrics
    );
    return response.data.feedback;
  } catch (error) {
    console.error("Error generating feedback:", error);
    throw error;
  }
};

export const generateComparisonFeedback = async (
  employee1Data,
  employee2Data,
  areaOfComparison
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/generate-comparison-feedback`,
      { employee1Data, employee2Data, areaOfComparison }
    );

    return response.data.feedback;
  } catch (error) {
    console.error("Error generating comparison feedback:", error);
    throw error;
  }
};
