import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import RunawayButton, { type RunawayButtonHandle } from './RunawayButton'
import type { ValentineTarget } from '../types'

interface ScreenIntroProps {
  target: ValentineTarget
  onYes: () => void
  onNo: () => void
}

export default function ScreenIntro({ target, onYes, onNo }: ScreenIntroProps) {
  const { t } = useTranslation()
  const title = target === 'for_her' ? t('intro.forHerTitle') : t('intro.forHimTitle')
  const question = target === 'for_her' ? t('intro.forHerQuestion') : t('intro.forHimQuestion')
  const runawayRef = useRef<RunawayButtonHandle>(null)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <div
        className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl shadow-valentine-900/10 p-8 border border-white/50"
        onMouseMove={(e) => runawayRef.current?.handleMouseMove(e)}
      >
        <h2 className="font-display text-2xl font-semibold text-valentine-800 text-center mb-4">
          {title}
        </h2>
        <p className="text-center text-4xl mb-6 animate-float">💕</p>
        <p className="font-body text-xl text-gray-700 text-center mb-8">{question}</p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
          <motion.button
            type="button"
            onClick={onYes}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-valentine-500 to-valentine-600 text-white font-semibold text-lg shadow-lg shadow-valentine-500/30 hover:shadow-valentine-500/40 transition-shadow shrink-0"
          >
            {t('intro.yes')}
          </motion.button>
          <RunawayButton ref={runawayRef} onClick={onNo}>
            {t('intro.no')}
          </RunawayButton>
        </div>
      </div>
    </motion.div>
  )
}
