import { useEffect, useState } from "react";

import {
  getVehiclesRequest,
  deleteVehicleRequest,
} from "../../api/vehicles.api";

import { getErrorMessage } from "../../utils/errorHandler";

import Loader from "../../components/Loader/Loader";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import VehicleForm from "./VehicleForm";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getVehiclesRequest();

      setVehicles(response.data.data || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (vehicle) => {
    setVehicleToDelete(vehicle);
    setShowDeleteModal(true);
  };

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteVehicleRequest(vehicleToDelete._id);

      setSuccess(response.data.message);

      setShowDeleteModal(false);
      setVehicleToDelete(null);

      await loadVehicles();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  const handleCloseModal = () => {
    setSelectedVehicle(null);
    setShowModal(false);
  };

  const handleSuccess = async (message) => {
    handleCloseModal();
    setSuccess(message);

    await loadVehicles();

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  const columns = [
    {
      key: "owner",
      title: "Propietario",
      render: (vehicle) =>
        vehicle.owner
          ? `${vehicle.owner.firstName} ${vehicle.owner.lastName}`
          : "Sin propietario",
    },
    {
      key: "brand",
      title: "Marca",
    },
    {
      key: "model",
      title: "Modelo",
    },
    {
      key: "year",
      title: "Año",
    },
    {
      key: "plate",
      title: "Placa",
    },
    {
      key: "color",
      title: "Color",
    },
    {
      key: "isActive",
      title: "Estado",
      render: (vehicle) =>
        vehicle.isActive ? "Activo" : "Inactivo",
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Vehículos
          </h1>

          <p className="text-gray-600">
            Administración de vehículos registrados.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedVehicle(null);
            setShowModal(true);
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          + Nuevo vehículo
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-green-300 bg-green-50 p-4 text-green-700">
          {success}
        </div>
      )}

      {!error && (
        <Table
          columns={columns}
          data={vehicles}
          emptyMessage="No existen vehículos registrados."
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
        onClose={handleCloseModal}
        title={
          selectedVehicle
            ? "Editar Vehículo"
            : "Nuevo Vehículo"
        }
      >
        <VehicleForm
          vehicle={selectedVehicle}
          onSuccess={handleSuccess}
          onCancel={handleCloseModal}
        />
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setVehicleToDelete(null);
        }}
        title="Eliminar vehículo"
      >
        <div className="space-y-6">
          <p>
            ¿Deseas eliminar el vehículo con placa{" "}
            <strong>{vehicleToDelete?.plate}</strong>?
          </p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setShowDeleteModal(false);
                setVehicleToDelete(null);
              }}
              className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={confirmDelete}
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}