import { Link } from "react-router-dom";
import { Code2, Github, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl mb-3">
              <Code2 className="w-6 h-6" style={{ color: "#0A66C2" }} />
              JS Academy
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Бесплатная обучающая платформа для изучения JavaScript с нуля до профессионального уровня.
              Интерактивные уроки, тесты и живая песочница.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Обучение</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/lessons" className="hover:text-white transition-colors">Курс JavaScript</Link></li>
              <li><Link to="/tests" className="hover:text-white transition-colors">Тесты</Link></li>
              <li><Link to="/playground" className="hover:text-white transition-colors">Песочница</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Справочник</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/glossary" className="hover:text-white transition-colors">Глоссарий</Link></li>
              <li><Link to="/bibliography" className="hover:text-white transition-colors">Литература</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © 2024 JS Academy. Учебный проект.
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            Сделано с <Heart className="w-4 h-4 text-red-500" /> для студентов
          </p>
        </div>
      </div>
    </footer>
  );
}
