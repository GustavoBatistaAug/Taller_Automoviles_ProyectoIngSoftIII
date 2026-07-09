import axiosInstance from "./axios";

export const getServiceRequestsRequest = () =>
  axiosInstance.get("/service-request");

export const getServiceRequestRequest = (id) =>
  axiosInstance.get(`/service-request/${id}`);

export const createServiceRequestRequest = (data) =>
  axiosInstance.post("/service-request", data);

export const updateServiceRequestRequest = (id, data) =>
  axiosInstance.put(`/service-request/${id}`, data);

export const deleteServiceRequestRequest = (id) =>
  axiosInstance.delete(`/service-request/${id}`);