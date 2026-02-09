import { motion } from 'framer-motion'
import YesWorkflowBlock from './YesWorkflowBlock'
import ShareButtons from './ShareButtons'
import type { ValentineTarget } from '../types'

interface ScreenSuccessProps {
  target: ValentineTarget
  photo1Url: string
  photo2Url: string
  shareUrl: string
}

const LABELS = {
  for_her: 'Ура! Я так счастлив!', // для девушки = говорит парень
  for_him: 'Ура! Я так счастлива!', // для парня = говорит девушка
}

export default function ScreenSuccess({
  target,
  photo1Url,
  photo2Url,
  shareUrl,
}: ScreenSuccessProps) {
  const message = LABELS[target]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="w-full max-w-2xl mx-auto text-center"
    >
      <p className="text-4xl mb-4">🎉</p>
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-white drop-shadow-lg mb-8">
        {message}
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white shadow-xl"
        >
          <img
            src={photo1Url}
            alt="Фото 1"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white shadow-xl"
        >
          <img
            src={photo2Url}
            alt="Фото 2"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-6"
      >
        <ShareButtons shareUrl={shareUrl} />
        <YesWorkflowBlock />
      </motion.div>
    </motion.div>
  )
}
