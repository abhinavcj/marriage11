import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EnvelopeScene } from './components/EnvelopeScene'
import { InvitationCard } from './components/InvitationCard'
import { MusicToggle } from './components/MusicToggle'
import { FloatingPetals } from './components/FloatingPetals'

type AppState = 'envelope' | 'invitation'

function App() {
  const [appState, setAppState] = useState<AppState>('envelope')
  const [showPetals, setShowPetals] = useState(false)

  // Lock body scroll while the book/envelope is showing;
  // unlock the moment the invitation mounts so the page is scrollable.
  useEffect(() => {
    if (appState === 'envelope') {
      document.body.classList.add('scroll-locked')
    } else {
      document.body.classList.remove('scroll-locked')
      // Make sure we start at the very top when invitation appears
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    return () => {
      document.body.classList.remove('scroll-locked')
    }
  }, [appState])

  const handleEnvelopeOpen = () => {
    setShowPetals(true)
    // Switch state immediately — the exit animation on the book
    // will play while the invitation fades in underneath.
    setTimeout(() => {
      setAppState('invitation')
      setTimeout(() => setShowPetals(false), 4000)
    }, 150)
  }

  return (
    <div id="app-root">
      <AnimatePresence mode="wait">
        {appState === 'envelope' ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10,
            }}
          >
            <EnvelopeScene onOpen={handleEnvelopeOpen} />
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            // No position:fixed — normal document flow so page scrolls freely
            style={{ minHeight: '100vh' }}
          >
            <InvitationCard />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transitional petals — pointer-events:none so they never block scroll */}
      <FloatingPetals active={showPetals} intensity="medium" />

      {/* Music toggle */}
      <MusicToggle />
    </div>
  )
}

export default App
