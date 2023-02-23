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

const updateItem = (id, data, token) => {
  return http.put(`/items/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteItem = (id, token) => {
  return http.delete(`/items/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const itemService = {
  addItem,
  getItems,
  updateItem,
  deleteItem,
};

export default itemService;
