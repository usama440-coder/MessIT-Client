import http from "../http-common";

const addReview = (id, data, token) => {
  return http.post(`/review/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getReviews = (token) => {
  return http.get(`/review`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const reviewService = {
  addReview,
  getReviews,
};

export default reviewService;
