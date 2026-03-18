import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserPlus, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !email.trim() || !password || !password2) {
      setError("Заполните все поля");
      return;
    }
    if (username.trim().length < 3) {
      setError("Логин должен содержать минимум 3 символа");
      return;
    }
    if (password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов");
      return;
    }
    if (password !== password2) {
      setError("Пароли не совпадают");
      return;
    }
    if (!email.includes("@")) {
      setError("Введите корректный email");
      return;
    }

    setLoading(true);
    const result = await register(username.trim(), email.trim(), password);
    setLoading(false);

    if (result.success) {
      navigate("/profile");
    } else {
      setError(result.error || "Ошибка регистрации");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#f8fafc" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{ background: "#22C55E" }}
          >
            <UserPlus size={28} color="white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Регистрация</h1>
          <p className="text-gray-500 mt-1">Создайте аккаунт в JS Academy</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Имя пользователя</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Минимум 3 символа"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 focus:outline-none text-sm"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.ru"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 focus:outline-none text-sm"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Пароль</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Минимум 6 символов"
                  className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 text-gray-900 focus:outline-none text-sm"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Повторите пароль</label>
              <input
                type={showPass ? "text" : "password"}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Введите пароль ещё раз"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 focus:outline-none text-sm"
                autoComplete="new-password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity mt-2"
              style={{ background: "#22C55E", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Регистрация..." : "Создать аккаунт"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Уже есть аккаунт?{" "}
              <Link to="/login" className="font-medium" style={{ color: "#0A66C2" }}>
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
