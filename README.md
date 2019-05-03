# Vue Search System

Vue Search System - это поисковая система по репозиториям Github

* SPA структура
* Адаптировность, основные размеры экранара (Desktop, Table, Mobile)
* Кроссбраузерность (для IE >= 10)
* Демонстрация возможностей связки Vue.js + Vuex

## [DEMO](https://vue-search-system.now.sh/)

## Стэк технологий

* [Vue.js](https://ru.vuejs.org/)
* [Vuex](https://vuex.vuejs.org/ru/)
* [Vue Router](https://router.vuejs.org/ru/)
* [Vue CLI v3.x](https://cli.vuejs.org/ru/)
* [Webpack](https://webpack.js.org/) - работает под капотом Vue CLI (+ кастомный конфиг vue.config.js)

а также:

* Pug
* SASS/SCSS
* БЭМ
* [Code-style (Airbnb)](https://github.com/Lavrend/javascript-airbnb)

## Основная структура проекта
```
vue-search-system
└── dist/
└── public/
└── src/
    └── assets/
    └── compiledIcons/
    └── components/
    └── config/
    └── layouts/
    └── pages/
    └── plugins/
    └── store/
    └── styles/
    └── ui/
    └── utils/
    |
    └── App.vue
    └── main.js
    └── router.js

└── package.json
└── vue.config.js
└── README.md
└── ...
```

* compiledIcons/ - скомпилированные svg-иконки
* assets/ - основные ассеты приложения (шрифты, картинки, иконки, и т.д.)
* components/ - основные компоненты приложения
* config/ - конфиги
* layouts/ - компоненты отображения, макеты (layouts)
* pages/ - компоненты страниц (Home, About, etc.)
* plugins/ - кастомные функционал Vue.js (Плагины)
* store/ - компоненты хранилища, глобальное состояние (Vuex Store)
* styles/ - глобальные стили (миксины, variables, transitions, etc.)
* ui/ - базовые, кастомные компоненты интерфейса (кнопки, селекты, инпуты, иконки, и т.д.)
* utils/ - вспомогательные скрипты и утилиты (Хэлперы)
* App.vue - основной компонент приложения
* main.js - точка входа
* router.js - маршрутизация приложения

## Установка

Для работы необходим [Node.js](https://nodejs.org/) и менеджер пакетов ([npm](https://www.npmjs.com/) или [yarn](https://yarnpkg.com/))

* Node.js - v10.14.2
* yarn - v1.15.2

### 1. Установить зависимости

```sh
cd vue-gallery
yarn install
```

### 2. Собрать svg иконки (разовая сборка)
```
yarn run svg
```

### 3. Собрать локально, запустить дев сервер

```sh
yarn start
```

## Боевая сборка

В последствии сборка и деплой будет автоматизирована, но пока что все скрипты запускаются независимо

### Собрать и минифицировать билд
```
yarn build
```

### Запустить eslint
```
yarn lint
```

### Деплой
```
yarn deploy
```

Для деплоя и хостинга используется платформа Now Platform v2.0 - [Cборщик @now/static-build](https://zeit.co/guides/deploying-vuejs-to-now)

## TODO
