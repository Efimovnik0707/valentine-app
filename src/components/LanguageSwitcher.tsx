import { useTranslation } from 'react-i18next'

type Variant = 'header' | 'minimal'

interface LanguageSwitcherProps {
  variant?: Variant
  className?: string
}

export default function LanguageSwitcher({ variant = 'header', className = '' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation()

  const handleToggle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  if (variant === 'minimal') {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className={`px-2 py-1 rounded text-sm font-medium hover:bg-black/5 transition-colors ${className}`}
        title={i18n.language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
      >
        {i18n.language === 'ru' ? 'EN' : 'RU'}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium border border-current/30 hover:bg-black/5 transition-colors ${className}`}
      title={i18n.language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
    >
      {i18n.language === 'ru' ? 'EN' : 'RU'}
    </button>
  )
}
