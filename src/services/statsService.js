import http from "../http-common";

const getUserStats = (token) => {
  return http.get("/stats/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getSecretaryStats = (token) => {
  return http.get("/stats/secretary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getCashierStats = (token) => {
  return http.get("/stats/cashier", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAdminStats = (token) => {
  return http.get("/stats/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const statsService = {
  getUserStats,
  getSecretaryStats,
  getCashierStats,
  getAdminStats,
};

export default statsService;
