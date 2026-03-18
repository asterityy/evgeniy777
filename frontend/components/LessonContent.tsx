import CodeBlock from "./CodeBlock";

interface Props {
  content: string;
}

export default function LessonContent({ content }: Props) {
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="prose prose-gray max-w-none">
      {parts.map((part, i) => {
        if (part.startsWith("```")) {
          const lines = part.split("\n");
          const lang = lines[0].replace("```", "") || "javascript";
          const code = lines.slice(1, -1).join("\n");
          return <CodeBlock key={i} code={code} language={lang} />;
        }

        const rendered = part
          .split("\n")
          .map((line, j) => {
            if (line.startsWith("## ")) {
              return <h2 key={j} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{line.replace("## ", "")}</h2>;
            }
            if (line.startsWith("### ")) {
              return <h3 key={j} className="text-lg font-semibold text-gray-800 mt-6 mb-3">{line.replace("### ", "")}</h3>;
            }
            if (line.startsWith("#### ")) {
              return <h4 key={j} className="text-base font-semibold text-gray-700 mt-4 mb-2">{line.replace("#### ", "")}</h4>;
            }
            if (line.startsWith("- ")) {
              return (
                <li key={j} className="ml-6 text-gray-700 mb-1 list-disc">
                  {renderInline(line.replace("- ", ""))}
                </li>
              );
            }
            if (line.startsWith("| ")) {
              return null;
            }
            if (line.trim() === "") return <div key={j} className="mb-2" />;
            return <p key={j} className="text-gray-700 leading-relaxed mb-2">{renderInline(line)}</p>;
          });

        return <div key={i}>{rendered}</div>;
      })}
    </div>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="bg-gray-100 text-blue-700 px-1 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}
