import http from "../http-common";

const createMeal = (data, token) => {
  return http.post("/meal", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getMeals = (token) => {
  return http.get("/meal", {
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

const mealService = {
  createMeal,
  getMeals,
  updateMeal,
};

export default mealService;
