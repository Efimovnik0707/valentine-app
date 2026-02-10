# Настройка автоочистки (cron)

Edge Function `cleanup-expired` уже задеплоена. Чтобы cron вызывал её ежедневно:

1. Открой **Supabase Dashboard** → SQL Editor.

2. Выполни SQL (если ещё не применял миграции 002 и 003):

```sql
-- 1. Колонка expires_at (если её ещё нет)
alter table public.valentines
  add column if not exists expires_at timestamptz
  generated always as (created_at + interval '10 days') stored;
create index if not exists idx_valentines_expires_at on public.valentines (expires_at);

-- 2. Расширения
create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

-- 3. Секреты в Vault (подставь свои значения)
select vault.create_secret('https://ohzrpzztdcysagoyaowh.supabase.co', 'project_url');
select vault.create_secret('ТВОЙ_ANON_KEY_ИЛИ_SERVICE_ROLE_KEY', 'anon_key');

-- 4. Cron: ежедневно в 04:00 UTC
select cron.schedule(
  'cleanup-expired-valentines',
  '0 4 * * *',
  $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name = 'project_url') || '/functions/v1/cleanup-expired',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'anon_key')
    ),
    body := '{}'::jsonb
  ) as request_id;
  $$
);
```

3. Anon key — в Dashboard → Settings → API, либо в `.env` как `VITE_SUPABASE_ANON_KEY`.
