import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { sections } from "../data/lessons";
import { tests } from "../data/tests";
import {
  BookOpen, CheckCircle, Terminal, Trophy, ArrowRight,
  Code2, Zap, Star, RefreshCw, Layout, Package
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  BookOpen, Code2, Zap, Star, RefreshCw, Layout, Package
};

const features = [
  { icon: BookOpen, title: "7 разделов курса", desc: "Полная программа от основ до продвинутых тем JS" },
  { icon: CheckCircle, title: "5 тестов", desc: "По 10–12 вопросов с детальными объяснениями" },
  { icon: Terminal, title: "JS Песочница", desc: "Пишите и запускайте код прямо в браузере" },
  { icon: Trophy, title: "Личный прогресс", desc: "Статистика результатов и история попыток" },
];

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white mb-6"
            style={{ backgroundColor: "#22C55E" }}
          >
            <Star className="w-4 h-4" />
            Бесплатное обучение JavaScript
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Освой{" "}
            <span style={{ color: "#0A66C2" }}>JavaScript</span>
            {" "}с нуля
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Интерактивные уроки, практические тесты и живая песочница для написания кода.
            От переменных до async/await — всё в одном месте.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/lessons"
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all hover:opacity-90 hover:shadow-lg text-lg"
              style={{ backgroundColor: "#0A66C2" }}
            >
              Начать обучение <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/playground"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-800 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg text-lg"
            >
              <Terminal className="w-5 h-5" /> Открыть песочницу
            </Link>
          </div>
          {!user && (
            <p className="mt-6 text-gray-500 text-sm">
              <Link to="/register" className="font-medium hover:underline" style={{ color: "#0A66C2" }}>Зарегистрируйтесь</Link>
              {" "}чтобы сохранять прогресс, или{" "}
              <Link to="/lessons" className="font-medium hover:underline" style={{ color: "#0A66C2" }}>учитесь как гость</Link>
            </p>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#EFF6FF" }}
                >
                  <f.icon className="w-6 h-6" style={{ color: "#0A66C2" }} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course sections */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Программа курса</h2>
            <p className="text-gray-600">7 разделов, охватывающих весь современный JavaScript</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => {
              const Icon = iconMap[section.icon] || BookOpen;
              return (
                <Link
                  key={section.id}
                  to={`/lessons?section=${section.id}`}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: "#EFF6FF" }}
                    >
                      <Icon className="w-6 h-6" style={{ color: "#0A66C2" }} />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 font-medium">Раздел {section.order}</span>
                      <h3 className="font-bold text-gray-900 mb-1">{section.title}</h3>
                      <p className="text-sm text-gray-500">{section.description}</p>
                      <span className="text-xs mt-2 inline-block" style={{ color: "#0A66C2" }}>
                        {section.lessons.length} {section.lessons.length === 1 ? "урок" : "урока"}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/lessons"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-medium rounded-xl transition-all hover:opacity-90"
              style={{ backgroundColor: "#0A66C2" }}
            >
              Все уроки <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tests */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Проверь себя</h2>
            <p className="text-gray-600">Тесты с детальными объяснениями для закрепления знаний</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => (
              <Link
                key={test.id}
                to={`/tests/${test.id}`}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{ backgroundColor: "#DCFCE7", color: "#15803D" }}
                  >
                    {test.topic}
                  </span>
                  <span className="text-xs text-gray-400">{test.duration} мин</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{test.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{test.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{test.questions.length} вопросов</span>
                  <span
                    className="text-sm font-medium group-hover:underline"
                    style={{ color: "#22C55E" }}
                  >
                    Начать →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="py-16 px-4" style={{ backgroundColor: "#0A66C2" }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Начни учиться сегодня</h2>
            <p className="text-blue-100 mb-8">
              Зарегистрируйтесь бесплатно и сохраняйте свой прогресс, результаты тестов и статистику
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white font-semibold rounded-xl hover:bg-gray-50 transition-all hover:shadow-lg"
              style={{ color: "#0A66C2" }}
            >
              Создать аккаунт <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
