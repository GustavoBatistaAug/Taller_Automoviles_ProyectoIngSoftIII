import axiosInstance from "./axios";

export const getPartsRequest = () =>
  axiosInstance.get("/parts");

export const getPartRequest = (id) =>
  axiosInstance.get(`/parts/${id}`);

export const createPartRequest = (data) =>
  axiosInstance.post("/parts", data);

export const updatePartRequest = (id, data) =>
  axiosInstance.put(`/parts/${id}`, data);

export const deletePartRequest = (id) =>
  axiosInstance.delete(`/parts/${id}`);

// Endpoints adicionales disponibles en el backend

export const getActivePartsRequest = () =>
  axiosInstance.get("/parts/active");

export const getLowStockPartsRequest = () =>
  axiosInstance.get("/parts/low-stock");

export const getPartsByCategoryRequest = (category) =>
  axiosInstance.get(`/parts/category/${category}`);

export const getPartsByBrandRequest = (brand) =>
  axiosInstance.get(`/parts/brand/${brand}`);

export const stockInPartRequest = (id, quantity) =>
  axiosInstance.patch(`/parts/${id}/stock-in`, {
    quantity,
  });

export const stockOutPartRequest = (id, quantity) =>
  axiosInstance.patch(`/parts/${id}/stock-out`, {
    quantity,
  });