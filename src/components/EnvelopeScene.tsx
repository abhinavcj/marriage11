import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FloatingPetals } from './FloatingPetals'

interface EnvelopeSceneProps {
  onOpen: () => void
}

/* ---- Botanical corner SVG (inline for self-containment) ---- */
function BookCorner({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      style={{
        width: '100%',
        height: '100%',
        transform: flip ? 'scale(-1,1)' : undefined,
      }}
      aria-hidden="true"
    >
      <path d="M5 55 C15 40 30 28 45 10" stroke="#C4A87A" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <ellipse cx="20" cy="43" rx="8" ry="3.5" fill="#A8B5A0" opacity="0.5" transform="rotate(-40 20 43)" />
      <ellipse cx="32" cy="32" rx="7" ry="3" fill="#A8B5A0" opacity="0.4" transform="rotate(-55 32 32)" />
      <ellipse cx="41" cy="20" rx="6" ry="2.5" fill="#A8B5A0" opacity="0.35" transform="rotate(-70 41 20)" />
      <circle cx="14" cy="50" r="2" fill="#C4A87A" opacity="0.5" />
      <circle cx="25" cy="39" r="1.5" fill="#C4A87A" opacity="0.4" />
    </svg>
  )
}

/* ---- The closed book cover face ---- */
function BookCover() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(160deg, #2C1F12 0%, #1A1108 60%, #241A0E 100%)',
        borderRadius: '3px 12px 12px 3px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'inset -4px 0 12px rgba(0,0,0,0.5), inset 2px 0 6px rgba(255,220,150,0.08)',
      }}
    >
      {/* Spine line */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '18px',
        background: 'linear-gradient(90deg, #0E0A05 0%, #2C1F12 100%)',
        borderRight: '1px solid rgba(196,168,122,0.3)',
      }} />

      {/* Gold border frame */}
      <div style={{
        position: 'absolute', inset: '12px 10px 12px 22px',
        border: '1px solid rgba(196,168,122,0.45)',
        borderRadius: '2px',
      }} />
      <div style={{
        position: 'absolute', inset: '16px 14px 16px 26px',
        border: '0.5px solid rgba(196,168,122,0.2)',
        borderRadius: '1px',
      }} />

      {/* Corner botanicals */}
      {[
        { top: 14, left: 22, w: 36, transform: 'none' },
        { top: 14, right: 10, w: 36, transform: 'scaleX(-1)' },
        { bottom: 14, left: 22, w: 36, transform: 'scaleY(-1)' },
        { bottom: 14, right: 10, w: 36, transform: 'scale(-1)' },
      ].map((pos, i) => (
        <div key={i} style={{ position: 'absolute', width: pos.w, ...pos }} aria-hidden="true">
          <BookCorner flip={i === 1 || i === 3} />
        </div>
      ))}

      {/* Center emblem */}
      <div style={{
        position: 'absolute', top: '50%', left: '55%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}>
        {/* Wax-seal-style circle */}
        <div style={{
          width: 90, height: 90, borderRadius: '50%',
          background: 'radial-gradient(circle at 38% 38%, #B8893A 0%, #7A5A20 60%, #5A3F10 100%)',
          border: '1.5px solid rgba(196,168,122,0.5)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,220,150,0.2)',
          margin: '0 auto 10px',
        }}>
          <div style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: '22px',
            color: '#FAF8F0',
            lineHeight: 1,
            textShadow: '0 1px 4px rgba(0,0,0,0.4)',
          }}>
            A &amp; S
          </div>
        </div>

        {/* Title */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '9px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(196,168,122,0.8)',
          marginTop: '4px',
        }}>
          Wedding Invitation
        </div>

        {/* Decorative lines */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', justifyContent: 'center' }}>
          <div style={{ width: '24px', height: '0.5px', background: 'rgba(196,168,122,0.5)' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(196,168,122,0.6)' }} />
          <div style={{ width: '24px', height: '0.5px', background: 'rgba(196,168,122,0.5)' }} />
        </div>

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '8px',
          letterSpacing: '0.22em',
          color: 'rgba(196,168,122,0.5)',
          marginTop: '8px',
          textTransform: 'uppercase',
        }}>
          17 · Jan · 2027
        </div>
      </div>

      {/* Subtle cloth texture overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

/* ---- The inner right page (visible after book opens) ---- */
function BookInnerPage() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(160deg, #FDFAF6 0%, #F8F4EE 100%)',
      borderRadius: '0 12px 12px 0',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px 20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Page edge shadow */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '12px',
        background: 'linear-gradient(90deg, rgba(0,0,0,0.08) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Gold frame */}
      <div style={{
        position: 'absolute', inset: '10px',
        border: '1px solid rgba(182,154,112,0.35)',
        borderRadius: '2px', pointerEvents: 'none',
      }} />

      {/* Corner accents */}
      {[
        { top: 8, left: 8 },
        { top: 8, right: 8 },
        { bottom: 8, left: 8 },
        { bottom: 8, right: 8 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', width: 14, height: 14,
          borderTop: i < 2 ? '1.5px solid rgba(182,154,112,0.6)' : 'none',
          borderBottom: i >= 2 ? '1.5px solid rgba(182,154,112,0.6)' : 'none',
          borderLeft: (i === 0 || i === 2) ? '1.5px solid rgba(182,154,112,0.6)' : 'none',
          borderRight: (i === 1 || i === 3) ? '1.5px solid rgba(182,154,112,0.6)' : 'none',
          ...pos,
        }} aria-hidden="true" />
      ))}

      {/* Arabic */}
      <div style={{
        fontFamily: "'Scheherazade New', serif",
        fontSize: 'clamp(13px, 3vw, 17px)',
        color: '#B69A70',
        direction: 'rtl',
        lineHeight: 1.6,
        marginBottom: '8px',
        textAlign: 'center',
      }}>
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>

      {/* Divider */}
      <div style={{ width: '40px', height: '0.5px', background: 'rgba(182,154,112,0.5)', margin: '6px auto' }} />

      {/* Names */}
      <div style={{
        fontFamily: "'Great Vibes', cursive",
        fontSize: 'clamp(22px, 5vw, 30px)',
        color: '#B69A70',
        textAlign: 'center',
        lineHeight: 1.2,
      }}>
        Dr. Amrin Fatin
      </div>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(13px, 3vw, 16px)',
        color: '#A8B5A0',
        fontStyle: 'italic',
        margin: '2px 0',
      }}>
        &amp;
      </div>
      <div style={{
        fontFamily: "'Great Vibes', cursive",
        fontSize: 'clamp(18px, 4vw, 24px)',
        color: '#B69A70',
        textAlign: 'center',
        lineHeight: 1.2,
      }}>
        Dr. Muhammed Sanad Nafih
      </div>

      {/* Divider dots */}
      <div style={{ display: 'flex', gap: '5px', margin: '8px 0', alignItems: 'center' }}>
        <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#C4A87A', opacity: 0.5 }} />
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#C4A87A', opacity: 0.7 }} />
        <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#C4A87A', opacity: 0.5 }} />
      </div>

      {/* Date */}
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(10px, 2.5vw, 13px)',
        color: '#9B8F85',
        letterSpacing: '0.15em',
        textAlign: 'center',
        marginTop: '2px',
      }}>
        Sunday, 17 January 2027
      </div>
      <div style={{
        fontFamily: "'Lato', sans-serif",
        fontSize: 'clamp(9px, 2vw, 10px)',
        color: '#B69A70',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginTop: '3px',
      }}>
        Club 6 Convention Center · Palakkad
      </div>
    </div>
  )
}

