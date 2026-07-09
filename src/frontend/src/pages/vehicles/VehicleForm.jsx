import { useEffect, useState } from "react";
import { getUsersRequest } from "../../api/users.api";

import {
  createVehicleRequest,
  updateVehicleRequest,
} from "../../api/vehicles.api";

import { getErrorMessage } from "../../utils/errorHandler";

export default function VehicleForm({
  vehicle = null,
  onSuccess,
  onCancel,
}) {
  const [form, setForm] = useState({
    owner: vehicle?.owner?._id || vehicle?.owner || "",
    brand: vehicle?.brand || "",
    model: vehicle?.model || "",
    year: vehicle?.year || "",
    plate: vehicle?.plate || "",
    vin: vehicle?.vin || "",
    engine: vehicle?.engine || "",
    transmission: vehicle?.transmission || "MANUAL",
    fuelType: vehicle?.fuelType || "GASOLINE",
    color: vehicle?.color || "",
    isActive: vehicle?.isActive ?? true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await getUsersRequest();
        setUsers(response.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadUsers();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = {
        ...form,
        year: Number(form.year),
      };

      let response;

      if (vehicle) {
        response = await updateVehicleRequest(vehicle._id, payload);
      } else {
        response = await createVehicleRequest(payload);
      }

      onSuccess(response.data.message);

    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded border border-red-300 bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      <select
        className="w-full rounded border p-2"
        name="owner"
        value={form.owner}
        onChange={handleChange}
      >
        <option value="">
          Seleccione un propietario
        </option>

        {users.map((user) => (
          <option
            key={user._id}
            value={user._id}
          >
            {user.firstName} {user.lastName}
          </option>
        ))}
      </select>

      <input
        className="w-full rounded border p-2"
        name="brand"
        placeholder="Marca"
        value={form.brand}
        onChange={handleChange}
        required
      />

      <input
        className="w-full rounded border p-2"
        name="model"
        placeholder="Modelo"
        value={form.model}
        onChange={handleChange}
        required
      />

      <input
        className="w-full rounded border p-2"
        type="number"
        name="year"
        placeholder="Año"
        min="1900"
        max={new Date().getFullYear() + 1}
        value={form.year}
        onChange={handleChange}
        required
      />

      <input
        className="w-full rounded border p-2"
        name="plate"
        placeholder="Placa"
        value={form.plate}
        onChange={handleChange}
        required
      />

      <input
        className="w-full rounded border p-2"
        name="vin"
        placeholder="VIN"
        value={form.vin}
        onChange={handleChange}
        maxLength={17}
        required
      />

      <input
        className="w-full rounded border p-2"
        name="engine"
        placeholder="Motor"
        value={form.engine}
        onChange={handleChange}
      />

      <select
        className="w-full rounded border p-2"
        name="transmission"
        value={form.transmission}
        onChange={handleChange}
      >
        <option value="MANUAL">MANUAL</option>
        <option value="AUTOMATIC">AUTOMATIC</option>
      </select>

      <select
        className="w-full rounded border p-2"
        name="fuelType"
        value={form.fuelType}
        onChange={handleChange}
      >
        <option value="GASOLINE">GASOLINE</option>
        <option value="DIESEL">DIESEL</option>
        <option value="HYBRID">HYBRID</option>
        <option value="ELECTRIC">ELECTRIC</option>
      </select>

      <input
        className="w-full rounded border p-2"
        name="color"
        placeholder="Color"
        value={form.color}
        onChange={handleChange}
        required
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
        />

        Activo
      </label>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}