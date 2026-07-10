import { useEffect, useState } from "react";

import { getProfileRequest } from "../../api/profile.api";
import { getErrorMessage } from "../../utils/errorHandler";

import Loader from "../../components/Loader/Loader";
import Modal from "../../components/Modal/Modal";
import ProfileForm from "./ProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProfileRequest();

      setProfile(response.data.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSuccess = async (message) => {
    closeModal();

    setSuccess(message);

    await loadProfile();

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  const openPasswordModal = () => {
    setShowPasswordModal(true);
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
  };

  const handlePasswordSuccess = (message) => {
    closePasswordModal();

    setSuccess(message);

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Mi Perfil
        </h1>

        <p className="text-gray-600">
          Consulta y administra la información de tu cuenta.
        </p>
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

      {!error && profile && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Nombre
              </p>

              <p className="mt-1 text-lg">
                {profile.firstName} {profile.lastName}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Correo electrónico
              </p>

              <p className="mt-1 text-lg">
                {profile.email}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Teléfono
              </p>

              <p className="mt-1 text-lg">
                {profile.phone || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Rol
              </p>

              <p className="mt-1 text-lg">
                {profile.role}
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={openModal}
              className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              Editar perfil
            </button>

            <button
              type="button"
              onClick={openPasswordModal}
              className="rounded bg-gray-700 px-4 py-2 text-white transition hover:bg-gray-800"
            >
              Cambiar contraseña
            </button>
          </div>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title="Editar Perfil"
      >
        <ProfileForm
          profile={profile}
          onSuccess={handleSuccess}
          onCancel={closeModal}
        />
      </Modal>

      <Modal
        isOpen={showPasswordModal}
        onClose={closePasswordModal}
        title="Cambiar contraseña"
      >
        <ChangePasswordForm
          onSuccess={handlePasswordSuccess}
          onCancel={closePasswordModal}
        />
      </Modal>

    </div>
  );
}