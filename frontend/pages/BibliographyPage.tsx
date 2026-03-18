import { bibliography } from "../data/bibliography";
import { ExternalLink, Book, Globe, FileText } from "lucide-react";

const typeLabels: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  book: { label: "Книга", color: "#DBEAFE", icon: Book },
  online: { label: "Онлайн", color: "#D1FAE5", icon: Globe },
  article: { label: "Статья", color: "#FEF3C7", icon: FileText },
};

export default function BibliographyPage() {
  const books = bibliography.filter((b) => b.type === "book");
  const online = bibliography.filter((b) => b.type === "online");
  const articles = bibliography.filter((b) => b.type === "article");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Список литературы</h1>
        <p className="text-gray-600">{bibliography.length} рекомендованных источников для изучения JavaScript</p>
      </div>

      <BibSection title="📚 Книги" items={books} />
      <BibSection title="🌐 Онлайн-ресурсы" items={online} />
      {articles.length > 0 && <BibSection title="📄 Статьи" items={articles} />}
    </div>
  );
}

function BibSection({ title, items }: { title: string; items: typeof bibliography }) {
  if (items.length === 0) return null;
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="space-y-4">
        {items.map((item, idx) => {
          const { icon: Icon, color, label } = typeLabels[item.type] || typeLabels.article;
          return (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-200 hover:shadow-sm transition-all">
              <div className="flex gap-4">
                <div className="text-lg font-bold text-gray-300 w-8 flex-shrink-0 text-center pt-0.5">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 flex-1">{item.title}</h3>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 flex items-center gap-1"
                      style={{ backgroundColor: color, color: "#374151" }}
                    >
                      <Icon className="w-3 h-3" /> {label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">
                    {item.author} • {item.year}
                    {item.publisher && ` • ${item.publisher}`}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.description}</p>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                      style={{ color: "#0A66C2" }}
                    >
                      Открыть ресурс <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
