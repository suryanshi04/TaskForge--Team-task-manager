import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  //  get user from token
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  //  logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">

        {/* Branding */}
        <div className="p-5 border-b">
          <h1 className="text-xl font-bold text-blue-600">
            TaskForge
          </h1>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1">

          {/* Dashboard */}
          <Link
            to="/dashboard"
            className={`block px-3 py-2 rounded-lg ${
              pathname === "/dashboard"
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Dashboard
          </Link>

          {/* Admin Panel (ONLY ADMIN) */}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className={`block px-3 py-2 rounded-lg ${
                pathname === "/admin"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Admin Panel
            </Link>
          )}

        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
}