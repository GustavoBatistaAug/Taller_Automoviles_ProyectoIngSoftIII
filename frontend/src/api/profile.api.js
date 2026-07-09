import axiosInstance from "./axios";

export const getProfileRequest = () =>
  axiosInstance.get("/auth/profile");

export const updateProfileRequest = (data) =>
  axiosInstance.put("/auth/profile", data);

export const changePasswordRequest = (data) =>
  axiosInstance.put("/auth/profile/change-password", data);