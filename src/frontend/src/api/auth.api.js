import axios from "./axios";

export const loginRequest = (credentials) =>
  axios.post("/auth/login", credentials);

export const registerRequest = (data) =>
  axios.post("/auth/register", data);

export const profileRequest = () =>
  axios.get("/auth/profile");