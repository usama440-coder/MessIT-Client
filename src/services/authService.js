import http from "../http-common";

const login = (data) => {
  return http.post("/users/login", data);
};

const authService = {
  login,
};

export default authService;
