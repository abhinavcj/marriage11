import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BotanicalCorner, WaxSeal } from './Botanicals'
import { FloatingPetals } from './FloatingPetals'

interface EnvelopeSceneProps {
  onOpen: () => void
}

export function EnvelopeScene({ onOpen }: EnvelopeSceneProps) {
  const [phase, setPhase] = useState<
    'idle' | 'seal-breaking' | 'flap-opening' | 'card-rising' | 'transitioning'
  >('idle')
  const [petalsActive, setPetalsActive] = useState(false)
  const [tapHint, setTapHint] = useState(true)
  const hasInteracted = useRef(false)

  // Pulse the tap hint
  useEffect(() => {
    const timer = setInterval(() => setTapHint(v => !v), 1400)
    return () => clearInterval(timer)
  }, [])

  const handleTap = () => {
    if (hasInteracted.current) return
    hasInteracted.current = true

    // Phase 1: Seal breaks
    setPhase('seal-breaking')
    setPetalsActive(true)

    // Phase 2: Flap opens
    setTimeout(() => setPhase('flap-opening'), 700)

    // Phase 3: Card rises
    setTimeout(() => setPhase('card-rising'), 1600)

    // Phase 4: Transition to invitation
    setTimeout(() => {
      setPhase('transitioning')
      setTimeout(() => onOpen(), 600)
    }, 3200)
  }

  return (
    <AnimatePresence>
      <motion.div
        key="envelope-scene"
        className="fixed inset-0 flex flex-col items-center justify-center"
        style={{ background: 'linear-gradient(160deg, #FAF8F4 0%, #F0EDE6 50%, #F5F1EA 100%)' }}
        animate={phase === 'transitioning' ? { opacity: 0, scale: 0.96 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* Subtle background pattern */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(182,154,112,0.06) 0%, transparent 60%),
              radial-gradient(circle at 80% 80%, rgba(168,181,160,0.06) 0%, transparent 60%)`,
          }}
        />

        {/* Petals overlay */}
        <FloatingPetals active={petalsActive} intensity="medium" />

        {/* Main envelope container */}
        <motion.div
          onClick={handleTap}
          role="button"
          tabIndex={0}
          aria-label="Tap to open your wedding invitation"
          onKeyDown={e => e.key === 'Enter' && handleTap()}
          style={{ cursor: phase === 'idle' ? 'pointer' : 'default', position: 'relative' }}
          whileHover={phase === 'idle' ? { y: -6 } : {}}
          transition={{ type: 'spring', stiffness: 200 }}
          animate={phase === 'idle' ? { y: [0, -6, 0] } : {}}
          // Gentle float when idle
          {...(phase === 'idle' && {
            animate: { y: [0, -6, 0] },
            transition: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
          })}
        >
          {/* The Envelope */}
          <div
            style={{
              width: 'min(340px, 88vw)',
              height: 'min(240px, 62vw)',
              position: 'relative',
              perspective: '1000px',
            }}
          >
            {/* Envelope body */}
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(145deg, #F5F1E8 0%, #EDE8DC 40%, #E8E2D4 100%)',
                borderRadius: '4px',
                boxShadow: `
                  0 20px 60px rgba(61, 53, 48, 0.18),
                  0 8px 24px rgba(61, 53, 48, 0.12),
                  inset 0 1px 0 rgba(255,255,255,0.6)
                `,
                position: 'relative',
                overflow: 'hidden',
              }}
              animate={
                phase === 'transitioning'
                  ? { y: 40, opacity: 0 }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
              {/* Gold border */}
              <div style={{
                position: 'absolute',
                inset: '6px',
                border: '1px solid rgba(182, 154, 112, 0.5)',
                borderRadius: '2px',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute',
                inset: '9px',
                border: '0.5px solid rgba(182, 154, 112, 0.25)',
                borderRadius: '1px',
                pointerEvents: 'none',
              }} />

              {/* Botanical corner decorations */}
              <div style={{ position: 'absolute', top: 8, left: 8, width: 60, opacity: 0.7 }}>
                <BotanicalCorner />
              </div>
              <div style={{ position: 'absolute', top: 8, right: 8, width: 60, opacity: 0.7 }}>
                <BotanicalCorner flip />
              </div>
              <div style={{ position: 'absolute', bottom: 8, left: 8, width: 60, opacity: 0.7,
                transform: 'scaleY(-1)' }}>
                <BotanicalCorner />
              </div>
              <div style={{ position: 'absolute', bottom: 8, right: 8, width: 60, opacity: 0.7,
                transform: 'scale(-1)' }}>
                <BotanicalCorner />
              </div>

              {/* Diagonal fold lines (V shape bottom) */}
              <svg
                viewBox="0 0 340 240"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* Bottom fold V */}
                <path
                  d="M0 240 L170 145 L340 240"
                  fill="rgba(220, 214, 200, 0.6)"
                  stroke="rgba(182, 154, 112, 0.3)"
                  strokeWidth="0.8"
                />
                {/* Side folds */}
                <path d="M0 0 L170 95 L0 240" fill="rgba(228, 222, 208, 0.4)"
                  stroke="rgba(182, 154, 112, 0.2)" strokeWidth="0.5" />
                <path d="M340 0 L170 95 L340 240" fill="rgba(228, 222, 208, 0.4)"
                  stroke="rgba(182, 154, 112, 0.2)" strokeWidth="0.5" />
              </svg>

              {/* Top flap — animated open */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '55%',
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                  zIndex: 10,
                }}
                animate={
                  phase === 'flap-opening' || phase === 'card-rising' || phase === 'transitioning'
                    ? { rotateX: -165 }
                    : { rotateX: 0 }
                }
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                  delay: phase === 'flap-opening' ? 0.1 : 0,
                }}
              >
                <svg
                  viewBox="0 0 340 132"
                  style={{ width: '100%', height: '100%' }}
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 0 L170 110 L340 0 Z"
                    fill="#EDE8DC"
                    stroke="rgba(182, 154, 112, 0.4)"
                    strokeWidth="0.8"
                  />
                  {/* Flap texture */}
                  <path
                    d="M0 0 L170 110 L340 0"
                    fill="none"
                    stroke="rgba(182, 154, 112, 0.15)"
                    strokeWidth="0.5"
                  />
                </svg>
              </motion.div>

              {/* Card peeking out */}
              {(phase === 'card-rising' || phase === 'transitioning') && (
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '8%',
                    right: '8%',
                    height: '85%',
                    background: 'linear-gradient(160deg, #FDFAF6 0%, #F8F4EE 100%)',
                    borderRadius: '2px',
                    boxShadow: '0 -4px 20px rgba(61,53,48,0.15)',
                    zIndex: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  initial={{ y: '80%', opacity: 0 }}
                  animate={{ y: '-20%', opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: 'clamp(14px, 4vw, 20px)',
                    color: '#B69A70',
                    opacity: 0.7,
                  }}>
                    Amrin & Sanad
                  </span>
                </motion.div>
              )}
            </motion.div>

            {/* Wax Seal — centered on envelope flap */}
            <motion.div
              style={{
                position: 'absolute',
                top: '18%',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 20,
              }}
              animate={
                phase === 'seal-breaking'
                  ? { scale: [1, 1.1, 0.9, 0], rotate: [0, -5, 8, 20], opacity: [1, 1, 0.8, 0] }
                  : {}
              }
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <WaxSeal initials="A & S" size={80} />
            </motion.div>
          </div>
        </motion.div>

        {/* Message above envelope */}
        <motion.p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(13px, 3.5vw, 16px)',
            color: '#9B8F85',
            letterSpacing: '0.12em',
            marginBottom: '28px',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          A beautiful celebration awaits...
        </motion.p>

        {/* Reorder: message is above, tap hint is below */}
        {/* (We rearrange visually by placing this before the envelope above) */}

        {/* Tap to Open hint */}
        <motion.div
          style={{ marginTop: 32, textAlign: 'center' }}
          animate={
            phase === 'idle'
              ? { opacity: tapHint ? 1 : 0.4 }
              : { opacity: 0, y: 10 }
          }
          transition={{ duration: 0.7 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
            {/* Finger tap icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 11V6a2 2 0 014 0v5m-4 0h4m-4 0v5a2 2 0 004 0v-5"
                stroke="#B69A70" strokeWidth="1.5" strokeLinecap="round"
              />
            </svg>
            <span style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 'clamp(11px, 3vw, 13px)',
              color: '#B69A70',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 300,
            }}>
              Tap to Open
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
