import { useEffect, useState } from "react";
import {
  getVehiclesRequest,
  getPartsRequest,
  getLowStockPartsRequest,
  getServiceRequestsRequest,
} from "../../api";

const initialCards = [
  {
    title: "Vehículos",
    key: "vehicles",
    value: "--",
    color: "bg-green-600",
  },
  {
    title: "Solicitudes",
    key: "requests",
    value: "--",
    color: "bg-yellow-500",
  },
  {
    title: "Repuestos",
    key: "parts",
    value: "--",
    color: "bg-purple-600",
  },
  {
    title: "Inventario Bajo",
    key: "lowStock",
    value: "--",
    color: "bg-red-600",
  },
];

export default function Dashboard() {
  const [cards, setCards] = useState(initialCards);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Dashboard | GarageSolutions";

    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        vehiclesRes,
        requestsRes,
        partsRes,
        lowStockRes,
      ] = await Promise.all([
        getVehiclesRequest(),
        getServiceRequestsRequest(),
        getPartsRequest(),
        getLowStockPartsRequest(),
      ]);

      const values = {
        vehicles: vehiclesRes.data.data.length,
        requests: requestsRes.data.data.length,
        parts: partsRes.data.data.length,
        lowStock: lowStockRes.data.data.length,
      };

      setCards((prev) =>
        prev.map((card) => ({
          ...card,
          value: values[card.key],
        }))
      );
    } catch (error) {
      console.error("Error cargando dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Bienvenido al panel administrativo de GarageSolutions.
        </p>
      </div>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-lg bg-white p-6 shadow-md"
          >
            <div
              className={`mb-4 inline-flex rounded-md px-3 py-1 text-sm font-semibold text-white ${card.color}`}
            >
              {card.title}
            </div>

            <h2 className="text-4xl font-bold text-gray-800">
              {loading ? "..." : card.value}
            </h2>
          </div>
        ))}
      </section>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-6">
        <h2 className="mb-2 text-lg font-semibold text-blue-700">
          Estado del sistema
        </h2>

        <p className="text-gray-700">
          El dashboard ahora consume datos reales del backend.
        </p>
      </section>
    </div>
  );
}