interface Props {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "javascript" }: Props) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="relative my-4 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-400 text-xs">
        <span className="font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="hover:text-white transition-colors px-2 py-1 rounded hover:bg-gray-700"
        >
          Копировать
        </button>
      </div>
      <pre className="bg-gray-900 text-green-400 p-4 overflow-x-auto text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
