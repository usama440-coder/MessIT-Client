import axios from "axios";

export default axios.create({
  baseURL: "https://brainy-teal-nightgown.cyclic.app/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
});
