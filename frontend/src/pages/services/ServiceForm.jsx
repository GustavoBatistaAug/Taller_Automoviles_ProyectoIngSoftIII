import { useState } from "react";

import {
  createServiceRequestRequest,
  updateServiceRequestRequest,
} from "../../api/serviceRequest.api";

import { getErrorMessage } from "../../utils/errorHandler";

const serviceTypes = [
  "GENERAL_INSPECTION",
  "ENGINE",
  "BRAKES",
  "SUSPENSION",
  "TRANSMISSION",
  "OIL_CHANGE",
  "ELECTRICAL",
  "OTHER",
];

const serviceStatuses = [
  "PENDING",
  "ASSIGNED",
  "IN_PROGRESS",
  "WAITING_PARTS",
  "FINISHED",
  "DELIVERED",
  "CANCELLED",
];

export default function ServiceForm({
  service = null,
  onSuccess,
  onCancel,
}) {
  const [form, setForm] = useState({
    clientId: service?.clientId?._id || service?.clientId || "",
    vehicleId: service?.vehicleId?._id || service?.vehicleId || "",
    type: service?.type || "GENERAL_INSPECTION",
    status: service?.status || "PENDING",
    description: service?.description || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (service) {
        await updateServiceRequestRequest(service._id, form);
      } else {
        await createServiceRequestRequest(form);
      }

      onSuccess();
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

      <input
        className="w-full rounded border p-2"
        name="clientId"
        placeholder="ID del cliente"
        value={form.clientId}
        onChange={handleChange}
      />

      <input
        className="w-full rounded border p-2"
        name="vehicleId"
        placeholder="ID del vehículo"
        value={form.vehicleId}
        onChange={handleChange}
      />

      <select
        className="w-full rounded border p-2"
        name="type"
        value={form.type}
        onChange={handleChange}
      >
        {serviceTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        className="w-full rounded border p-2"
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        {serviceStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <textarea
        className="w-full rounded border p-2"
        name="description"
        rows="4"
        placeholder="Descripción de la solicitud"
        value={form.description}
        onChange={handleChange}
      />

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