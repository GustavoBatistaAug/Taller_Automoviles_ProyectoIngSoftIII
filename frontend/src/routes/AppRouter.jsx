import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import UserList from "../pages/users/UserList";
import VehicleList from "../pages/vehicles/VehicleList";
import ServiceList from "../pages/services/ServiceList";
import PartsList from "../pages/parts/PartsList";
import Profile from "../pages/profile/Profile";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />

      {/* Rutas privadas */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/parts" element={<PartsList />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}