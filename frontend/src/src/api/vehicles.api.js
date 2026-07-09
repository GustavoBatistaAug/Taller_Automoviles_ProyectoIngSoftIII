import axiosInstance from "./axios";

export const getVehiclesRequest = () =>
  axiosInstance.get("/vehicles");

export const getVehicleRequest = (id) =>
  axiosInstance.get(`/vehicles/${id}`);

export const createVehicleRequest = (data) =>
  axiosInstance.post("/vehicles", data);

export const updateVehicleRequest = (id, data) =>
  axiosInstance.put(`/vehicles/${id}`, data);

export const deleteVehicleRequest = (id) =>
  axiosInstance.delete(`/vehicles/${id}`);