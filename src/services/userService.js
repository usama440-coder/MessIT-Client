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
  console.log(id);
  return http.get(`/users/${id}`, {
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
  getUser,
};

export default userService;
