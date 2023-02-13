import http from "../http-common";

const addItem = (data, token) => {
  return http.post("/items", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getItems = (token) => {
  return http.get("/items", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const itemService = {
  addItem,
  getItems,
};

export default itemService;
