
# TWNSND React.js (FRONTEND)

---

## Установка проекта

- `git clone https://github.com/TWNSND/TWNSND.git`
- `npm install`
- `npm run prepare`

## Запуск проекта

- `npm run start`

---

## Расширения для редактора:

Требуется установить расширения для [VS Code](https://code.visualstudio.com/), если у вас другой редактор, воспользуйтесь поиском [google](https://www.google.com/)/[yandex](https://yandex.ru/)

- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) – открыть **Настройки (Preference)**, **найти** через поиск **Default Formatter**, **выбрать Prettier**.

---

## Список используемых технологий:

- Фреймворк - [React](https://react.dev/learn)
- Маршрутизация (роутинг) – [ReactRouter](https://reactrouter.com/)
- Менеджер состояний – [Redux-Saga](https://redux-saga.js.org/)
- Формы – [React-Hook-Form](https://react-hook-form.com/)

---

## Структура проекта (К чему будем стремиться Актуализировать!!!!)

- `./src/components` – содержит переиспользуемые компоненты.
  - :open_file_folder: папка с названием компонента - `NameComponent`
    - :sunglasses: родительский файл компонента – `index.tsx`
    - :nail_care: файл уникальных стилей для компонента – `styles.module.scss`
    - :muscle: интерфейс с типами данных – `interface.ts`
    - :floppy_disk: xранилище по необходимости – `store.ts`
    - подкомпонент по необходимости – `NameSubComponent.ts`
    - README.md – описание
- `./src/pages` – содержит общие страницы проекта в которых написана логика.
  - :open_file_folder: папка с названием контейнера - `NamePages`
    - :sunglasses: родительский файл страницы – `index.tsx`
      - :nail_care: файл уникальных стилей для компонента – `styles.module.scss`
    - :muscle: интерфейс с типами данных – `interface.ts`
    - :floppy_disk: хранилище по необходимости – `store.ts`
    - :open_file_folder: папка `components` по необходимости
      - :open_file_folder: папка с названием компонента - `NameComponent`
        - :sunglasses: родительский файл компонента – `index.tsx`
      - :nail_care: файл уникальных стилей для компонента – `styles.module.scss`
      - :muscle: интерфейс с типами данных – `interface.ts`
      - :floppy_disk: xранилище по необходимости – `store.ts`
- `./src/types` – содержит глобальные модели данных.
- `./src/assets` – содержит картинки, иконки, глобальные стили.
  - `./src/assets/icons` – :horse: кастомные иконки
  - `./src/assets/picture` – :watermelon: картинки
  - `./src/assets/fonts` – :ok: шрифты
  - `./src/assets/styles` – :nail_care: глобальные стили, стандарты для элементов
    - `index.css` – :nail_care: глобальные стили
    - `typography.css` – :ok: шрифт
    - `standard.ts` – :one: стандарт для элементов системы (например поля)
- `./src/lib` – библиотека готовых решений.
  - `./src/hooks` – :arrow_right_hook: готовые хуки
  - `./src/api` – :calling: работа с запросами

---

## Правила формирования веток

[CONTRIBUTING.md](./CONTRIBUTING.md)

---

## Работа с всплывающими окнами

Всплывающее окно открывается вызовом одного из методов объекта `toast`.

Методы: `success` | `error` | `info` | `warning`.

- eсли требуется отобразить уведомление при переходе с одной страницы на другую необходимо в передать ключ `success`, со значением сообщения в `history.push`

### Пример использования 1

```javascript
toast.success('Паспорт справочника успешно обновлен')
```

### Пример использования 2

```javascript
push(`/nsi/catalogs/${id}/passport/show`, {
  success: 'Паспорт справочника успешно обновлен'
})
```

---

### Правила именованования

- Интерфейсы должны начинаться с префикса I

```typescript
interface IProps {
  edit: boolean
}
```

```typescript
type TProps = {
  edit: boolean
}
```

### Правила импорта файлов

1. Сторонние библиотеки, которые мы устанавливаем с npm/yarn
2. components (сначала компоненты, потом стили, всё отдельными блоками)
3. Внутренние компоненты
4. Работа со стором
5. lib
6. constants
7. types

Пример:

```javascript
// 1
import React, { useEffect } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

// 2
import ContentWrapper from 'components/ContentWrapper'
import Tabs from 'components/Tabs'

// 3
import Section0 from './Section0'
import Section1 from './Section1'

// 4
import { changeUser, getUser } from './store'

// 5
import { useFirstRender } from 'lib/hooks'

// 6
import { IPage } from 'types/types'
```

---

## Дополнительное описание

#### components

- тут надо добавить описание компонентов

#### lib

- тут надо добавить описание библиотек

TWNSND React js

