# План: i18n — английская версия в одном проекте

## Решения

- **Стратегия:** i18n в одном проекте, кнопка переключения языка
- **Автоопределение:** `i18next-browser-languagedetector` — порядок: `localStorage` → `navigator.language` → fallback `ru`
- **IP-детекция:** Не используется (нужен backend/API). Браузерных настроек достаточно; при желании позже можно добавить Vercel Edge `x-vercel-ip-country` или geo-API
- **URL:** Один набор маршрутов (`/`, `/create`, `/demo`, `/v/:id`). Язык хранится в localStorage и query `?lng=en`. Для SEO при необходимости позже — префикс `/en/`

---

## Этапы

### 1. Зависимости
- `i18next`
- `react-i18next`
- `i18next-browser-languagedetector`

### 2. Структура
```
src/
  i18n/
    index.ts         # конфиг i18next + LanguageDetector
  locales/
    ru.json
    en.json
```

### 3. Конфиг i18n
- `supportedLngs: ['ru', 'en']`
- `fallbackLng: 'ru'`
- Детектор: `localStorage` → `navigator` → `htmlTag`
- `caches: ['localStorage']` — сохранять выбор пользователя

### 4. Компонент LanguageSwitcher
- Кнопка RU | EN в header
- При клике: `i18n.changeLanguage(lng)` — автоматом пишет в localStorage

### 5. Файлы переводов
Собрать все строки из:
- Landing, Create, Demo, Valentine
- ScreenIntro, ScreenNoReaction, ScreenTease, ScreenSuccess
- ShareButtons, HowItWorks, YesWorkflowBlock

### 6. Интеграция
- Импорт i18n в `main.tsx` до рендера
- `useTranslation()` в компонентах
- Замена хардкода на `t('key')`

### 7. Роутинг
- Без изменений: те же Route. Язык не в пути
- Опционально: поддержка `?lng=en` при первом заходе (детектор делает это из коробки)

### 8. Meta / SEO (опционально)
- `document.documentElement.lang = i18n.language`
- При необходимости: `hreflang` в index.html через скрипт

---

## Порядок реализации

1. npm install → создать i18n config → locales (ru, en)
2. Подключить i18n в main.tsx
3. LanguageSwitcher → добавить в Landing, Create, Demo
4. По очереди заменить строки в компонентах на `t(...)`
5. Проверка: переключение, автоопределение, persistence
