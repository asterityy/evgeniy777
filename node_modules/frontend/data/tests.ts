export type QuestionType = "single" | "multiple" | "truefalse" | "text";

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correct: string | string[];
  explanation: string;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  topic: string;
  duration: number; // в минутах
  questions: Question[];
}

export const tests: Test[] = [
  {
    id: "test-basics",
    title: "Основы JavaScript",
    description: "Типы данных, переменные, операторы, базовый синтаксис",
    topic: "Основы",
    duration: 15,
    questions: [
      {
        id: "b1",
        type: "single",
        question: "Что выведет console.log(typeof null)?",
        options: ["\"null\"", "\"undefined\"", "\"object\"", "\"boolean\""],
        correct: "\"object\"",
        explanation: "typeof null === 'object' — это историческая ошибка в JavaScript, которая сохраняется для обратной совместимости."
      },
      {
        id: "b2",
        type: "single",
        question: "Какой результат выражения 0.1 + 0.2 === 0.3?",
        options: ["true", "false", "undefined", "NaN"],
        correct: "false",
        explanation: "Из-за особенностей представления чисел с плавающей точкой (IEEE 754) результат 0.1 + 0.2 = 0.30000000000000004, что не равно 0.3."
      },
      {
        id: "b3",
        type: "multiple",
        question: "Какие значения являются falsy в JavaScript? (выберите все правильные)",
        options: ["0", "\"\"", "null", "undefined", "[]", "NaN", "false"],
        correct: ["0", "\"\"", "null", "undefined", "NaN", "false"],
        explanation: "Falsy значения: false, 0, '', null, undefined, NaN. Пустой массив [] является truthy!"
      },
      {
        id: "b4",
        type: "truefalse",
        question: "var объявленные переменные поднимаются (hoisting) в начало своей области видимости?",
        options: ["true", "false"],
        correct: "true",
        explanation: "Да, объявления var поднимаются (hoisting) в начало функции или глобальной области видимости. Только объявление поднимается, но не инициализация."
      },
      {
        id: "b5",
        type: "single",
        question: "Чем отличается == от ===?",
        options: [
          "Нет разницы",
          "=== проверяет тип и значение, == только значение с приведением типов",
          "== быстрее чем ===",
          "=== используется только для объектов"
        ],
        correct: "=== проверяет тип и значение, == только значение с приведением типов",
        explanation: "=== (строгое равенство) не приводит типы, == (нестрогое) сначала приводит типы. Например: '5' == 5 → true, '5' === 5 → false."
      },
      {
        id: "b6",
        type: "single",
        question: "Что такое NaN в JavaScript?",
        options: [
          "Тип данных",
          "Специальное значение типа Number, означающее 'не число'",
          "Ошибка",
          "null"
        ],
        correct: "Специальное значение типа Number, означающее 'не число'",
        explanation: "NaN (Not a Number) — специальное значение типа Number. NaN !== NaN! Используйте Number.isNaN() для проверки."
      },
      {
        id: "b7",
        type: "text",
        question: "Что выведет: console.log(typeof undefined)?",
        options: [],
        correct: "undefined",
        explanation: "typeof undefined возвращает строку 'undefined'. Это один из немногих безопасных способов проверить, что переменная не объявлена."
      },
      {
        id: "b8",
        type: "single",
        question: "Какой тип данных является ссылочным (reference type) в JavaScript?",
        options: ["String", "Number", "Boolean", "Object"],
        correct: "Object",
        explanation: "Object (включая массивы и функции) — ссылочный тип. Примитивы (Number, String, Boolean, null, undefined, Symbol, BigInt) копируются по значению."
      },
      {
        id: "b9",
        type: "truefalse",
        question: "let и const имеют блочную область видимости?",
        options: ["true", "false"],
        correct: "true",
        explanation: "Да, let и const ограничены блоком {} в отличие от var, который имеет функциональную область видимости."
      },
      {
        id: "b10",
        type: "single",
        question: "Что произойдёт при выполнении: const obj = {}; obj.name = 'JS'; ?",
        options: [
          "TypeError — нельзя изменять const",
          "Успешно — свойство добавится",
          "SyntaxError",
          "undefined"
        ],
        correct: "Успешно — свойство добавится",
        explanation: "const запрещает переприсваивание переменной, но не запрещает изменение самого объекта. Объект остаётся тем же, просто изменяется его содержимое."
      },
      {
        id: "b11",
        type: "single",
        question: "Что выведет: console.log(1 + '2' + 3)?",
        options: ["6", "\"123\"", "\"15\"", "TypeError"],
        correct: "\"123\"",
        explanation: "1 + '2' = '12' (число приводится к строке), затем '12' + 3 = '123'. Оператор + при работе со строками выполняет конкатенацию."
      },
      {
        id: "b12",
        type: "single",
        question: "Сколько примитивных типов данных в JavaScript (ES2023)?",
        options: ["5", "6", "7", "8"],
        correct: "7",
        explanation: "7 примитивных типов: Number, BigInt, String, Boolean, null, undefined, Symbol. Object — единственный ссылочный тип."
      },
    ]
  },
  {
    id: "test-functions",
    title: "Функции и замыкания",
    description: "Объявление функций, параметры, замыкания, this",
    topic: "Функции",
    duration: 20,
    questions: [
      {
        id: "f1",
        type: "single",
        question: "Что такое замыкание (closure) в JavaScript?",
        options: [
          "Способ объявить функцию",
          "Функция, которая имеет доступ к переменным внешней области видимости даже после её завершения",
          "Анонимная функция",
          "Функция без параметров"
        ],
        correct: "Функция, которая имеет доступ к переменным внешней области видимости даже после её завершения",
        explanation: "Замыкание — это функция вместе с окружающим её лексическим окружением. Она 'помнит' переменные из внешней функции даже после её выполнения."
      },
      {
        id: "f2",
        type: "truefalse",
        question: "Function Declaration поднимается (hoisting) целиком, включая тело функции?",
        options: ["true", "false"],
        correct: "true",
        explanation: "Да! В отличие от Function Expression и var, Function Declaration поднимается целиком, поэтому её можно вызвать до объявления в коде."
      },
      {
        id: "f3",
        type: "single",
        question: "Чем стрелочная функция отличается от обычной в отношении this?",
        options: [
          "Нет разницы",
          "Стрелочная функция создаёт свой this",
          "Стрелочная функция использует this из лексического окружения",
          "this в стрелочной функции всегда равен window"
        ],
        correct: "Стрелочная функция использует this из лексического окружения",
        explanation: "Стрелочные функции не имеют собственного this. Они берут this из окружающего контекста (лексического this). Это делает их удобными для коллбэков."
      },
      {
        id: "f4",
        type: "single",
        question: "Что делает оператор ... (rest) в параметрах функции?",
        options: [
          "Разворачивает массив",
          "Собирает оставшиеся аргументы в массив",
          "Копирует объект",
          "Удаляет параметр"
        ],
        correct: "Собирает оставшиеся аргументы в массив",
        explanation: "Rest параметр (...args) собирает все оставшиеся аргументы в массив. Например: function sum(...nums) — nums будет массивом всех переданных чисел."
      },
      {
        id: "f5",
        type: "text",
        question: "Как называется паттерн, когда функция немедленно вызывает сама себя? (аббревиатура на английском)",
        options: [],
        correct: "IIFE",
        explanation: "IIFE — Immediately Invoked Function Expression. Синтаксис: (function() { ... })(); Используется для создания изолированной области видимости."
      },
      {
        id: "f6",
        type: "multiple",
        question: "Какие утверждения о стрелочных функциях верны?",
        options: [
          "Не имеют своего this",
          "Не могут использоваться как конструкторы (new)",
          "Не имеют объекта arguments",
          "Не имеют prototype",
          "Могут быть генераторами (function*)"
        ],
        correct: ["Не имеют своего this", "Не могут использоваться как конструкторы (new)", "Не имеют объекта arguments", "Не имеют prototype"],
        explanation: "Стрелочные функции не имеют: своего this, arguments, prototype. Их нельзя вызвать с new. Также они не могут быть генераторами."
      },
      {
        id: "f7",
        type: "single",
        question: "Что выведет: const add = (a, b = 10) => a + b; console.log(add(5));",
        options: ["NaN", "5", "15", "undefined"],
        correct: "15",
        explanation: "Параметр b имеет значение по умолчанию 10. Когда add(5) вызывается без второго аргумента, b = 10, поэтому 5 + 10 = 15."
      },
      {
        id: "f8",
        type: "single",
        question: "Метод call() используется для:",
        options: [
          "Вызова функции с задержкой",
          "Вызова функции с явным указанием this и аргументами через запятую",
          "Создания копии функции",
          "Привязки this без вызова"
        ],
        correct: "Вызова функции с явным указанием this и аргументами через запятую",
        explanation: "fn.call(thisArg, arg1, arg2) — вызывает функцию с указанным this. Отличие от apply: аргументы передаются через запятую, а не массивом."
      },
      {
        id: "f9",
        type: "truefalse",
        question: "Функция в JavaScript является объектом?",
        options: ["true", "false"],
        correct: "true",
        explanation: "Да! В JavaScript функции — объекты первого класса (first-class objects). У них есть свойства (name, length) и методы (call, apply, bind). Их можно передавать как аргументы и возвращать из функций."
      },
      {
        id: "f10",
        type: "single",
        question: "Что такое каррирование (currying)?",
        options: [
          "Немедленный вызов функции",
          "Преобразование функции с несколькими аргументами в последовательность функций с одним аргументом",
          "Рекурсивная функция",
          "Функция без параметров"
        ],
        correct: "Преобразование функции с несколькими аргументами в последовательность функций с одним аргументом",
        explanation: "Каррирование: add(1, 2) → add(1)(2). Пример: const curry = a => b => a + b; curry(1)(2) === 3."
      },
    ]
  },
  {
    id: "test-dom",
    title: "DOM и события",
    description: "Работа с Document Object Model, обработчики событий",
    topic: "DOM",
    duration: 20,
    questions: [
      {
        id: "d1",
        type: "single",
        question: "Какой метод возвращает ПЕРВЫЙ элемент, соответствующий CSS-селектору?",
        options: [
          "document.getElementsByClassName()",
          "document.querySelectorAll()",
          "document.querySelector()",
          "document.getElementById()"
        ],
        correct: "document.querySelector()",
        explanation: "querySelector() возвращает первый элемент, соответствующий CSS-селектору. querySelectorAll() возвращает NodeList всех совпадений."
      },
      {
        id: "d2",
        type: "truefalse",
        question: "innerHTML безопаснее textContent для вставки пользовательских данных?",
        options: ["true", "false"],
        correct: "false",
        explanation: "Нет! innerHTML может выполнить вредоносный код (XSS-атака). textContent безопаснее — он вставляет текст буквально, без интерпретации HTML."
      },
      {
        id: "d3",
        type: "single",
        question: "Что такое 'всплытие событий' (event bubbling)?",
        options: [
          "Событие, которое создаёт новые события",
          "Распространение события от дочернего элемента к родительским",
          "Событие без обработчика",
          "Асинхронное событие"
        ],
        correct: "Распространение события от дочернего элемента к родительским",
        explanation: "Всплытие (bubbling): событие сначала обрабатывается на целевом элементе, затем поднимается к родителям вплоть до document. Противоположное — погружение (capturing)."
      },
      {
        id: "d4",
        type: "single",
        question: "Какой метод создаёт новый HTML-элемент?",
        options: [
          "document.addElement()",
          "document.createElement()",
          "document.makeElement()",
          "new HTMLElement()"
        ],
        correct: "document.createElement()",
        explanation: "document.createElement('div') создаёт новый элемент. После создания его нужно добавить в DOM с помощью appendChild(), append(), before(), after() и т.д."
      },
      {
        id: "d5",
        type: "multiple",
        question: "Какие из следующих методов добавляют элемент в DOM?",
        options: [
          "appendChild()",
          "append()",
          "prepend()",
          "insertBefore()",
          "removeChild()",
          "after()"
        ],
        correct: ["appendChild()", "append()", "prepend()", "insertBefore()", "after()"],
        explanation: "appendChild, append, prepend, insertBefore, after, before — всё это методы добавления. removeChild() удаляет элемент."
      },
      {
        id: "d6",
        type: "single",
        question: "Что такое делегирование событий?",
        options: [
          "Удаление обработчика событий",
          "Установка обработчика на родительский элемент для обработки событий дочерних",
          "Передача событий между компонентами",
          "Асинхронная обработка событий"
        ],
        correct: "Установка обработчика на родительский элемент для обработки событий дочерних",
        explanation: "Делегирование — паттерн, при котором один обработчик на родителе управляет событиями всех дочерних элементов. Эффективно для динамических списков."
      },
      {
        id: "d7",
        type: "text",
        question: "Какой метод останавливает всплытие события? (только имя метода)",
        options: [],
        correct: "stopPropagation",
        explanation: "event.stopPropagation() останавливает всплытие события. event.stopImmediatePropagation() также останавливает другие обработчики на том же элементе."
      },
      {
        id: "d8",
        type: "truefalse",
        question: "addEventListener позволяет добавить несколько обработчиков для одного события?",
        options: ["true", "false"],
        correct: "true",
        explanation: "Да! addEventListener добавляет обработчик в список. Можно добавить сколько угодно обработчиков для одного события на один элемент."
      },
      {
        id: "d9",
        type: "single",
        question: "Что делает event.preventDefault()?",
        options: [
          "Останавливает всплытие",
          "Отменяет действие браузера по умолчанию",
          "Удаляет элемент",
          "Создаёт новое событие"
        ],
        correct: "Отменяет действие браузера по умолчанию",
        explanation: "preventDefault() отменяет стандартное действие браузера: перехода по ссылке, отправки формы, и т.д. Всплытие при этом не останавливается."
      },
      {
        id: "d10",
        type: "single",
        question: "Какое свойство события указывает на элемент, на котором установлен обработчик?",
        options: ["event.target", "event.currentTarget", "event.srcElement", "event.element"],
        correct: "event.currentTarget",
        explanation: "event.currentTarget — элемент с обработчиком. event.target — элемент, который инициировал событие (может быть дочерним). При делегировании они отличаются!"
      },
    ]
  },
  {
    id: "test-es6",
    title: "ES6+ возможности",
    description: "Стрелочные функции, деструктуризация, классы, модули, промисы",
    topic: "ES6+",
    duration: 25,
    questions: [
      {
        id: "e1",
        type: "single",
        question: "Что делает оператор spread (...) применительно к массиву?",
        options: [
          "Удаляет элементы массива",
          "Разворачивает массив в отдельные элементы",
          "Сортирует массив",
          "Создаёт копию массива"
        ],
        correct: "Разворачивает массив в отдельные элементы",
        explanation: "Spread разворачивает итерируемые объекты: Math.max(...[1,2,3]) === Math.max(1,2,3). Также используется для копирования/объединения массивов и объектов."
      },
      {
        id: "e2",
        type: "single",
        question: "Как создать приватное поле класса в современном JavaScript?",
        options: [
          "private fieldName = value",
          "#fieldName = value",
          "_fieldName = value",
          "fieldName = private value"
        ],
        correct: "#fieldName = value",
        explanation: "Приватные поля классов (ES2022) объявляются с # перед именем. Доступны только внутри класса. _fieldName — это просто соглашение, не защищает реально."
      },
      {
        id: "e3",
        type: "truefalse",
        question: "Map в JavaScript может использовать объекты в качестве ключей?",
        options: ["true", "false"],
        correct: "true",
        explanation: "Да! Map может использовать любые значения как ключи: объекты, функции, примитивы. В отличие от обычного Object, где ключи всегда строки или Symbol."
      },
      {
        id: "e4",
        type: "multiple",
        question: "Что нового появилось в ES6? (выберите все верные)",
        options: [
          "let и const",
          "Стрелочные функции",
          "Классы",
          "Шаблонные строки",
          "Промисы",
          "fetch API",
          "async/await"
        ],
        correct: ["let и const", "Стрелочные функции", "Классы", "Шаблонные строки", "Промисы"],
        explanation: "ES6 (2015) добавил: let/const, стрелочные функции, классы, шаблонные строки, деструктуризацию, промисы, генераторы, Map/Set, Symbol и многое другое. fetch и async/await появились позже."
      },
      {
        id: "e5",
        type: "single",
        question: "Что такое Set в JavaScript?",
        options: [
          "Массив с методами объекта",
          "Коллекция уникальных значений",
          "Ключ-значение пара",
          "Функция-конструктор"
        ],
        correct: "Коллекция уникальных значений",
        explanation: "Set — коллекция уникальных значений любого типа. Дубликаты автоматически игнорируются. Используется для удаления дубликатов: [...new Set(array)]."
      },
      {
        id: "e6",
        type: "single",
        question: "Что выведет: const {a, b = 5} = {a: 1}; console.log(b);",
        options: ["undefined", "null", "5", "1"],
        correct: "5",
        explanation: "При деструктуризации объекта можно задать значение по умолчанию. Поскольку b отсутствует в объекте {a: 1}, используется значение по умолчанию: 5."
      },
      {
        id: "e7",
        type: "truefalse",
        question: "Symbol.iterator позволяет сделать объект итерируемым с помощью for...of?",
        options: ["true", "false"],
        correct: "true",
        explanation: "Да! Реализовав Symbol.iterator, объект становится итерируемым и работает с for...of, spread, деструктуризацией."
      },
      {
        id: "e8",
        type: "single",
        question: "Что такое WeakMap?",
        options: [
          "Map с ограниченным размером",
          "Map, где ключи должны быть объектами, и они могут быть удалены сборщиком мусора",
          "Синхронная версия Map",
          "Map для хранения примитивов"
        ],
        correct: "Map, где ключи должны быть объектами, и они могут быть удалены сборщиком мусора",
        explanation: "WeakMap хранит слабые ссылки на объекты-ключи. Если объект-ключ больше нигде не доступен, он удаляется сборщиком мусора. WeakMap не итерируемый."
      },
      {
        id: "e9",
        type: "single",
        question: "Что делает оператор ?? (nullish coalescing)?",
        options: [
          "Логическое ИЛИ с учётом только null и undefined",
          "Логическое И",
          "Проверяет на NaN",
          "Преобразует в Boolean"
        ],
        correct: "Логическое ИЛИ с учётом только null и undefined",
        explanation: "a ?? b возвращает b только если a === null или a === undefined. В отличие от ||, который возвращает b для любых falsy значений (0, '', false)."
      },
      {
        id: "e10",
        type: "single",
        question: "Что такое Optional Chaining (?.)?",
        options: [
          "Обязательное свойство объекта",
          "Безопасное обращение к свойствам, которых может не существовать",
          "Тернарный оператор",
          "Оператор instanceof"
        ],
        correct: "Безопасное обращение к свойствам, которых может не существовать",
        explanation: "user?.address?.city вернёт undefined если user или address равны null/undefined, вместо бросания TypeError. Очень удобно для работы с API данными."
      },
      {
        id: "e11",
        type: "text",
        question: "Какой синтаксис используется для именованного экспорта в ES модулях? (первое слово)",
        options: [],
        correct: "export",
        explanation: "Именованный экспорт: export const name = ...; export function foo() {}; export { name, foo }. Импорт: import { name, foo } from './module.js'."
      },
    ]
  },
  {
    id: "test-async",
    title: "Асинхронный JavaScript",
    description: "Event Loop, Promise, async/await, Fetch API",
    topic: "Асинхронность",
    duration: 25,
    questions: [
      {
        id: "a1",
        type: "single",
        question: "В каком порядке выведутся числа: console.log(1); setTimeout(()=>console.log(2),0); Promise.resolve().then(()=>console.log(3)); console.log(4);",
        options: ["1, 2, 3, 4", "1, 4, 2, 3", "1, 4, 3, 2", "4, 3, 2, 1"],
        correct: "1, 4, 3, 2",
        explanation: "Синхронный код (1, 4) → Микрозадачи (Promise → 3) → Макрозадачи (setTimeout → 2). Event Loop: сначала синхронный стек, потом очередь микрозадач, потом макрозадач."
      },
      {
        id: "a2",
        type: "single",
        question: "Что возвращает async функция?",
        options: [
          "Значение напрямую",
          "Promise",
          "Generator",
          "Observable"
        ],
        correct: "Promise",
        explanation: "async функция всегда возвращает Promise. Если функция возвращает значение, оно оборачивается в Promise.resolve(). Ключевое слово await работает только внутри async."
      },
      {
        id: "a3",
        type: "truefalse",
        question: "await можно использовать только внутри async функции?",
        options: ["true", "false"],
        correct: "true",
        explanation: "В обычном коде await нельзя (SyntaxError). Исключение — Top-level await в ES модулях. В остальных случаях нужна async функция."
      },
      {
        id: "a4",
        type: "single",
        question: "Что делает Promise.all()?",
        options: [
          "Выполняет промисы последовательно",
          "Возвращает первый выполнившийся промис",
          "Ждёт все промисы и возвращает массив результатов (или падает если любой rejected)",
          "Игнорирует ошибки"
        ],
        correct: "Ждёт все промисы и возвращает массив результатов (или падает если любой rejected)",
        explanation: "Promise.all([p1, p2, p3]) выполняет промисы параллельно и возвращает массив результатов. Если хотя бы один rejected — весь Promise.all отклоняется."
      },
      {
        id: "a5",
        type: "single",
        question: "Чем Promise.allSettled() отличается от Promise.all()?",
        options: [
          "Нет разницы",
          "allSettled ждёт все промисы и не падает на ошибках",
          "allSettled быстрее",
          "allSettled работает только с async функциями"
        ],
        correct: "allSettled ждёт все промисы и не падает на ошибках",
        explanation: "Promise.allSettled всегда ждёт все промисы и возвращает массив {status, value/reason}. Promise.all падает при первом rejected."
      },
      {
        id: "a6",
        type: "truefalse",
        question: "fetch() автоматически выбрасывает ошибку при статусе HTTP 404?",
        options: ["true", "false"],
        correct: "false",
        explanation: "fetch() reject только при сетевых ошибках (нет соединения). HTTP статусы 4xx и 5xx НЕ вызывают reject. Нужно проверять response.ok или response.status."
      },
      {
        id: "a7",
        type: "single",
        question: "Как правильно обрабатывать ошибки в async/await?",
        options: [
          ".catch() в конце",
          "try...catch блок",
          "Ошибки не нужно обрабатывать",
          "if...else"
        ],
        correct: "try...catch блок",
        explanation: "С async/await используют try...catch для синхронного стиля обработки ошибок. Также можно использовать .catch() на промисе, возвращаемом async функцией."
      },
      {
        id: "a8",
        type: "single",
        question: "Что такое Event Loop в JavaScript?",
        options: [
          "Цикл for для обработки событий",
          "Механизм выполнения асинхронных операций в однопоточном JS",
          "Библиотека для работы с событиями",
          "Web API браузера"
        ],
        correct: "Механизм выполнения асинхронных операций в однопоточном JS",
        explanation: "Event Loop следит за стеком вызовов и очередями задач. Когда стек пуст, берёт задачи из очереди (сначала микрозадачи, потом макрозадачи)."
      },
      {
        id: "a9",
        type: "multiple",
        question: "Что относится к макрозадачам (macrotasks)?",
        options: [
          "setTimeout",
          "setInterval",
          "Promise.then",
          "queueMicrotask",
          "setImmediate (Node.js)",
          "requestAnimationFrame"
        ],
        correct: ["setTimeout", "setInterval", "setImmediate (Node.js)", "requestAnimationFrame"],
        explanation: "Макрозадачи: setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O события. Микрозадачи: Promise.then, queueMicrotask, MutationObserver."
      },
      {
        id: "a10",
        type: "single",
        question: "Что вернёт fetch('/api/data') без await?",
        options: [
          "Данные от сервера",
          "Promise",
          "undefined",
          "XMLHttpRequest"
        ],
        correct: "Promise",
        explanation: "fetch возвращает Promise<Response>. Без await вы получите промис, а не данные. Нужен await fetch() или .then() для получения Response, и ещё один await для .json()."
      },
      {
        id: "a11",
        type: "truefalse",
        question: "AbortController позволяет отменить fetch-запрос?",
        options: ["true", "false"],
        correct: "true",
        explanation: "Да! const controller = new AbortController(); fetch(url, {signal: controller.signal}); controller.abort(); — отменяет запрос, промис отклоняется с AbortError."
      },
    ]
  }
];

export function getTestById(id: string): Test | undefined {
  return tests.find((t) => t.id === id);
}
