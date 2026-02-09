import { motion } from 'framer-motion'

interface ScreenTeaseProps {
  onBack: () => void
}

export default function ScreenTease({ onBack }: ScreenTeaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center max-w-md mx-auto"
    >
      <p className="text-4xl mb-4">😂😂😂</p>
      <p className="font-display text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
        ХАХАХАХА!!!
      </p>
      <p className="font-body text-lg text-gray-800 mb-2">
        Как легко повелась!
      </p>
      <p className="font-body text-lg text-gray-800 mb-8">
        Думала я дам тебе такую возможность?!
      </p>
      <p className="text-3xl mb-8">👊👊</p>
      <motion.button
        type="button"
        onClick={onBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="px-6 py-3 rounded-xl bg-valentine-500 text-white font-semibold"
      >
        Ладно, ладно...
      </motion.button>
    </motion.div>
  )
}
