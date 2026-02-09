import { motion } from 'framer-motion'
import { useEffect } from 'react'

interface ScreenNoReactionProps {
  onNext: () => void
}

export default function ScreenNoReaction({ onNext }: ScreenNoReactionProps) {
  useEffect(() => {
    const timer = setTimeout(onNext, 1800)
    return () => clearTimeout(timer)
  }, [onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <p className="text-6xl mb-4">😿</p>
      <p className="font-display text-2xl font-semibold text-white drop-shadow-lg mb-2">
        Ты серьёзно???
      </p>
      <p className="text-4xl">💔</p>
    </motion.div>
  )
}
