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

const userService = {
  getUsers,
  addUser,
};

export default userService;
