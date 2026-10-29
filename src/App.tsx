import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EnvelopeScene } from './components/EnvelopeScene'
import { InvitationCard } from './components/InvitationCard'
import { MusicToggle } from './components/MusicToggle'

type AppState = 'letter' | 'invitation'

function App() {
  const [appState, setAppState] = useState<AppState>('letter')

  // Lock scroll during letter scene, unlock for invitation
  useEffect(() => {
    if (appState === 'letter') {
      document.body.classList.add('scroll-locked')
    } else {
      document.body.classList.remove('scroll-locked')
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    return () => document.body.classList.remove('scroll-locked')
  }, [appState])

  return (
    <div id="app-root">
      <AnimatePresence mode="wait">
        {appState === 'letter' ? (
          <motion.div
            key="letter"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ position: 'fixed', inset: 0, zIndex: 10 }}
          >
            <EnvelopeScene onOpen={() => setAppState('invitation')} />
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ minHeight: '100vh' }}
          >
            <InvitationCard />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music toggle always visible */}
      <MusicToggle />
    </div>
  )
}

export default App
