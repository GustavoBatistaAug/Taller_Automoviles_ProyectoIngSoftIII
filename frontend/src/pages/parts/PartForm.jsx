import { useState } from "react";

import {
  createPartRequest,
  updatePartRequest,
} from "../../api/parts.api";

import { getErrorMessage } from "../../utils/errorHandler";

const categories = [
  "ENGINE",
  "BRAKES",
  "SUSPENSION",
  "TRANSMISSION",
  "ELECTRICAL",
  "BODY",
  "FILTER",
  "FLUID",
  "OTHER",
];

export default function PartForm({
  part = null,
  onSuccess,
  onCancel,
}) {
  const [form, setForm] = useState({
    name: part?.name || "",
    brand: part?.brand || "",
    partNumber: part?.partNumber || "",
    description: part?.description || "",
    category: part?.category || "OTHER",
    stock: part?.stock ?? 0,
    minimumStock: part?.minimumStock ?? 0,
    price: part?.price ?? 0,
    supplier: part?.supplier || "",
    location: part?.location || "",
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

      if (part) {
        await updatePartRequest(part._id, form);
      } else {
        await createPartRequest(form);
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
        name="name"
        placeholder="Nombre del repuesto"
        value={form.name}
        onChange={handleChange}
      />

      <input
        className="w-full rounded border p-2"
        name="brand"
        placeholder="Marca"
        value={form.brand}
        onChange={handleChange}
      />

      <input
        className="w-full rounded border p-2"
        name="partNumber"
        placeholder="Número de parte"
        value={form.partNumber}
        onChange={handleChange}
      />

      <textarea
        className="w-full rounded border p-2"
        rows="3"
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
      />

      <select
        className="w-full rounded border p-2"
        name="category"
        value={form.category}
        onChange={handleChange}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <input
        className="w-full rounded border p-2"
        type="number"
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
      />

      <input
        className="w-full rounded border p-2"
        type="number"
        name="minimumStock"
        placeholder="Stock mínimo"
        value={form.minimumStock}
        onChange={handleChange}
      />

      <input
        className="w-full rounded border p-2"
        type="number"
        step="0.01"
        name="price"
        placeholder="Precio"
        value={form.price}
        onChange={handleChange}
      />

      <input
        className="w-full rounded border p-2"
        name="supplier"
        placeholder="Proveedor"
        value={form.supplier}
        onChange={handleChange}
      />

      <input
        className="w-full rounded border p-2"
        name="location"
        placeholder="Ubicación"
        value={form.location}
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