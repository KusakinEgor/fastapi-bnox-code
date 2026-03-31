<h1 align="center" style="display: block; font-size: 2.5em; font-weight: bold; margin-block-start: 1em; margin-block-end: 1em;">
  <a name="logo">
    <img src="pictures/home.PNG" alt="AREG SDK Home" style="width:100%;height:100%"/>
  </a>
  <br /><br />
  <strong>WEB IDE</strong>
</h1>

<div align="center">

![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)

</div>

<p align="center">
  <em>BnoxCode — это веб-сервис, где можно писать и запускать код на <b>JavaScript</b> и <b>Python</b> прямо в браузере,<br />
  а также получать помощь от встроенного <b>AI-ассистента</b>.</em>
</p>

## Содержание
- [Быстрый старт](#быстрый-старт)
- [Докер](#докер)
- [Стек технологий](#стек-технологий)
- [Функциональность](#функциональность)
- [Скриншоты](#скриншоты)
- [Архитектура проекта](#архитектура-проекта)

## Быстрый старт

1. **Клонируем резпозиторий:**
    ```bash
    git clone https://github.com/KusakinEgor/bnox-code.git

    cd bnox-code/backend/app

    pip install -r requirements-dev.txt
    ```
2. **Создаем и настриваем .env файл:**
- Скопируйте пример:
    ```bash
    cp .env.example .env
    ```
- Откройте `.env` и заполните своими ключами:

    ```env
    # GitHub OAuth
    CLIENT_ID=<ваш GitHub Client ID>
    CLIENT_SECRET=<ваш GitHub Client Secret>
    REDIRECT_URI=http://localhost:5173/ide

    # Google OAuth
    GOOGLE_CLIENT_ID=<ваш Google Client ID>
    GOOGLE_CLIENT_SECRET=<ваш Google Client Secret>
    GOOGLE_REDIRECT_URI=http://localhost:8000/login/google/callback
    GOOGLE_SCOPE=openid email profile

    # AI-ассистент
    GIGA_CLIENT_ID=<ваш GigaChat Client ID>
    GIGA_CLIENT_SECRET=<ваш GigaChat Client Secret>

    # Email для уведомлений
    SENDER_EMAIL=<ваш email>
    SENDER_PASSWORD=<пароль приложения>
    ```

    **Где взять ключи:**
    - **GitHub**: [OAuth Apps](https://github.com/settings/developers)
    - **Google**: [Google Cloud Console → Credentials](https://console.cloud.google.com/)
    - **GigaChat**: [GigaChat](https://giga.chat/) → зарегистрируйтесь и получите Client ID/Secret
    - **Email**: для Gmail используйте [App Password](https://support.google.com/accounts/answer/185833) или любой другой SMTP-сервис

3. **Настройка базы данных и миграции (Alembic)**

- Alembic используется для управления схемой базы данных PostgreSQL.

1. **Инициализация Alembic (в папке `backend`):**
    ```bash
    alembic init alembic
    ```
2. **Настройка подключения к базе:** <br>
В файле `alembic.ini` укажите `sqlalchemy.url`:
    ```ini
    sqlalchemy.url = postgresql+psycopg2://user:password@localhost:5432/db_name
    ```
3. **Настройка `env.py` для автоматического создания миграций:** <br>
    ```python
    from app.api.db.database import Base  # импортируем Base с моделями
    target_metadata = Base.metadata
    ```
4. **Создание миграций:** <br>
После добавления или изменения моделей в `backend/app/api/models`:
    ```bash
    alembic revision --autogenerate -m "Описание изменений"
    ```
5. **Применение миграций к базе данных**
    ```bash
    alembic upgrade head
    ```
💡 **Совет:** 
- Каждое изменение моделей должно сопровождаться новой миграцией.
- Alembic хранит миграции в папке `alembic/versions`.

## Настройка фронтенда:
- Перейдите в папку фронтенда и установите зависимости:
    ```bash
    cd frontend

    npm install
    ```
- Запуск фронтенда:
    ```bash
    npm run dev
    ```

## Докер

Для работы веб-IDE и запуска кода в изолированных контейнерах необходимо иметь **установленный Docker**: [Инструкция по установке](https://docs.docker.com/get-docker/).

Все нужные контейнеры уже подготовлены, и они **автоматически запускаются при выполнении кода пользователей**. Поэтому после установки Docker система готова к работе.

## Стек технологий

| Категория   | Технологии |
|-------------|------------|
| **Backend** | ![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white) <br> ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white) |
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) |
| **Infra**   | ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white) |
| **AI**      | ![GigaChat](https://img.shields.io/badge/GigaChat-2E7D32?logo=sberbank&logoColor=white) |


## Функциональность

- **Онлайн-редактор кода**  
  Поддержка **JavaScript** и **Python** с удобной подсветкой синтаксиса прямо в браузере.  

- **Запуск в изолированных контейнерах**  
  Код каждого пользователя выполняется безопасно и независимо, без риска «сломать» общий сервер.  

- **Подсветка синтаксиса и автодополнение**  
  Удобное редактирование кода благодаря современному редактору с подсказками.  

- **Авторизация и управление пользователями**  
  Поддержка входа через **GitHub OAuth2** или JWT-токены.  

- **AI-ассистент (GigaChat)**  
  Встроенный помощник на базе ИИ, который помогает писать и отлаживать код, объясняет ошибки и предлагает улучшения.

## Скриншоты

<p align="center">
  <img src="pictures/auth.PNG" width="800" style="border: 4px solid white; border-radius: 8px;"/>
  <br><em>Авторизация через GitHub OAuth2</em>
</p>

<p align="center">
  <img src="pictures/ide.PNG" width="800" style="border: 4px solid white; border-radius: 8px;"/>
  <br><em>Онлайн-редактор с подсветкой синтаксиса и запуском кода</em>
</p>

<p align="center">
  <img src="pictures/profile.PNG" width="800" style="border: 4px solid white; border-radius: 8px;"/>
  <br><em>Профиль пользователя с историей кода и настройками</em>
</p>

<p align="center">
  <img src="pictures/features1.PNG" width="800" style="border: 4px solid white; border-radius: 8px;"/>
  <br><em>Раздел «Функциональность» — демонстрация всех ключевых возможностей веб-IDE и AI-ассистента</em>
</p>

<p align="center">
  <img src="pictures/contact.PNG" width="800" style="border: 4px solid white; border-radius: 8px;"/>
  <br><em>Раздел «Контакты» — пользователи могут отправлять сообщения или обратную связь через веб-форму</em>
</p>


## Архитектура проекта

Проект построен по принципам **чистой архитектуры** и разделения ответственности между слоями.  

---

### Backend
- **FastAPI** — основной веб-фреймворк для создания REST API  
- **SQLAlchemy + Alembic** — работа с PostgreSQL и управление миграциями  
- **Pydantic** — валидация и сериализация данных  
- **JWT (OAuth2)** — аутентификация пользователей  

**Структура папок:**

```text
backend/
├─ alembic/                  # миграции базы данных
├─ app/
│  ├─ api/                   # REST API endpoints
│  │  ├─ core/               # утилиты и хелперы️
│  │  ├─ db/                 # база данных (Base, engine, сессии)
│  │  ├─ models/             # SQLAlchemy модели
│  │  ├─ services/           # бизнес-логика
│  │  ├─ tests/              # тесты для API и сервисов
│  │  ├─ v1/                 # версии API (роуты, контроллеры)
│  │  ├─ config.py           # конфигурация проекта
│  │  └─ main.py             # запуск FastAPI приложения
│  └─ requirements-dev.txt   # зависимости для разработки
└─ .env                      # переменные окружения
```

### Frontend

- **Vite** + **React** — современный фронтенд для интерактивного UI
- **Структура папок**:
```text
frontend/
├─ node_modules/  # зависимости
├─ public/  # статичные файлы (favicon и т.п.)
├─ src/  # исходники приложения
│  ├─ api/  # запросы к backend
│  ├─ assets/  # картинки, шрифты, стили
│  ├─ components/  # переиспользуемые UI-компоненты
│  ├─ pages/  # страницы приложения
│  ├─ types/ (@types)  # глобальные типы TypeScript
│  ├─ App.tsx  # корневой компонент
│  ├─ main.tsx  # точка входа
│  ├─ index.css  # глобальные стили
│  └─ env.d.ts  # декларации окружения
├─ index.html  # html-шаблон
├─ package.json  # зависимости и скрипты
├─ vite.config.ts  # конфиг Vite
├─ tsconfig.json  # базовая конфигурация TS
└─ eslint.config.js  # правила линтинга
```

### Интеграции и сервисы

- OAuth: GitHub и Google для аутентификации
- AI-ассистент (GigaChat): генерация данных и сервисов через API
- Email уведомления: отправка через SMTP
