import { useEffect, useState } from "react";

import {
  getPartsRequest,
  deletePartRequest,
} from "../../api/parts.api";
import { getErrorMessage } from "../../utils/errorHandler";

import Loader from "../../components/Loader/Loader";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import PartForm from "./PartForm";

export default function PartsList() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPart, setSelectedPart] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadParts();
  }, []);

  const loadParts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getPartsRequest();

      setParts(response.data.data || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (part) => {
    setSelectedPart(part);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPart(null);
    setShowModal(false);
  };

  const handleSuccess = () => {
    closeModal();
    loadParts();
  };

  const handleDelete = async (part) => {
    const confirmDelete = window.confirm(
      `¿Deseas eliminar el repuesto "${part.name}"?`
    );

    if (!confirmDelete) return;

    try {
      await deletePartRequest(part._id);
      loadParts();
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  const columns = [
    {
      key: "name",
      title: "Nombre",
    },
    {
      key: "brand",
      title: "Marca",
    },
    {
      key: "category",
      title: "Categoría",
    },
    {
      key: "stock",
      title: "Stock",
    },
    {
      key: "price",
      title: "Precio",
      render: (part) => `$${Number(part.price).toFixed(2)}`,
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Inventario de Repuestos
        </h1>

        <p className="text-gray-600">
          Administración del inventario de repuestos.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {!error && (
        <Table
          columns={columns}
          data={parts}
          emptyMessage="No existen repuestos registrados."
          actions={(row) => (
            <>
              <button
                type="button"
                onClick={() => handleEdit(row)}
                className="mr-2 rounded bg-yellow-500 px-3 py-1 text-white transition hover:bg-yellow-600"
              >
                Editar
              </button>

              <button
                type="button"
                onClick={() => handleDelete(row)}
                className="rounded bg-red-600 px-3 py-1 text-white transition hover:bg-red-700"
              >
                Eliminar
              </button>
            </>
          )}
        />
      )}

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title="Editar Repuesto"
      >
        <PartForm
          part={selectedPart}
          onSuccess={handleSuccess}
          onCancel={closeModal}
        />
      </Modal>

    </div>
  );
}