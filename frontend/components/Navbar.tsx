import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, Code2, LogOut, User, ShieldCheck, ChevronDown } from "lucide-react";

const navLinks = [
  { to: "/lessons", label: "Курс" },
  { to: "/tests", label: "Тесты" },
  { to: "/glossary", label: "Глоссарий" },
  { to: "/bibliography", label: "Литература" },
  { to: "/playground", label: "Песочница" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setDropdownOpen(false);
  };

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl" style={{ color: "#0A66C2" }}>
            <Code2 className="w-7 h-7" />
            <span>JS Academy</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
                style={isActive(link.to) ? { backgroundColor: "#0A66C2" } : {}}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth area */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: user.role === "admin" ? "#111827" : "#0A66C2" }}
                  >
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span>{user.username}</span>
                  {user.role === "admin" && <ShieldCheck className="w-4 h-4 text-yellow-500" />}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    {user.role !== "admin" && (
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <User className="w-4 h-4" /> Личный кабинет
                      </Link>
                    )}
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <ShieldCheck className="w-4 h-4" /> Панель администратора
                      </Link>
                    )}
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" /> Выйти
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Войти
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white rounded-md transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#0A66C2" }}
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                isActive(link.to)
                  ? "text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              style={isActive(link.to) ? { backgroundColor: "#0A66C2" } : {}}
            >
              {link.label}
            </Link>
          ))}
          <hr className="my-2" />
          {user ? (
            <>
              {user.role !== "admin" && (
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  Личный кабинет
                </Link>
              )}
              {user.role === "admin" && (
                <Link to="/admin" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  Панель администратора
                </Link>
              )}
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                Войти
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-white rounded-md" style={{ backgroundColor: "#0A66C2" }}>
                Регистрация
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
