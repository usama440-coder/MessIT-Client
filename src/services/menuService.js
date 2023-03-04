import http from "../http-common";

const createMenu = (data, token) => {
  return http.post("/menu", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getMenu = (token) => {
  return http.get("/menu", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateMenu = (id, data, token) => {
  return http.put(`/menu/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const menuService = {
  createMenu,
  getMenu,
  updateMenu,
};

export default menuService;
