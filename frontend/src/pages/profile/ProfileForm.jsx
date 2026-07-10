import { useState } from "react";

import { updateProfileRequest } from "../../api/profile.api";
import { getErrorMessage } from "../../utils/errorHandler";

export default function ProfileForm({
  profile,
  onSuccess,
  onCancel,
}) {
  const [form, setForm] = useState({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
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

      const response = await updateProfileRequest(form);

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

      <input
        className="w-full rounded border p-2"
        name="firstName"
        placeholder="Nombre"
        value={form.firstName}
        onChange={handleChange}
      />

      <input
        className="w-full rounded border p-2"
        name="lastName"
        placeholder="Apellido"
        value={form.lastName}
        onChange={handleChange}
      />

      <input
        className="w-full rounded border p-2"
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
      />

      <input
        className="w-full rounded border p-2"
        name="phone"
        placeholder="Teléfono"
        value={form.phone}
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