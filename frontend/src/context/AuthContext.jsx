import { createContext, useEffect, useState } from "react";
import { loginRequest, profileRequest } from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  /**
   * Iniciar sesión
   */
  const login = async (credentials) => {
    const response = await loginRequest(credentials);

    const { user, token } = response.data.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
    setIsAuthenticated(true);

    return response;
  };

  /**
   * Cerrar sesión
   */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  /**
   * Restaurar sesión al recargar la página
   */
  useEffect(() => {
    const checkLogin = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await profileRequest();

        setUser(response.data.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);

        logout();
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}