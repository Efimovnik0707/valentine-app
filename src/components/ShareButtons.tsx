import { useState } from 'react'
import { motion } from 'framer-motion'

const TELEGRAM_SHARE_BASE = 'https://t.me/share/url?'

interface ShareButtonsProps {
  shareUrl: string
}

export default function ShareButtons({ shareUrl }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareText = 'Вот моя валентинка для тебя 💕'
  const telegramUrl = `${TELEGRAM_SHARE_BASE}url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-white/90 font-medium">Поделись ссылкой на свою валентинку:</p>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <div className="flex items-center gap-2 max-w-full bg-white/20 rounded-xl px-3 py-2 border border-white/30">
          <span className="text-white font-mono text-sm truncate flex-1 min-w-0">{shareUrl}</span>
          <motion.button
            type="button"
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="shrink-0 p-2 rounded-lg bg-white/30 hover:bg-white/40 transition-colors"
            title="Скопировать"
          >
            {copied ? (
              <span className="text-white text-lg">✓</span>
            ) : (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        <motion.a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0088cc] text-white font-medium"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
          </svg>
          Поделиться в Telegram
        </motion.a>
        <motion.a
          href="/create"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-valentine-500 text-white font-medium"
        >
          Создать свою
        </motion.a>
      </div>
    </div>
  )
}
