import http from "../http-common";

const createMeal = (data, token) => {
  return http.post("/meal", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getCurrentMeals = (token) => {
  return http.get("/meal/current", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getPreviousMeals = (token) => {
  return http.get("/meal/previous", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateMeal = (id, data, token) => {
  return http.put(`/meal/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getMeal = (id, token) => {
  return http.get(`/meal/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const mealService = {
  createMeal,
  getCurrentMeals,
  getPreviousMeals,
  updateMeal,
  getMeal,
};

export default mealService;
