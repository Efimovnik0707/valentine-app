import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ValentineFlow from '../components/ValentineFlow'
import LanguageSwitcher from '../components/LanguageSwitcher'

// Свои фото: VITE_DEMO_PHOTO_1 и VITE_DEMO_PHOTO_2 в .env (или в Vercel)
// Пример: положи фото в public/ и укажи VITE_DEMO_PHOTO_1=/demo-photo1.jpg
const DEMO_PHOTO_1 = import.meta.env.VITE_DEMO_PHOTO_1 || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=533&fit=crop'
const DEMO_PHOTO_2 = import.meta.env.VITE_DEMO_PHOTO_2 || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=533&fit=crop'

export default function Demo() {
  const { t } = useTranslation()
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/demo` : ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-valentine-400 via-valentine-500 to-valentine-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 25c-2-4-6-6-10-4s-6 6-4 10c2 4 6 6 10 4s6-6 4-10z\' fill=\'%23ffffff\' fill-opacity=\'0.05\'/%3E%3C/svg%3E')] opacity-50" />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 py-12">
        <Link
          to="/"
          className="absolute top-4 left-4 text-white/90 hover:text-white font-medium"
        >
          ← {t('common.back')}
        </Link>
        <LanguageSwitcher variant="minimal" className="absolute top-4 right-4 z-20 text-white/90" />
        <ValentineFlow
          target="for_her"
          photo1Url={DEMO_PHOTO_1}
          photo2Url={DEMO_PHOTO_2}
          shareUrl={shareUrl}
        />
      </div>
    </div>
  )
}
