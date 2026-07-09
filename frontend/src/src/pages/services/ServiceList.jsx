import { useEffect, useState } from "react";

import {
  getServiceRequestsRequest,
  deleteServiceRequestRequest,
} from "../../api/serviceRequest.api";

import { getErrorMessage } from "../../utils/errorHandler";
import Loader from "../../components/Loader/Loader";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import ServiceForm from "./ServiceForm";

const serviceTypeLabels = {
  GENERAL_INSPECTION: "Inspección General",
  ENGINE: "Motor",
  BRAKES: "Frenos",
  SUSPENSION: "Suspensión",
  TRANSMISSION: "Transmisión",
  OIL_CHANGE: "Cambio de aceite",
  ELECTRICAL: "Sistema eléctrico",
  OTHER: "Otro",
};

const statusLabels = {
  PENDING: "Pendiente",
  ASSIGNED: "Asignada",
  IN_PROGRESS: "En progreso",
  WAITING_PARTS: "Esperando repuestos",
  FINISHED: "Finalizada",
  DELIVERED: "Entregada",
  CANCELLED: "Cancelada",
};

export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getServiceRequestsRequest();

      setServices(response.data.data || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setShowModal(false);
  };

  const handleSuccess = () => {
    closeModal();
    loadServices();
  };

  const handleDelete = async (service) => {
    const confirmDelete = window.confirm(
      `¿Deseas eliminar la solicitud de servicio "${service.type}"?`
    );

    if (!confirmDelete) return;

    try {
      await deleteServiceRequestRequest(service._id);
      loadServices();
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  const columns = [
    {
      key: "clientId",
      title: "Cliente",
      render: (service) =>
        service.clientId
          ? `${service.clientId.firstName} ${service.clientId.lastName}`
          : "Sin cliente",
    },
    {
      key: "vehicleId",
      title: "Vehículo",
      render: (service) =>
        service.vehicleId?.plate || "Sin vehículo",
    },
    {
      key: "type",
      title: "Tipo",
      render: (service) =>
        serviceTypeLabels[service.type] ?? service.type,
    },
    {
      key: "status",
      title: "Estado",
      render: (service) =>
        statusLabels[service.status] ?? service.status,
    },
    {
      key: "description",
      title: "Descripción",
      render: (service) =>
        service.description?.length > 40
          ? `${service.description.substring(0, 40)}...`
          : service.description,
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Solicitudes de Servicio
        </h1>

        <p className="text-gray-600">
          Administración de solicitudes de servicio.
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
          data={services}
          emptyMessage="No existen solicitudes registradas."
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
        title="Editar Solicitud"
      >
        <ServiceForm
          service={selectedService}
          onSuccess={handleSuccess}
          onCancel={closeModal}
        />
      </Modal>

    </div>
  );
}