/* ============================================================
   Main BookOpenScene
   ============================================================ */
export function EnvelopeScene({ onOpen }: EnvelopeSceneProps) {
  const [phase, setPhase] = useState<'idle' | 'opening' | 'open' | 'transitioning'>('idle')
  const [petalsActive, setPetalsActive] = useState(false)
  const hasInteracted = useRef(false)

  const handleTap = () => {
    if (hasInteracted.current) return
    hasInteracted.current = true

    setPhase('opening')
    setPetalsActive(true)

    // Book is fully open
    setTimeout(() => setPhase('open'), 1100)

    // Brief pause so user sees the inner page, then transition
    setTimeout(() => setPhase('transitioning'), 2600)
    setTimeout(() => onOpen(), 3100)
  }

  // Book dimensions
  const bookW = 'min(320px, 82vw)'
  const bookH = 'min(420px, 70vh)'

  return (
    <AnimatePresence>
      <motion.div
        key="book-scene"
        style={{
          position: 'fixed', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'radial-gradient(ellipse at 50% 40%, #F0EBE0 0%, #E8E0D0 60%, #DDD5C4 100%)',
          overflow: 'hidden',
        }}
        animate={phase === 'transitioning' ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* Soft vignette */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(100,80,50,0.18) 100%)',
        }} aria-hidden="true" />

        {/* Petals */}
        <FloatingPetals active={petalsActive} intensity="medium" />

        {/* Top message */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(13px, 3.5vw, 15px)',
            color: '#8A7A65',
            letterSpacing: '0.12em',
            fontStyle: 'italic',
            marginBottom: '28px',
            textAlign: 'center',
          }}
        >
          A beautiful celebration awaits...
        </motion.p>

        {/* ========= BOOK ========= */}
        <motion.div
          onClick={handleTap}
          role="button"
          tabIndex={0}
          aria-label="Tap to open the wedding invitation"
          onKeyDown={e => e.key === 'Enter' && handleTap()}
          style={{
            cursor: phase === 'idle' ? 'pointer' : 'default',
            position: 'relative',
            // Perspective container
            perspective: '1400px',
            perspectiveOrigin: '50% 50%',
            width: bookW,
            height: bookH,
          }}
          // Gentle idle float
          animate={phase === 'idle' ? { y: [0, -7, 0] } : {}}
          transition={phase === 'idle' ? { repeat: Infinity, duration: 4, ease: 'easeInOut' } : {}}
          whileHover={phase === 'idle' ? { scale: 1.015 } : {}}
        >

          {/* ── Shadow beneath book ── */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '-24px', left: '10%', right: '10%',
              height: '24px',
              background: 'radial-gradient(ellipse, rgba(80,55,20,0.28) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(8px)',
            }}
            animate={phase === 'opening' || phase === 'open'
              ? { scaleX: 1.3, opacity: 0.5 }
              : { scaleX: 1, opacity: 1 }
            }
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          {/* ── Book spine / back cover (static) ── */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(160deg, #1A1108 0%, #0E0A05 100%)',
            borderRadius: '3px 12px 12px 3px',
            boxShadow: '4px 4px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)',
          }} />

          {/* ── Right inner page (revealed when cover opens) ── */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '3px 12px 12px 3px',
            overflow: 'hidden',
          }}>
            <BookInnerPage />
          </div>

          {/* ── Front cover (rotates open) ── */}
          <motion.div
            style={{
              position: 'absolute', inset: 0,
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              // Subtle lift on hover via parent
            }}
            animate={
              phase === 'opening' || phase === 'open' || phase === 'transitioning'
                ? { rotateY: -172 }
                : { rotateY: 0 }
            }
            transition={{
              duration: 1.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Front face */}
            <div style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              boxShadow: phase === 'idle'
                ? '6px 0 24px rgba(0,0,0,0.5)'
                : '2px 0 12px rgba(0,0,0,0.3)',
            }}>
              <BookCover />
            </div>

            {/* Back face of cover (inside of the front cover — cream colored) */}
            <div style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(135deg, #F5F0E8 0%, #EDE8DC 100%)',
              borderRadius: '3px 12px 12px 3px',
              boxShadow: 'inset 2px 0 10px rgba(0,0,0,0.08)',
            }}>
              {/* Inside cover decorative border */}
              <div style={{
                position: 'absolute', inset: '12px',
                border: '1px solid rgba(182,154,112,0.3)',
                borderRadius: '2px',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: '18px',
                  color: 'rgba(182,154,112,0.4)',
                }}>
                  With Love
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Page-turn shadow (sweeps across as cover opens) ── */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, rgba(0,0,0,0.18) 0%, transparent 60%)',
              borderRadius: '3px 12px 12px 3px',
              pointerEvents: 'none',
            }}
            animate={
              phase === 'opening' || phase === 'open' || phase === 'transitioning'
                ? { opacity: 0 }
                : { opacity: 1 }
            }
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* ── Tap hint ── */}
        <motion.div
          style={{ marginTop: 36, textAlign: 'center' }}
          animate={
            phase !== 'idle'
              ? { opacity: 0, y: 6, pointerEvents: 'none' }
              : { opacity: 1, y: 0 }
          }
          transition={{ duration: 0.4 }}
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
          >
            {/* Hand tap icon */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 11V6a2 2 0 014 0v5M7 11h4m-4 0v5a2 2 0 004 0v-5"
                  stroke="#9A8060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <span style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 'clamp(10px, 2.8vw, 12px)',
              color: '#9A8060',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: 300,
            }}>
              Tap to Open
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
