import http from "../http-common";

const getUsers = (token) => {
  return http.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const addUser = (data, token) => {
  return http.post("/users", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateUser = (id, data, token) => {
  return http.put(`/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteUser = (id, token) => {
  return http.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const userService = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};

export default userService;
