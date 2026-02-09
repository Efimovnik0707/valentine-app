import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import ScreenIntro from './ScreenIntro'
import ScreenNoReaction from './ScreenNoReaction'
import ScreenTease from './ScreenTease'
import ScreenSuccess from './ScreenSuccess'
import type { ValentineTarget } from '../types'

type Screen = 'intro' | 'no' | 'tease' | 'success'

interface ValentineFlowProps {
  target: ValentineTarget
  photo1Url: string
  photo2Url: string
  shareUrl: string
}

export default function ValentineFlow({
  target,
  photo1Url,
  photo2Url,
  shareUrl,
}: ValentineFlowProps) {
  const [screen, setScreen] = useState<Screen>('intro')

  return (
    <AnimatePresence mode="wait">
      {screen === 'intro' && (
        <ScreenIntro
          key="intro"
          target={target}
          onYes={() => setScreen('success')}
          onNo={() => setScreen('no')}
        />
      )}
      {screen === 'no' && (
        <ScreenNoReaction key="no" onNext={() => setScreen('tease')} />
      )}
      {screen === 'tease' && (
        <ScreenTease key="tease" onBack={() => setScreen('intro')} />
      )}
      {screen === 'success' && (
        <ScreenSuccess
          key="success"
          target={target}
          photo1Url={photo1Url}
          photo2Url={photo2Url}
          shareUrl={shareUrl}
        />
      )}
    </AnimatePresence>
  )
}
