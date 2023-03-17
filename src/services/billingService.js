import http from "../http-common";

const createBill = (data, token) => {
  return http.post("/bill", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getBills = (token, pageNumber, pageSize, paid) => {
  return http.get(
    `/bill?page=${pageNumber}&pageSize=${pageSize}&paid=${paid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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

const getBill = (id, token) => {
  return http.get(`/bill/${id}`, {
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
  getBill,
};

export default billingService;
