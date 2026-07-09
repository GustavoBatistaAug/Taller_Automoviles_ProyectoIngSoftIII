import { useEffect, useState } from "react";

import {
  deleteUserRequest,
  getUsersRequest,
} from "../../api/users.api";

import { getErrorMessage } from "../../utils/errorHandler";

import Loader from "../../components/Loader/Loader";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import UserForm from "./UserForm";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getUsersRequest();

      setUsers(response.data.data || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "name",
      title: "Nombre",
      render: (user) => `${user.firstName} ${user.lastName}`,
    },
    {
      key: "email",
      title: "Correo",
    },
    {
      key: "phone",
      title: "Teléfono",
    },
    {
      key: "role",
      title: "Rol",
    },
    {
      key: "isActive",
      title: "Estado",
      render: (user) => (user.isActive ? "Activo" : "Inactivo"),
    },
  ];

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  
  const handleDelete = async (user) => {
    const confirmed = window.confirm(
      `¿Está seguro de eliminar a ${user.firstName} ${user.lastName}?`
    );

    if (!confirmed) return;

    try {
      await deleteUserRequest(user._id);

      await loadUsers();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Usuarios
        </h1>

        <p className="text-gray-600">
          Administración de usuarios registrados.
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
          data={users}
          emptyMessage="No existen usuarios registrados."
          actions={(row) => (
            <>
              <button
                type="button"
                onClick={() => handleEdit(row)}
                className="mr-2 rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
              >
                Editar
              </button>

              <button
                type="button"
                onClick={() => handleDelete(row)}
                className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
              >
                Eliminar
              </button>
            </>
          )}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        title="Editar usuario"
        onClose={() => setIsModalOpen(false)}
      >
        {selectedUser && (
          <UserForm
            user={selectedUser}
            onCancel={() => setIsModalOpen(false)}
            onSuccess={() => {
              setIsModalOpen(false);
              loadUsers();
            }}
          />
        )}
      </Modal>
      
    </div>
  );
}