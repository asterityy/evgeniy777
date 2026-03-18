import { useParams, Link, useNavigate } from "react-router-dom";
import { getLessonById, getAllLessons, getSectionById } from "../data/lessons";
import LessonContent from "../components/LessonContent";
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight } from "lucide-react";

export default function LessonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lesson = id ? getLessonById(id) : undefined;
  const allLessons = getAllLessons();
  const currentIndex = allLessons.findIndex((l) => l.id === id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const section = lesson ? getSectionById(lesson.sectionId) : undefined;

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg mb-4">Урок не найден</p>
        <Link to="/lessons" className="text-blue-600 hover:underline">← Назад к урокам</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/lessons" className="hover:text-gray-700 flex items-center gap-1">
          <BookOpen className="w-4 h-4" /> Курс
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link to={`/lessons?section=${lesson.sectionId}`} className="hover:text-gray-700">{section?.title}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">{lesson.title}</span>
      </nav>

      {/* Lesson content */}
      <article className="bg-white rounded-xl border border-gray-200 p-6 md:p-10 mb-6">
        <div className="mb-6 pb-6 border-b border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
          <span className="text-sm text-gray-500">⏱ {lesson.duration}</span>
        </div>
        <LessonContent content={lesson.content} />
      </article>

      {/* Navigation */}
      <div className="flex gap-4">
        {prevLesson ? (
          <Link
            to={`/lessons/${prevLesson.id}`}
            className="flex-1 flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all group"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-xs text-gray-400 mb-0.5">Предыдущий</div>
              <div className="font-medium text-gray-900 text-sm truncate">{prevLesson.title}</div>
            </div>
          </Link>
        ) : <div className="flex-1" />}

        {nextLesson ? (
          <Link
            to={`/lessons/${nextLesson.id}`}
            className="flex-1 flex items-center justify-end gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all group text-right"
          >
            <div className="min-w-0">
              <div className="text-xs text-gray-400 mb-0.5">Следующий</div>
              <div className="font-medium text-gray-900 text-sm truncate">{nextLesson.title}</div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 flex-shrink-0" />
          </Link>
        ) : (
          <Link
            to="/tests"
            className="flex-1 flex items-center justify-end gap-3 p-4 rounded-xl border text-right text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "#22C55E", borderColor: "#22C55E" }}
          >
            <div>
              <div className="text-xs text-green-100 mb-0.5">Раздел завершён</div>
              <div className="font-medium text-sm">Пройти тест →</div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
