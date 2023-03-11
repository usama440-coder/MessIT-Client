import http from "../http-common";

const getAllMess = (token) => {
  return http.get("/mess", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const addMess = (data, token) => {
  return http.post("/mess", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteMess = (id, token) => {
  return http.delete(`mess/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateMess = (id, data, token) => {
  return http.put(`mess/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const messService = {
  getAllMess,
  addMess,
  deleteMess,
  updateMess,
};

export default messService;
