/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_YOUTUBE_SHORT_ID: string
  readonly VITE_DEMO_PHOTO_1: string
  readonly VITE_DEMO_PHOTO_2: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
