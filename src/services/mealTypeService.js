import http from "../http-common";

const getMealType = (token) => {
  return http.get("/mealType", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createMealType = (data, token) => {
  return http.post("/mealType", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const mealTypeService = {
  getMealType,
  createMealType,
};

export default mealTypeService;
