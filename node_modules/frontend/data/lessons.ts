export interface Lesson {
  id: string;
  sectionId: string;
  title: string;
  duration: string;
  content: string;
  order: number;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  lessons: Lesson[];
}

export const sections: Section[] = [
  {
    id: "intro",
    title: "Введение в JavaScript",
    description: "История языка, применение, первые шаги",
    icon: "BookOpen",
    order: 1,
    lessons: [
      {
        id: "intro-1",
        sectionId: "intro",
        title: "Что такое JavaScript?",
        duration: "15 мин",
        order: 1,
        content: `## Что такое JavaScript?

JavaScript — это высокоуровневый, интерпретируемый язык программирования с динамической типизацией. Он является одним из трёх ключевых технологий Всемирной паутины наряду с HTML и CSS.

### История

JavaScript был создан **Бренданом Эйхом** в 1995 году за 10 дней работы в компании Netscape. Первоначально язык назывался Mocha, затем LiveScript, и наконец получил имя JavaScript.

Несмотря на схожесть названий, JavaScript и Java — принципиально разные языки. Название было выбрано из маркетинговых соображений.

### Где используется JavaScript?

- **Браузер (Frontend)** — интерактивность, анимации, работа с DOM
- **Сервер (Backend)** — Node.js, Deno, Bun
- **Мобильные приложения** — React Native, NativeScript
- **Десктоп** — Electron (VS Code, Discord написаны на Electron)
- **IoT и встроенные системы**

### Стандарт ECMAScript

JavaScript стандартизирован под именем **ECMAScript**. Ежегодно выходят новые версии стандарта:
- ES5 (2009) — базовый современный JS
- ES6/ES2015 — революционное обновление (стрелочные функции, классы, промисы и др.)
- ES2016, ES2017... ES2024 — ежегодные обновления

### Первая программа

\`\`\`javascript
// Вывод в консоль браузера
console.log("Привет, мир!");

// Диалоговое окно
alert("Добро пожаловать в JS Academy!");

// Запись в HTML
document.getElementById("output").textContent = "Hello, JavaScript!";
\`\`\`

Откройте DevTools браузера (F12 → Console) и введите любой JS-код прямо сейчас!`,
      },
      {
        id: "intro-2",
        sectionId: "intro",
        title: "Подключение JS к HTML",
        duration: "10 мин",
        order: 2,
        content: `## Подключение JavaScript к HTML

Существует несколько способов подключить JavaScript к HTML-странице.

### 1. Встроенный скрипт (inline)

\`\`\`html
<button onclick="alert('Клик!')">Нажми меня</button>
\`\`\`

Не рекомендуется: смешивает HTML и JS.

### 2. Внутренний скрипт (тег \`<script>\`)

\`\`\`html
<html>
<body>
  <h1 id="title">JS Academy</h1>
  <script>
    document.getElementById("title").style.color = "blue";
  </script>
</body>
</html>
\`\`\`

### 3. Внешний файл (рекомендуется)

\`\`\`html
<!-- В конце body для быстрой загрузки -->
<script src="script.js"></script>

<!-- Или с атрибутом defer -->
<script src="script.js" defer></script>
\`\`\`

### Атрибуты async и defer

| Атрибут | Поведение |
|---------|-----------|
| Без атрибута | Блокирует парсинг HTML |
| \`async\` | Загружается параллельно, выполняется сразу |
| \`defer\` | Загружается параллельно, выполняется после парсинга |

\`\`\`html
<!-- defer: выполнится после загрузки DOM -->
<script src="main.js" defer></script>

<!-- async: выполнится как только загрузится -->
<script src="analytics.js" async></script>
\`\`\`

### Консоль разработчика

\`\`\`javascript
console.log("Информация");         // Обычный вывод
console.warn("Предупреждение");    // Жёлтый цвет
console.error("Ошибка!");         // Красный цвет
console.table([1, 2, 3]);         // Таблица
console.time("Тест");             // Начало замера времени
console.timeEnd("Тест");          // Конец замера времени
\`\`\``,
      },
    ],
  },
  {
    id: "variables",
    title: "Переменные и типы данных",
    description: "var, let, const, примитивы, объекты, преобразования",
    icon: "Code",
    order: 2,
    lessons: [
      {
        id: "variables-1",
        sectionId: "variables",
        title: "Переменные: var, let, const",
        duration: "20 мин",
        order: 1,
        content: `## Переменные в JavaScript

Переменная — это именованная область памяти для хранения данных. В JavaScript есть три способа объявить переменную.

### var (устаревший)

\`\`\`javascript
var name = "Иван";
var age = 25;
var isStudent = true;

// var имеет функциональную область видимости
function test() {
  var x = 10;
  if (true) {
    var x = 20; // та же переменная!
    console.log(x); // 20
  }
  console.log(x); // 20 — изменилась!
}

// Проблема: hoisting (поднятие)
console.log(y); // undefined (не ошибка!)
var y = 5;
\`\`\`

### let (современный)

\`\`\`javascript
let counter = 0;
counter = 1; // можно переприсвоить

// let имеет блочную область видимости
function test() {
  let x = 10;
  if (true) {
    let x = 20; // другая переменная!
    console.log(x); // 20
  }
  console.log(x); // 10 — не изменилась
}

// Temporal Dead Zone (TDZ)
console.log(z); // ReferenceError!
let z = 5;
\`\`\`

### const (константа)

\`\`\`javascript
const PI = 3.14159;
// PI = 3; // TypeError: Assignment to constant variable

const user = { name: "Мария" };
user.name = "Анна"; // ОК! Объект мутируемый
// user = {}; // TypeError

const colors = ["red", "green"];
colors.push("blue"); // ОК!
// colors = []; // TypeError
\`\`\`

### Правила именования

\`\`\`javascript
// Валидные имена:
let myVariable;
let _privateVar;
let $price;
let userName2;
let привет; // Unicode разрешён, но не рекомендуется

// Невалидные:
// let 2name;     // нельзя начинать с цифры
// let my-var;    // нельзя использовать дефис
// let let;       // нельзя использовать ключевые слова

// Соглашения:
let camelCase = "переменные и функции";
const UPPER_CASE = "константы";
class PascalCase {} // классы
\`\`\`

### Когда что использовать?

- **\`const\`** — по умолчанию для всего
- **\`let\`** — когда значение будет меняться
- **\`var\`** — никогда (устарел)`,
      },
      {
        id: "variables-2",
        sectionId: "variables",
        title: "Типы данных",
        duration: "25 мин",
        order: 2,
        content: `## Типы данных JavaScript

JavaScript — язык с **динамической типизацией**: тип переменной определяется во время выполнения.

### 8 типов данных

#### Примитивные (7 типов):

\`\`\`javascript
// 1. Number — числа
let integer = 42;
let float = 3.14;
let negative = -100;
let infinity = Infinity;
let negInfinity = -Infinity;
let notNumber = NaN; // результат ошибочных вычислений

console.log(0.1 + 0.2); // 0.30000000000000004 (!)
console.log(Number.isNaN(NaN)); // true
console.log(Number.isFinite(Infinity)); // false

// 2. BigInt — большие целые числа
const bigNum = 9007199254740991n;
const alsoHuge = BigInt(9007199254740991);

// 3. String — строки
let single = 'Привет';
let double = "Мир";
let template = \`1 + 1 = \${1 + 1}\`; // шаблонная строка

// 4. Boolean — логический тип
let isTrue = true;
let isFalse = false;

// 5. null — намеренное отсутствие значения
let empty = null;

// 6. undefined — переменная объявлена, но не инициализирована
let notDefined;
console.log(notDefined); // undefined

// 7. Symbol — уникальный идентификатор
const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2); // false — всегда уникален
\`\`\`

#### Ссылочный тип:

\`\`\`javascript
// 8. Object — объекты, массивы, функции
const person = { name: "Алексей", age: 30 };
const numbers = [1, 2, 3, 4, 5];
const greet = function() { return "Привет!"; };
\`\`\`

### Оператор typeof

\`\`\`javascript
typeof 42            // "number"
typeof "hello"       // "string"
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof null          // "object" (историческая ошибка JS!)
typeof {}            // "object"
typeof []            // "object"
typeof function(){}  // "function"
typeof Symbol()      // "symbol"
typeof 42n           // "bigint"
\`\`\`

### Преобразование типов

\`\`\`javascript
// Явное преобразование
Number("42")     // 42
Number("abc")    // NaN
Number(true)     // 1
Number(false)    // 0
Number(null)     // 0
Number(undefined) // NaN

String(42)       // "42"
String(true)     // "true"
String(null)     // "null"

Boolean(0)       // false (falsy)
Boolean("")      // false (falsy)
Boolean(null)    // false (falsy)
Boolean(undefined) // false (falsy)
Boolean(NaN)     // false (falsy)
Boolean("hello") // true (truthy)
Boolean(42)      // true (truthy)
Boolean([])      // true (truthy!)
Boolean({})      // true (truthy!)

// Неявное преобразование (коерция)
"5" + 3    // "53" (число → строка)
"5" - 3    // 2 (строка → число)
"5" * "2"  // 10
true + 1   // 2
false + 1  // 1
null + 1   // 1
undefined + 1 // NaN
\`\`\``,
      },
    ],
  },
  {
    id: "functions",
    title: "Функции",
    description: "Объявление, стрелочные функции, замыкания, рекурсия",
    icon: "Zap",
    order: 3,
    lessons: [
      {
        id: "functions-1",
        sectionId: "functions",
        title: "Объявление функций",
        duration: "25 мин",
        order: 1,
        content: `## Функции в JavaScript

Функция — это блок многоразового кода. В JS функции являются **объектами первого класса** (first-class citizens).

### Способы объявления

\`\`\`javascript
// 1. Function Declaration (поднимается в начало)
function greet(name) {
  return "Привет, " + name + "!";
}
console.log(greet("Мир")); // работает до объявления!

// 2. Function Expression
const square = function(x) {
  return x * x;
};

// 3. Arrow Function (ES6+)
const add = (a, b) => a + b;
const double = x => x * 2;
const getObject = () => ({ key: "value" }); // скобки нужны для объекта

// 4. Немедленно вызываемая функция (IIFE)
(function() {
  console.log("Выполняется немедленно!");
})();

// 5. Генераторная функция
function* counter() {
  yield 1;
  yield 2;
  yield 3;
}
\`\`\`

### Параметры и аргументы

\`\`\`javascript
// Параметры по умолчанию (ES6+)
function createUser(name, role = "user", active = true) {
  return { name, role, active };
}
createUser("Анна");           // { name: "Анна", role: "user", active: true }
createUser("Иван", "admin");  // { name: "Иван", role: "admin", active: true }

// Rest параметры (заменяют arguments)
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15

// Деструктуризация параметров
function displayUser({ name, age = 0 }) {
  console.log(\`\${name}, \${age} лет\`);
}
displayUser({ name: "Мария", age: 25 });
\`\`\`

### Стрелочные функции vs обычные

\`\`\`javascript
// Обычная функция имеет свой this
const obj1 = {
  name: "Объект",
  getName: function() {
    return this.name; // this = obj1
  }
};

// Стрелочная функция берёт this из окружения
const obj2 = {
  name: "Объект",
  getName: () => {
    return this.name; // this = window/undefined!
  },
  // Правильно: использовать обычную функцию для методов
  getNameCorrect() {
    const arrow = () => this.name; // this = obj2
    return arrow();
  }
};

// Стрелочные функции не имеют:
// - своего this
// - arguments
// - prototype
// - не могут быть конструкторами (new)
\`\`\`

### Замыкания (Closures)

\`\`\`javascript
function makeCounter() {
  let count = 0; // приватная переменная

  return {
    increment() { count++; },
    decrement() { count--; },
    getCount() { return count; }
  };
}

const counter = makeCounter();
counter.increment();
counter.increment();
counter.increment();
console.log(counter.getCount()); // 3

// Фабричная функция с замыканием
function multiply(multiplier) {
  return (number) => number * multiplier;
}

const double = multiply(2);
const triple = multiply(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
\`\`\``,
      },
    ],
  },
  {
    id: "dom",
    title: "DOM и события",
    description: "Работа с Document Object Model, обработчики событий",
    icon: "Layout",
    order: 4,
    lessons: [
      {
        id: "dom-1",
        sectionId: "dom",
        title: "Основы DOM",
        duration: "30 мин",
        order: 1,
        content: `## Document Object Model (DOM)

DOM — это программный интерфейс для HTML-документов. Браузер строит дерево объектов из HTML, которое JS может читать и изменять.

### Выбор элементов

\`\`\`javascript
// Современные методы (рекомендуются)
const elem = document.querySelector(".my-class");     // первый элемент
const elems = document.querySelectorAll("p");         // все элементы (NodeList)

// Классические методы
document.getElementById("header");
document.getElementsByClassName("item"); // HTMLCollection (живая)
document.getElementsByTagName("div");    // HTMLCollection (живая)
\`\`\`

### Изменение содержимого

\`\`\`javascript
const el = document.querySelector("#output");

// Текст
el.textContent = "Новый текст"; // безопасно (не интерпретирует HTML)
el.innerHTML = "<strong>Жирный</strong>"; // осторожно! XSS-уязвимость

// Атрибуты
el.setAttribute("data-id", "42");
el.getAttribute("data-id"); // "42"
el.removeAttribute("data-id");
el.dataset.id = "42"; // то же что data-id

// Классы
el.classList.add("active");
el.classList.remove("hidden");
el.classList.toggle("selected");
el.classList.contains("active"); // true/false
el.className = "new-class another-class";

// Стили
el.style.color = "red";
el.style.backgroundColor = "#0A66C2";
el.style.fontSize = "18px";
\`\`\`

### Создание и удаление элементов

\`\`\`javascript
// Создание
const div = document.createElement("div");
div.textContent = "Новый блок";
div.className = "card";

// Добавление
document.body.appendChild(div);
document.body.prepend(div); // в начало
someElement.after(div);     // после элемента
someElement.before(div);    // перед элементом
someElement.append(div);    // в конец дочерних

// Клонирование
const clone = div.cloneNode(true); // true = глубокое клонирование

// Удаление
div.remove();
parent.removeChild(child); // старый способ

// Обход DOM
el.parentElement;      // родитель
el.children;           // дочерние элементы
el.firstElementChild;  // первый дочерний
el.lastElementChild;   // последний дочерний
el.nextElementSibling; // следующий сосед
el.previousElementSibling; // предыдущий сосед
\`\`\`

### Обработка событий

\`\`\`javascript
const button = document.querySelector("#myButton");

// Рекомендуемый способ
button.addEventListener("click", function(event) {
  console.log("Нажата кнопка!");
  console.log(event.target);    // элемент, вызвавший событие
  console.log(event.currentTarget); // элемент с обработчиком
  event.preventDefault();        // отмена действия по умолчанию
  event.stopPropagation();       // остановка всплытия
});

// Удаление обработчика
function handler(e) { console.log("Click"); }
button.addEventListener("click", handler);
button.removeEventListener("click", handler);

// Всплытие событий
document.querySelector(".parent").addEventListener("click", (e) => {
  console.log("Клик по родителю (всплытие)");
});
document.querySelector(".child").addEventListener("click", (e) => {
  console.log("Клик по дочернему");
  // e.stopPropagation(); // остановить всплытие
});

// Делегирование событий (эффективный паттерн)
document.querySelector(".list").addEventListener("click", (e) => {
  if (e.target.matches(".list-item")) {
    console.log("Клик по элементу:", e.target.textContent);
  }
});
\`\`\``,
      },
    ],
  },
  {
    id: "es6",
    title: "ES6+ возможности",
    description: "Деструктуризация, spread/rest, модули, классы",
    icon: "Star",
    order: 5,
    lessons: [
      {
        id: "es6-1",
        sectionId: "es6",
        title: "Деструктуризация и spread/rest",
        duration: "25 мин",
        order: 1,
        content: `## ES6+ возможности

ES6 (2015) — крупнейшее обновление JavaScript, которое кардинально изменило написание кода.

### Деструктуризация массивов

\`\`\`javascript
const colors = ["красный", "зелёный", "синий"];

// Вместо:
// const first = colors[0];
// const second = colors[1];

const [first, second, third] = colors;
const [primary, , accent] = colors; // пропуск элемента

// Значения по умолчанию
const [a = 1, b = 2] = [10];
console.log(a); // 10
console.log(b); // 2

// Обмен значений
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1

// Rest в деструктуризации
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]
\`\`\`

### Деструктуризация объектов

\`\`\`javascript
const user = { name: "Алексей", age: 28, city: "Москва" };

const { name, age } = user;
const { name: userName, age: userAge } = user; // переименование
const { name: n, country = "Россия" } = user;  // значение по умолчанию

// Вложенная деструктуризация
const { address: { street, zip } = {} } = user;

// В параметрах функции
function greet({ name, age = 0 }) {
  return \`\${name}, \${age} лет\`;
}
greet(user);
\`\`\`

### Spread оператор (...)

\`\`\`javascript
// Копирование массива
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Объединение массивов
const combined = [...arr1, ...arr2];

// Копирование объекта (поверхностное)
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }
const updated = { ...obj1, b: 99 }; // { a: 1, b: 99 }

// Передача массива как аргументов
const nums = [1, 5, 3, 2, 4];
Math.max(...nums); // 5
\`\`\`

### Шаблонные строки

\`\`\`javascript
const name = "Мир";
const greeting = \`Привет, \${name}!\`;

// Многострочные строки
const html = \`
  <div class="card">
    <h2>\${user.name}</h2>
    <p>Возраст: \${user.age}</p>
  </div>
\`;

// Выражения внутри
const price = 100;
const tax = 0.2;
console.log(\`Итого: \${price * (1 + tax)} руб.\`);

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) =>
    result + str + (values[i] ? \`<mark>\${values[i]}</mark>\` : ""), "");
}
const result = highlight\`Привет, \${name}! Тебе \${age} лет.\`;
\`\`\`

### Классы (ES6)

\`\`\`javascript
class Animal {
  #name; // приватное поле (ES2022)
  
  constructor(name, sound) {
    this.#name = name;
    this.sound = sound;
  }
  
  speak() {
    return \`\${this.#name} говорит: \${this.sound}\`;
  }
  
  get name() { return this.#name; }
  set name(val) { this.#name = val; }
  
  static create(name, sound) {
    return new Animal(name, sound);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name, "Гав!");
  }
  
  fetch(item) {
    return \`\${this.name} принёс \${item}!\`;
  }
}

const dog = new Dog("Рекс");
dog.speak(); // "Рекс говорит: Гав!"
dog.fetch("мяч"); // "Рекс принёс мяч!"
\`\`\``,
      },
    ],
  },
  {
    id: "async",
    title: "Асинхронный JavaScript",
    description: "Callbacks, Promise, async/await, fetch API",
    icon: "RefreshCw",
    order: 6,
    lessons: [
      {
        id: "async-1",
        sectionId: "async",
        title: "Promise и async/await",
        duration: "35 мин",
        order: 1,
        content: `## Асинхронный JavaScript

JavaScript — однопоточный язык. Асинхронность позволяет не блокировать выполнение при долгих операциях.

### Event Loop

\`\`\`javascript
console.log("1. Синхронный код");

setTimeout(() => {
  console.log("3. Макрозадача (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("2. Микрозадача (Promise)");
});

console.log("1. Синхронный код (конец)");

// Порядок: 1 → 1 (конец) → 2 → 3
// Микрозадачи выполняются перед макрозадачами!
\`\`\`

### Callbacks (устаревший подход)

\`\`\`javascript
function fetchData(url, callback) {
  setTimeout(() => {
    callback(null, { data: "результат" });
  }, 1000);
}

// Callback Hell (ад колбэков)
fetchData("/users", (err, users) => {
  if (err) handleError(err);
  fetchData("/posts/" + users[0].id, (err, posts) => {
    if (err) handleError(err);
    fetchData("/comments/" + posts[0].id, (err, comments) => {
      // Ещё глубже...
    });
  });
});
\`\`\`

### Promise

\`\`\`javascript
// Создание промиса
const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Данные получены!");
  } else {
    reject(new Error("Что-то пошло не так"));
  }
});

// Использование
promise
  .then(data => {
    console.log(data); // "Данные получены!"
    return data.toUpperCase();
  })
  .then(upper => console.log(upper))
  .catch(err => console.error("Ошибка:", err.message))
  .finally(() => console.log("Промис завершён"));

// Promise.all — все параллельно
const [users, posts] = await Promise.all([
  fetch("/api/users").then(r => r.json()),
  fetch("/api/posts").then(r => r.json())
]);

// Promise.allSettled — ждёт все, не падает на ошибке
const results = await Promise.allSettled([
  Promise.resolve(1),
  Promise.reject("ошибка"),
  Promise.resolve(3)
]);

// Promise.race — первый выигрывает
const fastest = await Promise.race([slowRequest, fastRequest]);

// Promise.any — первый успешный
const first = await Promise.any([failing, failing, Promise.resolve("успех")]);
\`\`\`

### Async/Await

\`\`\`javascript
async function loadUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP ошибка! Статус: \${response.status}\`);
    }
    
    const user = await response.json();
    
    const posts = await fetch(\`/api/posts?userId=\${user.id}\`);
    const postsData = await posts.json();
    
    return { user, posts: postsData };
  } catch (error) {
    console.error("Ошибка загрузки:", error);
    throw error;
  } finally {
    console.log("Загрузка завершена");
  }
}

// Параллельное выполнение с async/await
async function loadAll() {
  // Неправильно (последовательно):
  const users = await fetchUsers();    // ждёт
  const posts = await fetchPosts();    // ждёт
  
  // Правильно (параллельно):
  const [users2, posts2] = await Promise.all([fetchUsers(), fetchPosts()]);
}
\`\`\`

### Fetch API

\`\`\`javascript
// GET запрос
const response = await fetch("https://api.example.com/data");
const data = await response.json();

// POST запрос
const response2 = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer token123"
  },
  body: JSON.stringify({ name: "Анна", email: "anna@example.com" })
});

// Проверка статуса
if (!response.ok) {
  throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
}

// Разные форматы
await response.json();  // JSON
await response.text();  // текст
await response.blob();  // бинарные данные
\`\`\``,
      },
    ],
  },
  {
    id: "modules",
    title: "Модули JavaScript",
    description: "ES модули, import/export, динамические импорты",
    icon: "Package",
    order: 7,
    lessons: [
      {
        id: "modules-1",
        sectionId: "modules",
        title: "ES Модули",
        duration: "20 мин",
        order: 1,
        content: `## ES Модули (ESM)

Модули позволяют разбивать код на переиспользуемые части с чёткими зависимостями.

### Экспорт

\`\`\`javascript
// math.js

// Именованный экспорт
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// Экспорт по умолчанию (один на файл)
export default class Calculator {
  constructor() {
    this.history = [];
  }
  
  add(a, b) {
    const result = a + b;
    this.history.push(\`\${a} + \${b} = \${result}\`);
    return result;
  }
}

// Реэкспорт
export { PI as pi } from "./constants.js";
export * from "./utils.js";
\`\`\`

### Импорт

\`\`\`javascript
// main.js

// Именованный импорт
import { PI, add, subtract } from "./math.js";

// С псевдонимом
import { add as sum } from "./math.js";

// Импорт по умолчанию
import Calculator from "./math.js";

// Всё сразу
import * as math from "./math.js";
math.add(1, 2);
math.PI;

// Смешанный импорт
import Calculator, { PI, add } from "./math.js";

// Динамический импорт (ленивая загрузка)
const module = await import("./heavy-module.js");
const result = module.default.calculate();
\`\`\`

### Динамические импорты

\`\`\`javascript
// Условный импорт
async function loadFeature(featureName) {
  if (featureName === "chart") {
    const { Chart } = await import("./chart.js");
    return new Chart();
  }
  if (featureName === "map") {
    const { Map } = await import("./map.js");
    return new Map();
  }
}

// Ленивая загрузка по клику
button.addEventListener("click", async () => {
  const { createModal } = await import("./modal.js");
  createModal("Привет из динамического модуля!");
});
\`\`\`

### Особенности модулей

\`\`\`javascript
// Модули всегда в строгом режиме ('use strict')
// Каждый модуль имеет свою область видимости
// Модули выполняются один раз (кешируются)
// this === undefined на верхнем уровне

// В HTML используется type="module"
// <script type="module" src="main.js"></script>

// Поддержка в Node.js:
// - Расширение .mjs
// - "type": "module" в package.json
// - import/export вместо require/module.exports
\`\`\``,
      },
    ],
  },
];

export function getAllLessons(): Lesson[] {
  return sections.flatMap((s) => s.lessons);
}

export function getLessonById(id: string): Lesson | undefined {
  return getAllLessons().find((l) => l.id === id);
}

export function getSectionById(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}
