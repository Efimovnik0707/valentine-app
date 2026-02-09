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

## Деплой на Vercel

1. Push в GitHub
2. Import в Vercel
3. Добавь env переменные
4. Deploy
