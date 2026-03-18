import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Trophy, Clock, TrendingUp, LogOut, BookOpen } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function ProfilePage() {
  const { user, logout, getUserResults } = useAuth();
  const navigate = useNavigate();

  const results = getUserResults();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const totalTests = results.length;
  const avgScore =
    totalTests > 0
      ? Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / totalTests)
      : 0;
  const bestScore = totalTests > 0 ? Math.max(...results.map((r) => r.percentage)) : 0;

  const topicStats = results.reduce<Record<string, { total: number; sum: number }>>((acc, r) => {
    const topic = r.testTitle;
    if (!acc[topic]) acc[topic] = { total: 0, sum: 0 };
    acc[topic].total++;
    acc[topic].sum += r.percentage;
    return acc;
  }, {});

  const topicChartData = Object.entries(topicStats).map(([name, { total, sum }]) => ({
    name: name.length > 18 ? name.slice(0, 18) + "…" : name,
    Результат: Math.round(sum / total),
  }));

  const progressData = results
    .slice(-10)
    .map((r, i) => ({
      name: `#${i + 1}`,
      Результат: r.percentage,
    }));

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
              style={{ background: "#0A66C2" }}
            >
              {user?.username?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.username}</h1>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                {user?.role === "admin" ? "Администратор" : "Пользователь"}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
          >
            <LogOut size={16} />
            Выйти
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Тестов пройдено", value: totalTests, icon: BookOpen, color: "#0A66C2" },
            { label: "Средний балл", value: `${avgScore}%`, icon: TrendingUp, color: "#22C55E" },
            { label: "Лучший результат", value: `${bestScore}%`, icon: Trophy, color: "#f59e0b" },
            {
              label: "Дата регистрации",
              value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString("ru-RU") : "—",
              icon: Clock,
              color: "#8b5cf6",
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: color + "15" }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {totalTests > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Результаты по темам</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={topicChartData} margin={{ left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v) => [`${v}%`, "Результат"]} />
                  <Bar dataKey="Результат" fill="#0A66C2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Прогресс (последние 10)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={progressData} margin={{ left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v) => [`${v}%`, "Результат"]} />
                  <Line
                    type="monotone"
                    dataKey="Результат"
                    stroke="#22C55E"
                    strokeWidth={2}
                    dot={{ fill: "#22C55E", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">История тестов</h3>
          </div>
          {results.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Trophy size={40} className="mx-auto mb-3 opacity-30" />
              <p>Вы ещё не проходили тесты</p>
              <button
                onClick={() => navigate("/tests")}
                className="mt-3 text-sm font-medium"
                style={{ color: "#0A66C2" }}
              >
                Перейти к тестам →
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {[...results].reverse().map((r) => (
                <div key={r.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{r.testTitle}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {new Date(r.date).toLocaleString("ru-RU")}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">
                      {r.score}/{r.total}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={{
                        background:
                          r.percentage >= 80
                            ? "#dcfce7"
                            : r.percentage >= 60
                            ? "#fef9c3"
                            : "#fee2e2",
                        color:
                          r.percentage >= 80
                            ? "#15803d"
                            : r.percentage >= 60
                            ? "#854d0e"
                            : "#b91c1c",
                      }}
                    >
                      {r.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
