import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EnvelopeScene } from './components/EnvelopeScene'
import { InvitationCard } from './components/InvitationCard'
import { MusicToggle } from './components/MusicToggle'
import { FloatingPetals } from './components/FloatingPetals'

type AppState = 'envelope' | 'invitation'

function App() {
  const [appState, setAppState] = useState<AppState>('envelope')
  const [showPetals, setShowPetals] = useState(false)

  const handleEnvelopeOpen = () => {
    setShowPetals(true)
    setTimeout(() => {
      setAppState('invitation')
      // Stop petals after transition settles
      setTimeout(() => setShowPetals(false), 5000)
    }, 100)
  }

  return (
    <div id="app-root" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
      <AnimatePresence mode="wait">
        {appState === 'envelope' ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EnvelopeScene onOpen={handleEnvelopeOpen} />
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <InvitationCard />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transitional petals across both states */}
      <FloatingPetals active={showPetals} intensity="medium" />

      {/* Persistent music toggle */}
      <MusicToggle />
    </div>
  )
}

export default App
