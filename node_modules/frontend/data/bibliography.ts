export interface BibliographyItem {
  id: string;
  author: string;
  title: string;
  year: number;
  publisher?: string;
  url?: string;
  type: "book" | "online" | "article";
  description: string;
}

export const bibliography: BibliographyItem[] = [
  {
    id: "bib1",
    author: "Флэнаган, Дэвид",
    title: "JavaScript: Полное руководство. 7-е издание",
    year: 2021,
    publisher: "O'Reilly Media",
    url: "https://www.oreilly.com/library/view/javascript-the-definitive/9781491952016/",
    type: "book",
    description: "Исчерпывающий справочник по JavaScript — настольная книга для каждого JS-разработчика. Охватывает все аспекты языка от основ до продвинутых тем."
  },
  {
    id: "bib2",
    author: "Симпсон, Кайл",
    title: "You Don't Know JS (серия книг)",
    year: 2015,
    publisher: "O'Reilly Media",
    url: "https://github.com/getify/You-Dont-Know-JS",
    type: "book",
    description: "Глубокое погружение в механизмы JavaScript: области видимости, замыкания, this, прототипы, асинхронность и ES6+. Доступна бесплатно на GitHub."
  },
  {
    id: "bib3",
    author: "Сообщество MDN",
    title: "MDN Web Docs — JavaScript",
    year: 2024,
    url: "https://developer.mozilla.org/ru/docs/Web/JavaScript",
    type: "online",
    description: "Официальная документация JavaScript от Mozilla. Самый полный и актуальный справочник по всем возможностям языка."
  },
  {
    id: "bib4",
    author: "Кантелон, Майк и др.",
    title: "Node.js в действии",
    year: 2017,
    publisher: "Manning Publications",
    url: "https://www.manning.com/books/node-js-in-action-second-edition",
    type: "book",
    description: "Практическое руководство по Node.js — серверной платформе JavaScript. Охватывает асинхронное программирование, HTTP, базы данных и REST API."
  },
  {
    id: "bib5",
    author: "Хавербеке, Марейн",
    title: "Выразительный JavaScript. 3-е издание",
    year: 2019,
    publisher: "No Starch Press",
    url: "https://eloquentjavascript.net/",
    type: "book",
    description: "Элегантное введение в программирование и JavaScript. Доступна бесплатно онлайн на русском языке. Отличный выбор для начинающих."
  },
  {
    id: "bib6",
    author: "Crockford, Douglas",
    title: "JavaScript: Сильные стороны",
    year: 2008,
    publisher: "O'Reilly Media",
    type: "book",
    description: "Классическая книга о хороших частях JavaScript. Описывает лучшие практики и паттерны проектирования. Несмотря на возраст, сохраняет актуальность."
  },
  {
    id: "bib7",
    author: "Команда ECMAScript",
    title: "Спецификация ECMAScript 2024",
    year: 2024,
    url: "https://tc39.es/ecma262/",
    type: "online",
    description: "Официальная спецификация языка JavaScript от комитета TC39. Содержит формальное описание всех возможностей стандарта."
  },
  {
    id: "bib8",
    author: "Осипов, Илья",
    title: "JavaScript.info — Современный учебник JavaScript",
    year: 2024,
    url: "https://learn.javascript.ru/",
    type: "online",
    description: "Лучший бесплатный учебник по JavaScript на русском языке. Охватывает все аспекты от основ до продвинутых тем с детальными объяснениями."
  },
  {
    id: "bib9",
    author: "Герман Фриман и Элизабет Фримен",
    title: "Изучаем паттерны проектирования",
    year: 2020,
    publisher: "O'Reilly Media",
    type: "book",
    description: "Классические паттерны проектирования с примерами на JavaScript. Singleton, Observer, Factory, Strategy и многие другие."
  },
  {
    id: "bib10",
    author: "TC39",
    title: "TC39 Proposals — будущие возможности JavaScript",
    year: 2024,
    url: "https://github.com/tc39/proposals",
    type: "online",
    description: "Репозиторий со всеми предложениями по развитию JavaScript. Здесь можно узнать, что появится в будущих версиях стандарта."
  },
  {
    id: "bib11",
    author: "Resilient Web Design",
    title: "Выразительный CSS и JavaScript",
    year: 2022,
    url: "https://web.dev/",
    type: "online",
    description: "Google Web.dev — актуальные материалы по веб-разработке: производительность, доступность, современные API браузера."
  },
  {
    id: "bib12",
    author: "Адди Османи",
    title: "Паттерны JavaScript",
    year: 2012,
    publisher: "O'Reilly Media",
    url: "https://www.patterns.dev/",
    type: "book",
    description: "Подробный обзор паттернов программирования JavaScript. Несмотря на возраст, большинство паттернов актуальны и сегодня."
  },
];
