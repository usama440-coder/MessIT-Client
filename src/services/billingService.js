import http from "../http-common";

const createBill = (data, token) => {
  return http.post("/bill", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getBills = (token) => {
  return http.get("/bill", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getBalance = (id, token) => {
  return http.get(`/balance/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateBill = (id, data, token) => {
  return http.put(`/bill/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const billingService = {
  createBill,
  getBills,
  getBalance,
  updateBill,
};

export default billingService;
