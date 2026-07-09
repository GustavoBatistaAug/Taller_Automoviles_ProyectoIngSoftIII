import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Usuarios",
    path: "/users",
  },
  {
    label: "Vehículos",
    path: "/vehicles",
  },
  {
    label: "Solicitudes",
    path: "/services",
  },
  {
    label: "Repuestos",
    path: "/parts",
  },
  {
    label: "Perfil",
    path: "/profile",
  },
];

export default function Sidebar() {
  return (
    <aside className="min-h-[calc(100vh-64px)] w-64 border-r bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-xl font-bold text-blue-700">
          GarageSolutions
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Panel Administrativo
        </p>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 transition ${
                    isActive
                      ? "bg-blue-700 font-semibold text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}