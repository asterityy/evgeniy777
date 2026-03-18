import { useState, useMemo } from "react";
import { glossaryTerms, categories } from "../data/glossary";
import { Search, BookOpen } from "lucide-react";

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = useMemo(() => {
    return glossaryTerms.filter((t) => {
      const matchSearch =
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.definition.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === "Все" || t.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [search, activeCategory]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    filtered.forEach((t) => {
      const letter = t.term.charAt(0).toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(t);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Глоссарий JavaScript</h1>
        <p className="text-gray-600">{glossaryTerms.length} терминов с определениями и примерами</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Поиск терминов..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none text-gray-900"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["Все", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={activeCategory === cat ? { backgroundColor: "#0A66C2" } : {}}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-6">
        Найдено: {filtered.length} {filtered.length === 1 ? "термин" : filtered.length < 5 ? "термина" : "терминов"}
      </p>

      {/* Terms */}
      {grouped.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Термины не найдены</p>
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(([letter, terms]) => (
            <div key={letter}>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: "#0A66C2" }}
                >
                  {letter}
                </div>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <div className="space-y-3">
                {terms.map((term) => (
                  <div
                    key={term.id}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{term.term}</h3>
                      <span
                        className="text-xs font-medium px-2 py-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#EFF6FF", color: "#0A66C2" }}
                      >
                        {term.category}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-3">{term.definition}</p>
                    {term.example && (
                      <code className="block bg-gray-900 text-green-400 px-4 py-3 rounded-lg text-sm font-mono overflow-x-auto whitespace-pre">
                        {term.example}
                      </code>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
