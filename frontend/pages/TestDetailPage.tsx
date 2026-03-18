import { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getTestById } from "../data/tests";
import { useAuth } from "../context/AuthContext";
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy, AlertCircle } from "lucide-react";

type Answers = Record<string, string | string[]>;

export default function TestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const test = id ? getTestById(id) : undefined;
  const { user, saveTestResult } = useAuth();

  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);

  const handleStart = () => { setStarted(true); setCurrentQ(0); setAnswers({}); setSubmitted(false); };

  const handleAnswer = useCallback((qId: string, value: string, isMultiple: boolean) => {
    if (submitted) return;
    if (isMultiple) {
      setAnswers((prev) => {
        const current = (prev[qId] as string[]) || [];
        const updated = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        return { ...prev, [qId]: updated };
      });
    } else {
      setAnswers((prev) => ({ ...prev, [qId]: value }));
    }
  }, [submitted]);

  const handleTextAnswer = useCallback((qId: string, value: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  }, [submitted]);

  const handleSubmit = () => {
    if (!test) return;
    setSubmitted(true);
    if (user) {
      let correct = 0;
      test.questions.forEach((q) => {
        const ans = answers[q.id];
        if (!ans) return;
        if (Array.isArray(q.correct)) {
          const userArr = (ans as string[]).sort();
          const correctArr = [...q.correct].sort();
          if (JSON.stringify(userArr) === JSON.stringify(correctArr)) correct++;
        } else {
          if (ans === q.correct || (ans as string).toLowerCase().trim() === q.correct.toLowerCase().trim()) correct++;
        }
      });
      saveTestResult({
        testId: test.id,
        testTitle: test.title,
        score: correct,
        total: test.questions.length,
        percentage: Math.round((correct / test.questions.length) * 100),
        answers,
      });
    }
  };

  if (!test) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="text-gray-500 text-lg">Тест не найден</p>
      <Link to="/tests" className="text-blue-600 hover:underline mt-4 block">← К тестам</Link>
    </div>
  );

  if (!started) return <TestIntro test={test} onStart={handleStart} />;

  if (submitted) {
    let correct = 0;
    test.questions.forEach((q) => {
      const ans = answers[q.id];
      if (!ans) return;
      if (Array.isArray(q.correct)) {
        const userArr = (ans as string[]).sort();
        const correctArr = [...q.correct].sort();
        if (JSON.stringify(userArr) === JSON.stringify(correctArr)) correct++;
      } else {
        if (ans === q.correct || (ans as string).toLowerCase().trim() === q.correct.toLowerCase().trim()) correct++;
      }
    });
    return <TestResults test={test} answers={answers} correct={correct} onRetry={handleStart} user={user} />;
  }

  const question = test.questions[currentQ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Вопрос {currentQ + 1} из {test.questions.length}</span>
          <span style={{ color: "#0A66C2" }}>{test.title}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all"
            style={{ width: `${((currentQ + 1) / test.questions.length) * 100}%`, backgroundColor: "#0A66C2" }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
        <div className="flex items-start gap-3 mb-6">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: "#0A66C2" }}
          >
            {currentQ + 1}
          </span>
          <div>
            {question.type === "multiple" && (
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full mb-2 inline-block">Выберите все правильные</span>
            )}
            <h2 className="text-lg font-semibold text-gray-900">{question.question}</h2>
          </div>
        </div>

        {/* Answer input */}
        {question.type === "text" ? (
          <input
            type="text"
            placeholder="Введите ответ..."
            value={(answers[question.id] as string) || ""}
            onChange={(e) => handleTextAnswer(question.id, e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-400 focus:outline-none"
          />
        ) : (
          <div className="space-y-3">
            {question.options?.map((option) => {
              const isSelected = question.type === "multiple"
                ? ((answers[question.id] as string[]) || []).includes(option)
                : answers[question.id] === option;
              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(question.id, option, question.type === "multiple")}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 text-blue-900"
                      : "border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm">{option}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-3">
        <button
          onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
          disabled={currentQ === 0}
          className="px-5 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Назад
        </button>
        {currentQ < test.questions.length - 1 ? (
          <button
            onClick={() => setCurrentQ(currentQ + 1)}
            className="px-5 py-2.5 text-white rounded-lg font-medium flex items-center gap-2 hover:opacity-90"
            style={{ backgroundColor: "#0A66C2" }}
          >
            Далее <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 text-white rounded-lg font-medium hover:opacity-90"
            style={{ backgroundColor: "#22C55E" }}
          >
            Завершить тест
          </button>
        )}
      </div>

      {/* Quick nav */}
      <div className="mt-6 flex flex-wrap gap-2">
        {test.questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => setCurrentQ(i)}
            className={`w-9 h-9 rounded-lg text-sm font-medium border-2 transition-all ${
              i === currentQ
                ? "text-white border-transparent"
                : answers[q.id]
                ? "border-green-300 bg-green-50 text-green-700"
                : "border-gray-200 text-gray-500 hover:border-gray-300"
            }`}
            style={i === currentQ ? { backgroundColor: "#0A66C2", borderColor: "#0A66C2" } : {}}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

function TestIntro({ test, onStart }: { test: ReturnType<typeof getTestById>; onStart: () => void }) {
  if (!test) return null;
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#EFF6FF" }}>
          <Trophy className="w-8 h-8" style={{ color: "#0A66C2" }} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{test.title}</h1>
        <p className="text-gray-500 mb-8">{test.description}</p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[["Вопросов", test.questions.length.toString()], ["Время", `${test.duration} мин`], ["Тема", test.topic]].map(([label, value]) => (
            <div key={label} className="bg-gray-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-xs text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
        <button
          onClick={onStart}
          className="w-full py-4 text-white font-semibold rounded-xl text-lg hover:opacity-90 transition-all"
          style={{ backgroundColor: "#0A66C2" }}
        >
          Начать тест
        </button>
        <Link to="/tests" className="block mt-4 text-sm text-gray-400 hover:text-gray-600">← Назад к списку тестов</Link>
      </div>
    </div>
  );
}

function TestResults({ test, answers, correct, onRetry, user }: {
  test: NonNullable<ReturnType<typeof getTestById>>;
  answers: Answers;
  correct: number;
  onRetry: () => void;
  user: { username: string } | null;
}) {
  const percentage = Math.round((correct / test.questions.length) * 100);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6 text-center shadow-sm">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold"
          style={{ backgroundColor: percentage >= 70 ? "#22C55E" : percentage >= 50 ? "#F59E0B" : "#EF4444" }}
        >
          {percentage}%
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {percentage >= 80 ? "Отлично!" : percentage >= 60 ? "Хороший результат!" : "Нужно больше практики"}
        </h2>
        <p className="text-gray-600 mb-6">
          Правильных ответов: <strong>{correct}</strong> из <strong>{test.questions.length}</strong>
        </p>
        {!user && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 text-sm text-amber-800">
            <AlertCircle className="w-4 h-4 inline mr-1" />
            Результат не сохранён. <Link to="/register" className="underline font-medium">Зарегистрируйтесь</Link> для сохранения прогресса.
          </div>
        )}
        <div className="flex gap-3 justify-center">
          <button onClick={onRetry} className="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
            <RotateCcw className="w-4 h-4" /> Пройти снова
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 px-5 py-3 text-white rounded-lg hover:opacity-90"
            style={{ backgroundColor: "#0A66C2" }}
          >
            {showDetails ? "Скрыть" : "Разбор ответов"}
          </button>
          <Link to="/tests" className="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
            К тестам
          </Link>
        </div>
      </div>

      {showDetails && (
        <div className="space-y-4">
          {test.questions.map((q, i) => {
            const userAns = answers[q.id];
            let isCorrect = false;
            if (Array.isArray(q.correct) && Array.isArray(userAns)) {
              isCorrect = JSON.stringify([...userAns].sort()) === JSON.stringify([...q.correct].sort());
            } else if (typeof userAns === "string") {
              isCorrect = userAns === q.correct || userAns.toLowerCase().trim() === (q.correct as string).toLowerCase().trim();
            }

            return (
              <div key={q.id} className={`bg-white rounded-xl border-2 p-5 ${isCorrect ? "border-green-200" : "border-red-200"}`}>
                <div className="flex items-start gap-3 mb-3">
                  {isCorrect
                    ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  }
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">{i + 1}. {q.question}</p>
                    {userAns && (
                      <p className="text-sm text-gray-600 mb-1">
                        Ваш ответ: <span className={`font-medium ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                          {Array.isArray(userAns) ? userAns.join(", ") : userAns}
                        </span>
                      </p>
                    )}
                    {!isCorrect && (
                      <p className="text-sm text-gray-600 mb-2">
                        Правильный ответ: <span className="font-medium text-green-700">
                          {Array.isArray(q.correct) ? q.correct.join(", ") : q.correct}
                        </span>
                      </p>
                    )}
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800">
                      💡 {q.explanation}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
