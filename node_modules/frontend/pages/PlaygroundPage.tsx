import { useState, useRef, useCallback } from "react";
import { Play, Trash2, RotateCcw, Copy, CheckCheck } from "lucide-react";

const EXAMPLES = [
  {
    label: "Привет, мир!",
    code: `// Добро пожаловать в JS Playground!\nconsole.log("Привет, мир!");\nconsole.log("Текущая дата:", new Date().toLocaleDateString("ru-RU"));`,
  },
  {
    label: "Массивы и методы",
    code: `const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];

const unique = [...new Set(numbers)];
const sorted = [...unique].sort((a, b) => a - b);
const doubled = sorted.map(n => n * 2);
const sumOfEven = doubled.filter(n => n % 2 === 0).reduce((sum, n) => sum + n, 0);

console.log("Исходный массив:", numbers);
console.log("Уникальные:", unique);
console.log("Отсортированные:", sorted);
console.log("Удвоенные:", doubled);
console.log("Сумма чётных:", sumOfEven);`,
  },
  {
    label: "Async / Await",
    code: `function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: "Пользователь " + id });
      else reject(new Error("Неверный ID"));
    }, 300);
  });
}

async function loadUsers() {
  try {
    console.log("Загрузка...");
    const [u1, u2] = await Promise.all([fetchUser(1), fetchUser(2)]);
    console.log("Пользователь 1:", u1);
    console.log("Пользователь 2:", u2);
  } catch (err) {
    console.error("Ошибка:", err.message);
  }
}
loadUsers();`,
  },
  {
    label: "Классы и ООП",
    code: `class Animal {
  #name;
  constructor(name, sound) {
    this.#name = name;
    this.sound = sound;
  }
  get name() { return this.#name; }
  speak() { return \`\${this.#name}: \${this.sound}\`; }
}

class Dog extends Animal {
  constructor(name) { super(name, "Гав!"); }
  fetch(item) { return \`\${this.name} принёс \${item}!\`; }
}

const animals = [new Dog("Рекс"), new Animal("Кот", "Мяу!")];
animals.forEach(a => console.log(a.speak()));
console.log(animals[0].fetch("мяч"));`,
  },
  {
    label: "Замыкания",
    code: `function createCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => { count = start; return count; },
    value: () => count
  };
}

const counter = createCounter(10);
counter.increment();
counter.increment();
counter.decrement();
console.log("Счётчик:", counter.value());

const multiply = a => b => c => a * b * c;
console.log("2*3*4 =", multiply(2)(3)(4));`,
  },
];

const buildIframeHTML = (code: string) => `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body>
<script>
(function() {
  function fmt(v) {
    if (v === null) return 'null';
    if (v === undefined) return 'undefined';
    if (typeof v === 'string') return v;
    if (typeof v === 'function') return v.toString().slice(0, 80) + '...';
    try { return JSON.stringify(v, null, 2); } catch(e) { return String(v); }
  }
  function send(type, args) {
    window.parent.postMessage({ type, text: Array.from(args).map(fmt).join(' ') }, '*');
  }
  console.log = (...a) => send('log', a);
  console.error = (...a) => send('error', a);
  console.warn = (...a) => send('warn', a);
  window.onerror = (msg, src, line) => {
    window.parent.postMessage({ type: 'error', text: msg + (line ? ' (строка ' + line + ')' : '') }, '*');
    return true;
  };
  window.onunhandledrejection = (e) => {
    window.parent.postMessage({ type: 'error', text: 'Промис отклонён: ' + (e.reason?.message || String(e.reason)) }, '*');
  };
  try {
    ${code}
  } catch(e) {
    send('error', [e.message]);
  }
})();
<\/script>
</body>
</html>`;

interface LogEntry {
  type: "log" | "error" | "warn";
  text: string;
}

