import api from "./axios";

/**
 * Obtener todos los usuarios
 */
export const getUsersRequest = () => {
  return api.get("/auth/users");
};

/**
 * Obtener un usuario por ID
 */
export const getUserByIdRequest = (id) => {
  return api.get(`/users/${id}`);
};

/**
 * Actualizar un usuario
 */
export const updateUserRequest = (id, data) => {
  return api.put(`/users/${id}`, data);
};

/**
 * Eliminar un usuario
 */
export const deleteUserRequest = (id) => {
  return api.delete(`/users/${id}`);
};