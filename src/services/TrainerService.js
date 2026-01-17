import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
});

export const fetchTrainers = async () => {
  const res = await axios.get(`${API_URL}/trainers/`);
  return res.data;
};

export const fetchTrainerById = async (id) => {
  const res = await axios.get(`${API_URL}/trainers/${id}/`);
  return res.data;
};

export const createTrainer = async (data) => {
  const res = await axios.post(`${API_URL}/trainers/`, data, {
    headers: authHeader(),
  });
  return res.data;
};

export const updateTrainer = async (id, data) => {
  const res = await axios.put(`${API_URL}/trainers/${id}/`, data, {
    headers: authHeader(),
  });
  return res.data;
};

export const deleteTrainer = async (id) => {
  await axios.delete(`${API_URL}/trainers/${id}/`, {
    headers: authHeader(),
  });
};