export default function PlaygroundPage() {
  const [code, setCode] = useState(EXAMPLES[0].code);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const handlerRef = useRef<((e: MessageEvent) => void) | null>(null);

  const run = useCallback(() => {
    setLogs([]);
    setIsRunning(true);

    if (handlerRef.current) {
      window.removeEventListener("message", handlerRef.current);
    }

    const collected: LogEntry[] = [];

    const handler = (e: MessageEvent) => {
      if (e.data?.type && ["log", "error", "warn"].includes(e.data.type)) {
        collected.push({ type: e.data.type as LogEntry["type"], text: e.data.text });
        setLogs([...collected]);
      }
    };

    handlerRef.current = handler;
    window.addEventListener("message", handler);

    if (iframeRef.current) {
      iframeRef.current.srcdoc = buildIframeHTML(code);
    }

    setTimeout(() => {
      setIsRunning(false);
    }, 3000);
  }, [code]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const logColor = (type: LogEntry["type"]) => {
    if (type === "error") return "text-red-600";
    if (type === "warn") return "text-yellow-600";
    return "text-gray-800";
  };

  const logBg = (type: LogEntry["type"]) => {
    if (type === "error") return "bg-red-50 border-l-4 border-red-400";
    if (type === "warn") return "bg-yellow-50 border-l-4 border-yellow-400";
    return "bg-white border-l-4 border-gray-200";
  };

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">JS Playground</h1>
          <p className="text-gray-500">Пишите и запускайте JavaScript прямо в браузере</p>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => { setCode(ex.code); setLogs([]); }}
              className="px-3 py-1.5 rounded-full text-sm font-medium border transition-colors"
              style={{
                background: code === ex.code ? "#0A66C2" : "white",
                color: code === ex.code ? "white" : "#374151",
                borderColor: code === ex.code ? "#0A66C2" : "#d1d5db",
              }}
            >
              {ex.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <div
              className="flex items-center justify-between px-4 py-2 rounded-t-xl"
              style={{ background: "#1e293b" }}
            >
              <span className="text-sm font-medium text-slate-300">Редактор кода</span>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2 py-1 rounded text-xs text-slate-300 hover:text-white transition-colors"
                >
                  {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
                  {copied ? "Скопировано" : "Копировать"}
                </button>
                <button
                  onClick={() => { setCode(EXAMPLES[0].code); setLogs([]); }}
                  className="flex items-center gap-1 px-2 py-1 rounded text-xs text-slate-300 hover:text-white transition-colors"
                >
                  <RotateCcw size={14} />
                  Сброс
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="flex-1 p-4 font-mono text-sm text-green-300 resize-none focus:outline-none"
              style={{
                background: "#0f172a",
                minHeight: "360px",
                borderRadius: "0 0 0 0",
              }}
            />
            <button
              onClick={run}
              disabled={isRunning}
              className="flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-b-xl transition-colors"
              style={{
                background: isRunning ? "#6b7280" : "#22C55E",
                cursor: isRunning ? "not-allowed" : "pointer",
              }}
            >
              <Play size={18} />
              {isRunning ? "Выполняется..." : "Запустить"}
            </button>
          </div>

          <div className="flex flex-col">
            <div
              className="flex items-center justify-between px-4 py-2 rounded-t-xl"
              style={{ background: "#f1f5f9" }}
            >
              <span className="text-sm font-medium text-gray-600">Консоль вывода</span>
              <button
                onClick={() => setLogs([])}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Trash2 size={14} />
                Очистить
              </button>
            </div>
            <div
              className="flex-1 p-4 font-mono text-sm overflow-y-auto rounded-b-xl border border-t-0 border-gray-200"
              style={{ minHeight: "400px", background: "#fafafa" }}
            >
              {logs.length === 0 ? (
                <div className="text-gray-400 text-center mt-8">
                  Нажмите «Запустить», чтобы увидеть результат
                </div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className={`mb-1 px-3 py-1.5 rounded text-xs ${logBg(log.type)}`}>
                    <span className={`font-medium ${logColor(log.type)}`}>
                      {log.type === "error" ? "[ERROR] " : log.type === "warn" ? "[WARN] " : "[LOG] "}
                    </span>
                    <span className="text-gray-700 whitespace-pre-wrap">{log.text}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <iframe
          ref={iframeRef}
          sandbox="allow-scripts"
          title="js-sandbox"
          style={{ display: "none" }}
        />

        <div className="mt-6 p-4 rounded-xl border border-yellow-200 bg-yellow-50">
          <p className="text-sm text-yellow-800">
            <strong>Безопасность:</strong> Код выполняется в изолированном iframe с атрибутом{" "}
            <code className="bg-yellow-100 px-1 rounded">sandbox="allow-scripts"</code>. Он не имеет доступа к DOM
            страницы, localStorage или cookies.
          </p>
        </div>
      </div>
    </div>
  );
}
