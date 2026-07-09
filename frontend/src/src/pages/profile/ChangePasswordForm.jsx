import { useState } from "react";

import { changePasswordRequest } from "../../api/profile.api";
import { getErrorMessage } from "../../utils/errorHandler";

export default function ChangePasswordForm({
  onSuccess,
  onCancel,
}) {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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

    if (form.newPassword !== form.confirmPassword) {
      setError("Las nuevas contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await changePasswordRequest({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

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
        type="password"
        name="currentPassword"
        placeholder="Contraseña actual"
        className="w-full rounded border p-2"
        value={form.currentPassword}
        onChange={handleChange}
      />

      <input
        type="password"
        name="newPassword"
        placeholder="Nueva contraseña"
        className="w-full rounded border p-2"
        value={form.newPassword}
        onChange={handleChange}
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirmar nueva contraseña"
        className="w-full rounded border p-2"
        value={form.confirmPassword}
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
          {loading ? "Actualizando..." : "Cambiar contraseña"}
        </button>
      </div>
    </form>
  );
}