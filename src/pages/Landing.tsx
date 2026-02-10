import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import HowItWorks from '../components/HowItWorks'
import YoutubeShortEmbed from '../components/YoutubeShortEmbed'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function Landing() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen bg-gradient-to-br from-valentine-50 via-cream-50 to-valentine-100">
      <header className="p-6">
        <nav className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">💕</span>
            <span className="font-logo text-2xl font-bold bg-gradient-to-r from-valentine-600 via-valentine-500 to-valentine-700 bg-clip-text text-transparent group-hover:from-valentine-700 group-hover:to-valentine-600 transition-all">
              {t('common.logo')}
            </span>
          </Link>
          <LanguageSwitcher className="text-valentine-700" />
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-20">
        <section className="text-center py-12 sm:py-16">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-valentine-900 mb-4">
            {t('landing.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
            {t('landing.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/create"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-valentine-500 to-valentine-600 text-white font-semibold text-lg shadow-lg shadow-valentine-500/30 hover:shadow-valentine-500/40 transition-shadow"
            >
              {t('landing.createCta')}
            </Link>
            <Link
              to="/demo"
              className="px-8 py-4 rounded-xl border-2 border-valentine-400 text-valentine-700 font-semibold hover:bg-valentine-50 transition-colors"
            >
              {t('landing.demoCta')}
            </Link>
          </div>
        </section>

        <section className="py-12">
          <HowItWorks />
        </section>

        <section className="py-12 flex flex-col items-center">
          <h2 className="font-display text-2xl font-bold text-valentine-900 text-center mb-6">
            {t('landing.videoTitle')}
          </h2>
          <YoutubeShortEmbed />
        </section>
      </main>

      <footer className="py-6 text-center border-t border-valentine-200/50 space-y-1">
        <a
          href="https://yesworkflow.com/book-call"
          target="_blank"
          rel="noopener noreferrer"
          className="text-valentine-600 hover:text-valentine-800 text-sm"
        >
          {t('landing.footer')} <b>YesWorkflow</b>
        </a>
        <p className="text-gray-500 text-xs">
          {t('landing.footerStorage')}
        </p>
      </footer>
    </div>
  )
}
