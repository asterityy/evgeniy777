import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { tests, Test, Question } from "../data/tests";
import { sections } from "../data/lessons";
import {
  Users,
  BarChart2,
  BookOpen,
  FlaskConical,
  Trash2,
  ShieldAlert,
  RefreshCcw,
  Plus,
  X,
} from "lucide-react";

type Tab = "users" | "results" | "lessons" | "tests";

const LOCAL_CUSTOM_TESTS_KEY = "jsa_custom_tests";

function getCustomTests(): Test[] {
  try {
    const raw = localStorage.getItem(LOCAL_CUSTOM_TESTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCustomTests(t: Test[]) {
  localStorage.setItem(LOCAL_CUSTOM_TESTS_KEY, JSON.stringify(t));
}

export default function AdminPage() {
  const { getAllUsers, getAllResults, deleteUserResults, deleteUser } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("users");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const [customTests, setCustomTests] = useState<Test[]>(getCustomTests);
  const [showNewTest, setShowNewTest] = useState(false);
  const [newTest, setNewTest] = useState<Omit<Test, "id">>({
    title: "",
    description: "",
    topic: "",
    duration: 15,
    questions: [],
  });
  const [newQuestion, setNewQuestion] = useState<Omit<Question, "id">>({
    type: "single",
    question: "",
    options: ["", "", "", ""],
    correct: "",
    explanation: "",
  });

  const users = getAllUsers().filter((u) => u.username !== "admin");
  const results = getAllResults();

  const handleDeleteUserResults = (uid: string) => {
    deleteUserResults(uid);
    setConfirmDelete(null);
    navigate(0);
  };

  const handleDeleteUser = (uid: string) => {
    deleteUser(uid);
    setConfirmDelete(null);
    navigate(0);
  };

  const addQuestion = () => {
    const q: Question = {
      ...newQuestion,
      id: `q-${Date.now()}`,
      options: newQuestion.options?.filter(Boolean),
    };
    setNewTest((prev) => ({ ...prev, questions: [...prev.questions, q] }));
    setNewQuestion({ type: "single", question: "", options: ["", "", "", ""], correct: "", explanation: "" });
  };

  const saveNewTest = () => {
    if (!newTest.title || newTest.questions.length === 0) return;
    const t: Test = { ...newTest, id: `custom-${Date.now()}` };
    const updated = [...customTests, t];
    setCustomTests(updated);
    saveCustomTests(updated);
    setShowNewTest(false);
    setNewTest({ title: "", description: "", topic: "", duration: 15, questions: [] });
  };

  const deleteCustomTest = (id: string) => {
    const updated = customTests.filter((t) => t.id !== id);
    setCustomTests(updated);
    saveCustomTests(updated);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "users", label: "Пользователи", icon: <Users size={16} /> },
    { id: "results", label: "Результаты", icon: <BarChart2 size={16} /> },
    { id: "lessons", label: "Разделы", icon: <BookOpen size={16} /> },
    { id: "tests", label: "Тесты", icon: <FlaskConical size={16} /> },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "#0A66C2" }}
          >
            <ShieldAlert size={24} color="white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Панель администратора</h1>
            <p className="text-gray-500 text-sm">Управление пользователями, тестами и контентом</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors"
              style={{
                background: tab === t.id ? "#0A66C2" : "white",
                color: tab === t.id ? "white" : "#374151",
                border: tab === t.id ? "none" : "1px solid #e5e7eb",
              }}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {tab === "users" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Пользователи ({users.length})</h2>
            </div>
            {users.length === 0 ? (
              <div className="text-center py-12 text-gray-400">Нет зарегистрированных пользователей</div>
            ) : (
              <div className="divide-y divide-gray-50">
                {users.map((u) => {
                  const userResults = results.filter((r) => r.userId === u.id);
                  return (
                    <div key={u.id} className="px-6 py-4 flex items-center justify-between gap-4">
                      <div>
                        <div className="font-medium text-gray-900">{u.username}</div>
                        <div className="text-sm text-gray-400">{u.email}</div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          Зарегистрирован: {new Date(u.createdAt).toLocaleDateString("ru-RU")} · Тестов: {userResults.length}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setConfirmDelete(`results-${u.id}`)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-yellow-200 text-yellow-700 hover:bg-yellow-50 transition-colors"
                        >
                          <RefreshCcw size={12} />
                          Сбросить результаты
                        </button>
                        <button
                          onClick={() => setConfirmDelete(`user-${u.id}`)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={12} />
                          Удалить
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === "results" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Все результаты ({results.length})</h2>
            </div>
            {results.length === 0 ? (
              <div className="text-center py-12 text-gray-400">Нет результатов</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs">
                      <th className="px-6 py-3 text-left font-medium">Пользователь</th>
                      <th className="px-6 py-3 text-left font-medium">Тест</th>
                      <th className="px-6 py-3 text-left font-medium">Результат</th>
                      <th className="px-6 py-3 text-left font-medium">Дата</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[...results].reverse().map((r) => {
                      const usr = users.find((u) => u.id === r.userId);
                      return (
                        <tr key={r.id} className="hover:bg-gray-50">
                          <td className="px-6 py-3 text-gray-700">{usr?.username ?? "Удалён"}</td>
                          <td className="px-6 py-3 text-gray-700">{r.testTitle}</td>
                          <td className="px-6 py-3">
                            <span
                              className="px-2 py-0.5 rounded-full text-xs font-semibold"
                              style={{
                                background: r.percentage >= 80 ? "#dcfce7" : r.percentage >= 60 ? "#fef9c3" : "#fee2e2",
                                color: r.percentage >= 80 ? "#15803d" : r.percentage >= 60 ? "#854d0e" : "#b91c1c",
                              }}
                            >
                              {r.score}/{r.total} ({r.percentage}%)
                            </span>
                          </td>
                          <td className="px-6 py-3 text-gray-400 text-xs">
                            {new Date(r.date).toLocaleString("ru-RU")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === "lessons" && (
          <div className="space-y-4">
            {sections.map((sec) => (
              <div key={sec.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 flex items-center gap-3 border-b border-gray-100">
                  <span className="text-2xl">{sec.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900">{sec.title}</div>
                    <div className="text-xs text-gray-400">{sec.lessons.length} уроков</div>
                  </div>
                </div>
                <div className="divide-y divide-gray-50">
                  {sec.lessons.map((l) => (
                    <div key={l.id} className="px-6 py-3 flex items-center justify-between text-sm">
                      <span className="text-gray-700">{l.title}</span>
                      <span className="text-gray-400 text-xs">{l.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <p className="text-xs text-gray-400 text-center">
              Для редактирования уроков измените файл <code>frontend/data/lessons.ts</code>
            </p>
          </div>
        )}

        {tab === "tests" && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={() => setShowNewTest(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
                style={{ background: "#22C55E" }}
              >
                <Plus size={16} />
                Добавить тест
              </button>
            </div>

            {[...tests, ...customTests].map((t) => (
              <div key={t.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{t.title}</div>
                  <div className="text-sm text-gray-400 mt-0.5">
                    {t.questions.length} вопросов · {t.duration} мин · Тема: {t.topic}
                  </div>
                </div>
                {t.id.startsWith("custom-") && (
                  <button
                    onClick={() => deleteCustomTest(t.id)}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}

            {showNewTest && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">Новый тест</h3>
                    <button onClick={() => setShowNewTest(false)} className="text-gray-400 hover:text-gray-600">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-3 mb-4">
                    <input
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm"
                      placeholder="Название теста"
                      value={newTest.title}
                      onChange={(e) => setNewTest({ ...newTest, title: e.target.value })}
                    />
                    <input
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm"
                      placeholder="Описание"
                      value={newTest.description}
                      onChange={(e) => setNewTest({ ...newTest, description: e.target.value })}
                    />
                    <div className="flex gap-2">
                      <input
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm"
                        placeholder="Тема"
                        value={newTest.topic}
                        onChange={(e) => setNewTest({ ...newTest, topic: e.target.value })}
                      />
                      <input
                        className="w-24 px-3 py-2 border border-gray-200 rounded-xl text-sm"
                        placeholder="Мин."
                        type="number"
                        value={newTest.duration}
                        onChange={(e) => setNewTest({ ...newTest, duration: +e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mb-4">
                    <h4 className="font-semibold text-sm text-gray-700 mb-3">
                      Добавить вопрос ({newTest.questions.length} добавлено)
                    </h4>
                    <div className="space-y-2">
                      <select
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm"
                        value={newQuestion.type}
                        onChange={(e) =>
                          setNewQuestion({ ...newQuestion, type: e.target.value as Question["type"] })
                        }
                      >
                        <option value="single">Один ответ</option>
                        <option value="truefalse">Да / Нет</option>
                        <option value="text">Ввод текста</option>
                      </select>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm"
                        placeholder="Текст вопроса"
                        rows={2}
                        value={newQuestion.question}
                        onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                      />
                      {newQuestion.type === "single" && (
                        <div className="space-y-1">
                          {(newQuestion.options ?? []).map((opt, i) => (
                            <input
                              key={i}
                              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm"
                              placeholder={`Вариант ${i + 1}`}
                              value={opt}
                              onChange={(e) => {
                                const opts = [...(newQuestion.options ?? [])];
                                opts[i] = e.target.value;
                                setNewQuestion({ ...newQuestion, options: opts });
                              }}
                            />
                          ))}
                        </div>
                      )}
                      <input
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm"
                        placeholder={
                          newQuestion.type === "truefalse"
                            ? "Правильный ответ: true или false"
                            : "Правильный ответ"
                        }
                        value={newQuestion.correct as string}
                        onChange={(e) => setNewQuestion({ ...newQuestion, correct: e.target.value })}
                      />
                      <input
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm"
                        placeholder="Пояснение"
                        value={newQuestion.explanation}
                        onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
                      />
                      <button
                        onClick={addQuestion}
                        disabled={!newQuestion.question || !newQuestion.correct}
                        className="w-full py-2 rounded-xl text-sm font-medium text-white transition-opacity"
                        style={{ background: "#0A66C2", opacity: !newQuestion.question ? 0.5 : 1 }}
                      >
                        + Добавить вопрос
                      </button>
                    </div>
                  </div>

                  {newTest.questions.length > 0 && (
                    <div className="mb-4 space-y-1">
                      {newTest.questions.map((q, i) => (
                        <div key={q.id} className="flex items-center justify-between text-sm bg-gray-50 px-3 py-2 rounded-lg">
                          <span className="text-gray-700 truncate">
                            {i + 1}. {q.question}
                          </span>
                          <button
                            onClick={() =>
                              setNewTest({ ...newTest, questions: newTest.questions.filter((_, j) => j !== i) })
                            }
                            className="ml-2 text-red-400 hover:text-red-600"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={saveNewTest}
                    disabled={!newTest.title || newTest.questions.length === 0}
                    className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity"
                    style={{ background: "#22C55E", opacity: !newTest.title ? 0.5 : 1 }}
                  >
                    Сохранить тест
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="font-bold text-gray-900 mb-2">Подтверждение</h3>
            <p className="text-sm text-gray-600 mb-4">
              {confirmDelete.startsWith("results-")
                ? "Удалить все результаты этого пользователя?"
                : "Удалить пользователя и все его результаты?"}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-600"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  const id = confirmDelete.replace("results-", "").replace("user-", "");
                  if (confirmDelete.startsWith("results-")) handleDeleteUserResults(id);
                  else handleDeleteUser(id);
                }}
                className="flex-1 py-2 rounded-xl bg-red-500 text-white text-sm font-medium"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
