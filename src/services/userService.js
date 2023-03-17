import http from "../http-common";

const getUsers = (token, pageNumber, pageSize, mess) => {
  return http.get(
    `/users?page=${pageNumber}&pageSize=${pageSize}&mess=${mess}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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

const getUser = (id, token) => {
  return http.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const resetPassword = (user, token, password) => {
  return http.post("/users/reset-password", { id: user, token, password });
};

const resetPasswordRequest = (email) => {
  return http.post("/users/reset-password-link", { email });
};

const userService = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getUser,
  resetPassword,
  resetPasswordRequest,
};

export default userService;
