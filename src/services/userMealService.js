import http from "../http-common";

const openUserMeal = (id, data, token) => {
  return http.post(`/userMeal/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getUserMeal = (id, token) => {
  return http.get(`/userMeal/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getSingleUserMeal = (id, data, token) => {
  return http.post(`/userMeal/user/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateUserMeal = (id, data, token) => {
  return http.put(`/userMeal/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAllUserMeals = (token, pageNumber, pageSize) => {
  return http.get(`/userMeal?page=${pageNumber}&pageSize=${pageSize}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const userMealService = {
  openUserMeal,
  getUserMeal,
  getSingleUserMeal,
  updateUserMeal,
  getAllUserMeals,
};

export default userMealService;
