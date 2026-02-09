import { useCallback, useImperativeHandle, useRef, useState, forwardRef } from 'react'
import { motion } from 'framer-motion'

const MIN_ESCAPES_BEFORE_CLICK = 3
const ESCAPE_COOLDOWN_MS = 400
const TRIGGER_RADIUS = 45

export interface RunawayButtonHandle {
  handleMouseMove: (e: React.MouseEvent) => void
}

interface RunawayButtonProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
}

const RunawayButton = forwardRef<RunawayButtonHandle, RunawayButtonProps>(
  function RunawayButton({ onClick, children, className = '' }, ref) {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [escapeCount, setEscapeCount] = useState(0)
    const lastEscapeTime = useRef(0)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const escapeCountRef = useRef(0)
    escapeCountRef.current = escapeCount

    const handleClick = useCallback(() => {
      if (escapeCount >= MIN_ESCAPES_BEFORE_CLICK) {
        onClick()
      }
    }, [escapeCount, onClick])

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
      if (escapeCountRef.current >= MIN_ESCAPES_BEFORE_CLICK) return

      const button = buttonRef.current
      if (!button) return

      const buttonRect = button.getBoundingClientRect()
      const mouseX = e.clientX
      const mouseY = e.clientY
      const buttonCenterX = buttonRect.left + buttonRect.width / 2
      const buttonCenterY = buttonRect.top + buttonRect.height / 2

      const distance = Math.hypot(mouseX - buttonCenterX, mouseY - buttonCenterY)
      if (distance > TRIGGER_RADIUS) return

      const now = Date.now()
      if (now - lastEscapeTime.current < ESCAPE_COOLDOWN_MS) return

      const angle = Math.atan2(mouseY - buttonCenterY, mouseX - buttonCenterX)
      const moveDistance = 90 + Math.random() * 70
      let newX = Math.cos(angle) * moveDistance
      let newY = Math.sin(angle) * moveDistance

      const maxMove = 80
      newX = Math.max(-maxMove, Math.min(maxMove, newX))
      newY = Math.max(-maxMove, Math.min(maxMove, newY))

      setPosition({ x: newX, y: newY })
      lastEscapeTime.current = now
      setEscapeCount((c) => c + 1)
    }, [])

    useImperativeHandle(ref, () => ({ handleMouseMove }), [handleMouseMove])

    return (
      <div className="relative w-[160px] min-h-[90px] flex items-center justify-center shrink-0">
        <motion.button
          ref={buttonRef}
          type="button"
          onClick={handleClick}
          animate={{ x: position.x, y: position.y }}
          transition={{ type: 'spring', stiffness: 380, damping: 20 }}
          className={`shrink-0 px-6 py-3 rounded-xl border-2 border-gray-300 bg-gray-100 text-gray-600 font-semibold hover:border-gray-400 hover:bg-gray-200 transition-colors select-none ${className} ${escapeCount >= MIN_ESCAPES_BEFORE_CLICK ? 'cursor-pointer' : 'cursor-default'}`}
        >
          {children}
        </motion.button>
      </div>
    )
  }
)

export default RunawayButton
