import axios from "axios";

export const axiosWithAuth = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  return axios.create({
    baseURL: "http://localhost:5001",
    headers: {
      Authorization: token
    }
  });
};
