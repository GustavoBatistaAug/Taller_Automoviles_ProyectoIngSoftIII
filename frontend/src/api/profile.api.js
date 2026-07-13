import axiosInstance from "./axios";

export const getProfileRequest = () =>
  axiosInstance.get("/auth/profile");

export const updateProfileRequest = (id, data) =>
  axiosInstance.put(`/auth/profile/${id}`, data);

export const changePasswordRequest = (data) =>
  axiosInstance.put("/auth/profile/change-password", data);