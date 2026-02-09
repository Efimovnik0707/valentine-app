# Валентинка — Создай свою

Интерактивная валентинка с убегающей кнопкой «Нет» и кастомными фото.

## Быстрый старт

```bash
npm install
npm run dev
```

## Настройка Supabase

1. Создай проект на [supabase.com](https://supabase.com)
2. В SQL Editor выполни [supabase/migrations/001_init.sql](supabase/migrations/001_init.sql)
3. В Storage создай bucket `photos` (публичный)
4. Policies для Storage:
   - `Allow public read` — select для всех
   - `Allow anonymous upload` — insert для anon
5. Скопируй `.env.example` в `.env` и заполни:
   ```
   VITE_SUPABASE_URL=https://xxx.supabase.co
   VITE_SUPABASE_ANON_KEY=твой_ключ
   VITE_YOUTUBE_SHORT_ID=id_твоего_short
   ```

## YouTube Short

Загрузи видео в YouTube Shorts. ID берётся из URL: `youtube.com/shorts/VIDEO_ID`

## Демо-фото

На странице `/demo` используются фото по умолчанию. Чтобы поставить свои:

**Вариант 1 (локальные файлы):** положи `demo-photo1.jpg` и `demo-photo2.jpg` в папку `public/`, добавь в `.env`:
```
VITE_DEMO_PHOTO_1=/demo-photo1.jpg
VITE_DEMO_PHOTO_2=/demo-photo2.jpg
```

**Вариант 2 (URL):** укажи полные ссылки на изображения в `.env`.

В Vercel те же переменные добавляй в **Settings → Environment Variables**.

## Как вносить изменения и деплоить

1. Редактируй код локально
2. `git add .`
3. `git commit -m "Описание изменений"`
4. `git push`
5. Vercel автоматически задеплоит новую версию (1–2 минуты)

## Деплой на Vercel

1. Push в GitHub
2. Import в Vercel
3. Добавь env переменные
4. Deploy
