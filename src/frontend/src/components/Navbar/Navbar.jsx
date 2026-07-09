import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <div>
        <h1 className="text-xl font-bold text-blue-700">
          GarageSolutions
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm text-gray-500">
            Usuario
          </p>

          <p className="font-semibold text-gray-800">
            {user?.firstName
              ? `${user.firstName} ${user.lastName}`
              : "Invitado"}
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}