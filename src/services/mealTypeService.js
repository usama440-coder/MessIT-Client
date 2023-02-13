import http from "../http-common";

const getMealType = (token) => {
  return http.get("/mealType", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const mealTypeService = {
  getMealType,
};

export default mealTypeService;
