export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  example?: string;
  category: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "g1",
    term: "Callback",
    definition: "Функция, передаваемая в другую функцию как аргумент и вызываемая по завершению некоторой операции.",
    example: "setTimeout(() => console.log('Готово!'), 1000);",
    category: "Функции"
  },
  {
    id: "g2",
    term: "Closure (Замыкание)",
    definition: "Функция вместе со своим лексическим окружением, которое позволяет ей обращаться к переменным внешней функции даже после её завершения.",
    example: "function makeCounter() { let n = 0; return () => ++n; }",
    category: "Функции"
  },
  {
    id: "g3",
    term: "Hoisting (Поднятие)",
    definition: "Механизм JavaScript, при котором объявления переменных (var) и функций поднимаются в начало своей области видимости во время компиляции.",
    example: "console.log(x); var x = 5; // undefined (не ошибка)",
    category: "Переменные"
  },
  {
    id: "g4",
    term: "Event Loop (Цикл событий)",
    definition: "Механизм выполнения кода в JavaScript, обеспечивающий асинхронность в однопоточной среде путём обработки очереди задач.",
    category: "Асинхронность"
  },
  {
    id: "g5",
    term: "Promise (Промис)",
    definition: "Объект, представляющий результат асинхронной операции. Имеет три состояния: pending (ожидание), fulfilled (выполнен), rejected (отклонён).",
    example: "const p = new Promise((resolve, reject) => resolve('OK'));",
    category: "Асинхронность"
  },
  {
    id: "g6",
    term: "async/await",
    definition: "Синтаксический сахар над Promise для написания асинхронного кода в синхронном стиле. async делает функцию возвращающей промис, await ожидает его выполнения.",
    example: "async function load() { const data = await fetch('/api'); }",
    category: "Асинхронность"
  },
  {
    id: "g7",
    term: "DOM (Document Object Model)",
    definition: "Программный интерфейс для HTML и XML документов. Представляет документ в виде дерева объектов, которыми можно управлять через JavaScript.",
    category: "Браузер"
  },
  {
    id: "g8",
    term: "Prototype (Прототип)",
    definition: "Объект, от которого другой объект наследует свойства и методы. В JavaScript реализовано прототипное наследование через цепочку прототипов.",
    example: "Array.prototype.myMethod = function() {};",
    category: "ООП"
  },
  {
    id: "g9",
    term: "Scope (Область видимости)",
    definition: "Контекст, определяющий доступность переменных. В JS существует глобальная, функциональная и блочная область видимости.",
    category: "Переменные"
  },
  {
    id: "g10",
    term: "this",
    definition: "Ключевое слово, ссылающееся на текущий контекст выполнения. Его значение зависит от способа вызова функции.",
    example: "const obj = { name: 'JS', getName() { return this.name; } };",
    category: "Функции"
  },
  {
    id: "g11",
    term: "Event Bubbling (Всплытие событий)",
    definition: "Механизм распространения событий, при котором событие сначала обрабатывается на целевом элементе, а затем поднимается к родительским элементам.",
    category: "События"
  },
  {
    id: "g12",
    term: "Destructuring (Деструктуризация)",
    definition: "Синтаксис ES6, позволяющий извлекать значения из массивов или свойства из объектов в отдельные переменные.",
    example: "const { name, age } = user; const [first, ...rest] = arr;",
    category: "ES6+"
  },
  {
    id: "g13",
    term: "Spread operator",
    definition: "Оператор ... позволяет разворачивать итерируемые объекты (массивы, строки) в отдельные элементы.",
    example: "const combined = [...arr1, ...arr2]; const copy = {...obj};",
    category: "ES6+"
  },
  {
    id: "g14",
    term: "Rest parameters",
    definition: "Оператор ... в параметрах функции, собирающий оставшиеся аргументы в массив.",
    example: "function sum(...numbers) { return numbers.reduce((a, b) => a + b, 0); }",
    category: "Функции"
  },
  {
    id: "g15",
    term: "Template Literals (Шаблонные строки)",
    definition: "Строки в обратных кавычках (`), поддерживающие встроенные выражения ${} и многострочность.",
    example: "const msg = `Привет, ${name}! Тебе ${age} лет.`;",
    category: "ES6+"
  },
  {
    id: "g16",
    term: "Currying (Каррирование)",
    definition: "Преобразование функции с несколькими аргументами в последовательность функций с одним аргументом.",
    example: "const add = a => b => a + b; add(1)(2) === 3;",
    category: "Функции"
  },
  {
    id: "g17",
    term: "IIFE",
    definition: "Immediately Invoked Function Expression — функция, которая вызывается немедленно после создания. Используется для создания изолированной области видимости.",
    example: "(function() { /* код */ })();",
    category: "Функции"
  },
  {
    id: "g18",
    term: "Map",
    definition: "Коллекция пар ключ-значение, где ключами могут быть значения любого типа. В отличие от Object, сохраняет порядок вставки.",
    example: "const map = new Map(); map.set('key', 'value');",
    category: "Структуры данных"
  },
  {
    id: "g19",
    term: "Set",
    definition: "Коллекция уникальных значений любого типа. Автоматически удаляет дубликаты.",
    example: "const unique = [...new Set([1, 1, 2, 3, 3])]; // [1, 2, 3]",
    category: "Структуры данных"
  },
  {
    id: "g20",
    term: "Generator (Генератор)",
    definition: "Специальный тип функции (function*), которая может приостанавливать выполнение с помощью yield и возобновлять его позже.",
    example: "function* gen() { yield 1; yield 2; yield 3; }",
    category: "ES6+"
  },
  {
    id: "g21",
    term: "Symbol",
    definition: "Примитивный тип данных ES6, создающий уникальные идентификаторы. Часто используется как ключи объектов.",
    example: "const id = Symbol('id'); obj[id] = 42;",
    category: "Типы данных"
  },
  {
    id: "g22",
    term: "WeakMap / WeakSet",
    definition: "Коллекции со слабыми ссылками на объекты. Ключи/значения могут быть удалены сборщиком мусора, если нет других ссылок.",
    category: "Структуры данных"
  },
  {
    id: "g23",
    term: "Proxy",
    definition: "Объект, позволяющий перехватывать операции над другим объектом (чтение, запись, вызов и т.д.) и определять собственное поведение.",
    example: "const proxy = new Proxy(target, handler);",
    category: "Метапрограммирование"
  },
  {
    id: "g24",
    term: "Reflect",
    definition: "Объект со статическими методами для перехватываемых операций JavaScript. Используется совместно с Proxy.",
    category: "Метапрограммирование"
  },
  {
    id: "g25",
    term: "Fetch API",
    definition: "Современный интерфейс для выполнения HTTP-запросов в браузере. Возвращает Promise<Response>.",
    example: "const data = await fetch('/api/users').then(r => r.json());",
    category: "Браузер"
  },
  {
    id: "g26",
    term: "LocalStorage",
    definition: "Web Storage API для хранения данных в браузере без ограничения по времени. Данные сохраняются между сессиями.",
    example: "localStorage.setItem('key', JSON.stringify(data));",
    category: "Браузер"
  },
  {
    id: "g27",
    term: "JSON",
    definition: "JavaScript Object Notation — текстовый формат обмена данными. JSON.stringify() сериализует объект, JSON.parse() десериализует.",
    example: "JSON.stringify({ name: 'JS' }) === '{\"name\":\"JS\"}'",
    category: "Данные"
  },
  {
    id: "g28",
    term: "Memoization (Мемоизация)",
    definition: "Техника оптимизации, при которой результаты функции кешируются для повторных вызовов с теми же аргументами.",
    example: "const memo = {}; function fib(n) { return memo[n] ?? (memo[n] = fib(n-1)+fib(n-2)); }",
    category: "Паттерны"
  },
  {
    id: "g29",
    term: "Coercion (Принуждение типов)",
    definition: "Автоматическое преобразование типов данных JavaScript при операциях между значениями разных типов.",
    example: "'5' + 3 === '53'; '5' - 3 === 2; true + 1 === 2",
    category: "Типы данных"
  },
  {
    id: "g30",
    term: "Strict Mode (Строгий режим)",
    definition: "Режим работы JavaScript ('use strict'), запрещающий некоторые нежелательные практики и включающий дополнительные проверки.",
    example: "'use strict'; x = 5; // ReferenceError",
    category: "Основы"
  },
  {
    id: "g31",
    term: "Optional Chaining (?.)",
    definition: "Оператор ES2020 для безопасного обращения к вложенным свойствам объекта. Возвращает undefined вместо ошибки, если промежуточное значение null/undefined.",
    example: "const city = user?.address?.city;",
    category: "ES6+"
  },
  {
    id: "g32",
    term: "Nullish Coalescing (??)",
    definition: "Оператор ES2020, возвращающий правый операнд только если левый равен null или undefined (в отличие от ||, который реагирует на все falsy).",
    example: "const name = user.name ?? 'Гость';",
    category: "ES6+"
  },
  {
    id: "g33",
    term: "Microtask (Микрозадача)",
    definition: "Задача с высоким приоритетом в Event Loop, выполняющаяся после текущей синхронной задачи, но до следующей макрозадачи. Примеры: Promise.then, queueMicrotask.",
    category: "Асинхронность"
  },
  {
    id: "g34",
    term: "XSS (Cross-Site Scripting)",
    definition: "Уязвимость безопасности, при которой злоумышленник внедряет вредоносный JavaScript-код через пользовательский ввод (например, через innerHTML).",
    category: "Безопасность"
  },
  {
    id: "g35",
    term: "Higher-Order Function",
    definition: "Функция, которая принимает другую функцию как аргумент или возвращает функцию. Примеры: map, filter, reduce, forEach.",
    example: "const doubled = [1,2,3].map(x => x * 2);",
    category: "Функции"
  },
];

export const categories = [...new Set(glossaryTerms.map((t) => t.category))].sort();
