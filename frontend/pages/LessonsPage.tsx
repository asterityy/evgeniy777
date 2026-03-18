import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { sections } from "../data/lessons";
import { Clock, ChevronRight, BookOpen } from "lucide-react";

const iconMap: Record<string, string> = {
  BookOpen: "📖", Code: "💻", Zap: "⚡", Layout: "🖥️", Star: "⭐", RefreshCw: "🔄", Package: "📦"
};

export default function LessonsPage() {
  const [searchParams] = useSearchParams();
  const activeSection = searchParams.get("section");
  const [selected, setSelected] = useState(activeSection || sections[0].id);

  const currentSection = sections.find((s) => s.id === selected) || sections[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Курс JavaScript</h1>
        <p className="text-gray-600">Полная программа обучения от основ до продвинутых тем</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-20">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Разделы курса</h2>
            </div>
            <nav className="p-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelected(section.id)}
                  className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-lg transition-colors mb-1 ${
                    selected === section.id
                      ? "text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  style={selected === section.id ? { backgroundColor: "#0A66C2" } : {}}
                >
                  <span className="text-lg">{iconMap[section.icon] || "📝"}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{section.title}</div>
                    <div className={`text-xs mt-0.5 ${selected === section.id ? "text-blue-200" : "text-gray-400"}`}>
                      {section.lessons.length} {section.lessons.length === 1 ? "урок" : "урока"}
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl">{iconMap[currentSection.icon] || "📝"}</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{currentSection.title}</h2>
                <p className="text-gray-500 mt-1">{currentSection.description}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {currentSection.lessons.map((lesson, idx) => (
              <Link
                key={lesson.id}
                to={`/lessons/${lesson.id}`}
                className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: "#0A66C2" }}
                >
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{lesson.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-sm text-gray-400">{lesson.duration}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
