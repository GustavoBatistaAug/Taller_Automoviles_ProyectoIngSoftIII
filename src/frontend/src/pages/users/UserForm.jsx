import { useState } from "react";
import { updateUserRequest } from "../../api/users.api";
import { getErrorMessage } from "../../utils/errorHandler";

export default function UserForm({
  user,
  onSuccess,
  onCancel,
}) {
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isActive: user.isActive,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      await updateUserRequest(user._id, form);

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
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        placeholder="Nombre"
      />

      <input
        className="w-full rounded border p-2"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        placeholder="Apellido"
      />

      <input
        className="w-full rounded border p-2"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Correo"
      />

      <input
        className="w-full rounded border p-2"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Teléfono"
      />

      <select
        className="w-full rounded border p-2"
        name="role"
        value={form.role}
        onChange={handleChange}
      >
        <option value="ADMIN">ADMIN</option>
        <option value="RECEPTIONIST">RECEPTIONIST</option>
        <option value="MECHANIC">MECHANIC</option>
        <option value="CLIENT">CLIENT</option>
      </select>

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
          className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
          disabled={loading}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}