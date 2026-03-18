import { Link } from "react-router-dom";
import { tests } from "../data/tests";
import { useAuth } from "../context/AuthContext";
import { Clock, HelpCircle, Trophy, Lock } from "lucide-react";

const topicColors: Record<string, { bg: string; text: string }> = {
  "Основы": { bg: "#DBEAFE", text: "#1E40AF" },
  "Функции": { bg: "#EDE9FE", text: "#5B21B6" },
  "DOM": { bg: "#D1FAE5", text: "#065F46" },
  "ES6+": { bg: "#FEF3C7", text: "#92400E" },
  "Асинхронность": { bg: "#FCE7F3", text: "#831843" },
};

export default function TestsPage() {
  const { user, getUserResults } = useAuth();
  const results = user ? getUserResults() : [];

  const getTestResult = (testId: string) => {
    const testResults = results.filter((r) => r.testId === testId);
    if (testResults.length === 0) return null;
    return testResults[testResults.length - 1];
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Тесты по JavaScript</h1>
        <p className="text-gray-600">
          Проверьте свои знания. {!user && (
            <span className="text-orange-600">
              <Lock className="w-4 h-4 inline mr-1" />
              Результаты гостей не сохраняются.{" "}
              <Link to="/register" className="underline">Зарегистрируйтесь</Link> для сохранения прогресса.
            </span>
          )}
        </p>
      </div>

      {user && results.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-blue-600" />
            <div>
              <p className="font-semibold text-blue-900">Ваш прогресс</p>
              <p className="text-blue-700 text-sm">
                Пройдено тестов: {new Set(results.map((r) => r.testId)).size} из {tests.length}.
                Средний балл: {Math.round(results.reduce((s, r) => s + r.percentage, 0) / results.length)}%
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => {
          const lastResult = getTestResult(test.id);
          const colors = topicColors[test.topic] || { bg: "#F3F4F6", text: "#374151" };

          return (
            <div key={test.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                  >
                    {test.topic}
                  </span>
                  {lastResult && (
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        lastResult.percentage >= 70
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {lastResult.percentage}%
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-bold text-gray-900 mb-2">{test.title}</h2>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{test.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-5">
                  <span className="flex items-center gap-1">
                    <HelpCircle className="w-4 h-4" />{test.questions.length} вопросов
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />{test.duration} мин
                  </span>
                </div>

                <Link
                  to={`/tests/${test.id}`}
                  className="block text-center w-full py-3 rounded-lg font-medium text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: lastResult ? "#111827" : "#0A66C2" }}
                >
                  {lastResult ? "Пройти снова" : "Начать тест"}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
