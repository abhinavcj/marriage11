import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FloatingPetals } from './FloatingPetals'

interface EnvelopeSceneProps {
  onOpen: () => void
}

/* ---- Wax Seal ---- */
function WaxSeal({ breaking }: { breaking: boolean }) {
  return (
    <motion.div
      animate={
        breaking
          ? { scale: [1, 1.15, 0], rotate: [0, -8, 18], opacity: [1, 1, 0] }
          : {}
      }
      transition={{ duration: 0.55, ease: 'easeIn' }}
      style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <svg width="72" height="72" viewBox="0 0 100 100" fill="none" aria-hidden="true"
        style={{ filter: 'drop-shadow(0 3px 10px rgba(120,85,40,0.45))' }}>
        <circle cx="50" cy="50" r="46" fill="rgba(120,85,40,0.12)" />
        <circle cx="50" cy="50" r="43" fill="#9A7040" />
        <circle cx="50" cy="50" r="39" fill="#8A6030" />
        <circle cx="50" cy="50" r="35" fill="#7A5020" />
        {/* Sunburst ring */}
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i * 22.5 * Math.PI) / 180
          return (
            <line key={i}
              x1={50 + 33 * Math.cos(a)} y1={50 + 33 * Math.sin(a)}
              x2={50 + 40 * Math.cos(a)} y2={50 + 40 * Math.sin(a)}
              stroke="#C4A070" strokeWidth="1.5" opacity="0.7"
            />
          )
        })}
        <circle cx="50" cy="50" r="28" fill="#6A4010" />
        <text x="50" y="55" textAnchor="middle"
          fontFamily="'Great Vibes', cursive" fontSize="15" fill="#FAF3E0" opacity="0.95">
          A &amp; S
        </text>
        {/* Shine */}
        <ellipse cx="40" cy="40" rx="7" ry="4" fill="white" opacity="0.07"
          transform="rotate(-25 40 40)" />
      </svg>
    </motion.div>
  )
}

/* ---- Inline botanical strip ---- */
function BotanicalStrip() {
  return (
    <svg viewBox="0 0 260 28" fill="none" style={{ width: '100%', maxWidth: 260 }} aria-hidden="true">
      {/* Center diamond */}
      <rect x="126" y="10" width="8" height="8" fill="#B69A70" opacity="0.6"
        transform="rotate(45 130 14)" />
      {/* Lines */}
      <line x1="0" y1="14" x2="118" y2="14" stroke="url(#bsl)" strokeWidth="0.7" />
      <line x1="142" y1="14" x2="260" y2="14" stroke="url(#bsr)" strokeWidth="0.7" />
      {/* Leaves left */}
      <ellipse cx="90" cy="14" rx="9" ry="4" fill="#A8B5A0" opacity="0.45" transform="rotate(10 90 14)" />
      <ellipse cx="68" cy="14" rx="7" ry="3.5" fill="#A8B5A0" opacity="0.35" transform="rotate(8 68 14)" />
      <circle cx="104" cy="10" r="2" fill="#B69A70" opacity="0.4" />
      {/* Leaves right */}
      <ellipse cx="170" cy="14" rx="9" ry="4" fill="#A8B5A0" opacity="0.45" transform="rotate(-10 170 14)" />
      <ellipse cx="192" cy="14" rx="7" ry="3.5" fill="#A8B5A0" opacity="0.35" transform="rotate(-8 192 14)" />
      <circle cx="156" cy="10" r="2" fill="#B69A70" opacity="0.4" />
      <defs>
        <linearGradient id="bsl">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#B69A70" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="bsr">
          <stop offset="0%" stopColor="#B69A70" stopOpacity="0.6" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ---- Corner botanical ---- */
function Corner({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 50 50" fill="none" style={{ width: '100%', height: '100%',
      transform: flip ? 'scaleX(-1)' : undefined }} aria-hidden="true">
      <path d="M4 46 C14 34 26 24 40 10" stroke="#B69A70" strokeWidth="0.9"
        strokeLinecap="round" opacity="0.5" />
      <ellipse cx="16" cy="38" rx="7" ry="3" fill="#A8B5A0" opacity="0.45"
        transform="rotate(-35 16 38)" />
      <ellipse cx="27" cy="28" rx="6" ry="2.5" fill="#A8B5A0" opacity="0.38"
        transform="rotate(-55 27 28)" />
      <circle cx="11" cy="43" r="1.5" fill="#B69A70" opacity="0.4" />
    </svg>
  )
}

/* ============================================================
   LetterScene — The main letter card shown before invitation
   ============================================================ */
export function EnvelopeScene({ onOpen }: EnvelopeSceneProps) {
  const [phase, setPhase] = useState<'idle' | 'breaking' | 'unfolding' | 'done'>('idle')
  const [petals, setPetals] = useState(false)
  const triggered = useRef(false)

  const handleTap = () => {
    if (triggered.current) return
    triggered.current = true

    // Step 1: seal breaks
    setPhase('breaking')
    setPetals(true)

    // Step 2: letter slides away
    setTimeout(() => setPhase('unfolding'), 520)

    // Step 3: scene fades + mounts invitation
    setTimeout(() => {
      setPhase('done')
      setTimeout(onOpen, 380)
    }, 1700)
  }

  const isOpening = phase === 'unfolding' || phase === 'done'

  return (
    <motion.div
      style={{
        position: 'fixed', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 38%, #EDE4D2 0%, #E2D6BE 55%, #D6C9A8 100%)',
        overflow: 'hidden',
      }}
      animate={phase === 'done' ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Soft vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(80,60,20,0.2) 100%)',
      }} aria-hidden="true" />

      <FloatingPetals active={petals} intensity="medium" />

      {/* Top message */}
      <motion.p
        initial={{ opacity: 0, y: -6 }}
        animate={{
          opacity: isOpening ? 0 : 1,
          y: isOpening ? -12 : 0,
        }}
        transition={{ duration: isOpening ? 0.3 : 0.9, delay: isOpening ? 0 : 0.7 }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(13px, 3.5vw, 15px)',
          color: '#7A6A50',
          fontStyle: 'italic',
          letterSpacing: '0.1em',
          marginBottom: '28px',
          textAlign: 'center',
        }}
      >
        A beautiful celebration awaits...
      </motion.p>

      {/* ========= THE LETTER ========= */}
      <motion.div
        role="button"
        tabIndex={0}
        aria-label="Tap to open your wedding invitation"
        onClick={handleTap}
        onKeyDown={e => e.key === 'Enter' && handleTap()}
        style={{
          width: 'min(340px, 88vw)',
          cursor: phase === 'idle' ? 'pointer' : 'default',
          position: 'relative',
        }}
        /* Idle: gentle float */
        animate={
          phase === 'idle'
            ? { y: [0, -7, 0] }
            : isOpening
            ? { y: -80, opacity: 0, scale: 0.93, rotate: 1 }
            : {}
        }
        transition={
          phase === 'idle'
            ? { repeat: Infinity, duration: 4, ease: 'easeInOut' }
            : { duration: 0.85, ease: [0.4, 0, 0.2, 1] }
        }
        whileHover={phase === 'idle' ? { scale: 1.012 } : {}}
      >
        {/* Drop shadow beneath */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: -20, left: '8%', right: '8%',
            height: 20, borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(80,55,15,0.3) 0%, transparent 70%)',
            filter: 'blur(6px)',
          }}
          animate={isOpening ? { opacity: 0, scaleX: 0.6 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* ---- Paper body ---- */}
        <div style={{
          background: 'linear-gradient(158deg, #FDFAF4 0%, #F8F2E8 40%, #F3EDE0 100%)',
          borderRadius: '2px',
          boxShadow: `
            0 28px 70px rgba(70,48,15,0.24),
            0 10px 28px rgba(70,48,15,0.14),
            0 2px 6px rgba(70,48,15,0.1),
            inset 0 1px 0 rgba(255,255,255,0.55)
          `,
          padding: 'clamp(22px,5vw,32px) clamp(18px,4vw,28px)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Paper micro-grain texture */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.025, pointerEvents: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }} aria-hidden="true" />

          {/* Outer border */}
          <div style={{
            position: 'absolute', inset: '8px',
            border: '1px solid rgba(182,154,112,0.5)',
            borderRadius: '1px', pointerEvents: 'none',
          }} />
          {/* Inner border */}
          <div style={{
            position: 'absolute', inset: '12px',
            border: '0.5px solid rgba(182,154,112,0.22)',
            borderRadius: '1px', pointerEvents: 'none',
          }} />

          {/* Corners */}
          {[
            { top: 6, left: 6, w: 36 },
            { top: 6, right: 6, w: 36 },
            { bottom: 6, left: 6, w: 36 },
            { bottom: 6, right: 6, w: 36 },
          ].map((pos, i) => (
            <div key={i} style={{ position: 'absolute', width: pos.w, height: pos.w, ...pos }}
              aria-hidden="true">
              <Corner flip={i === 1 || i === 3} />
            </div>
          ))}

          {/* Fold crease line — fades on open */}
          <motion.div
            aria-hidden="true"
            animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute', left: '8%', right: '8%',
              top: '50%', height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(150,120,60,0.28) 30%, rgba(150,120,60,0.28) 70%, transparent)',
              pointerEvents: 'none',
            }}
          />

          {/* ---- Content ---- */}
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>

            {/* Arabic Bismillah */}
            <div style={{
              fontFamily: "'Scheherazade New', serif",
              fontSize: 'clamp(14px, 4vw, 18px)',
              color: '#B69A70',
              direction: 'rtl',
              lineHeight: 1.6,
              marginBottom: '10px',
            }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>

            {/* Divider */}
            <div style={{ width: 40, height: '0.5px', background: 'rgba(182,154,112,0.5)', margin: '8px auto' }} />

            {/* Label */}
            <div style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 'clamp(8px, 2vw, 10px)',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#A09080',
              marginBottom: '10px',
              fontWeight: 300,
            }}>
              Wedding Invitation
            </div>

            {/* Couple names */}
            <div style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 'clamp(26px, 7vw, 36px)',
              color: '#8C7248',
              lineHeight: 1.15,
            }}>
              Amrin &amp; Sanad
            </div>

            {/* Botanical strip */}
            <div style={{ margin: '12px auto 14px', display: 'flex', justifyContent: 'center' }}>
              <BotanicalStrip />
            </div>

            {/* Wax seal */}
            <div style={{ margin: '4px 0 12px' }}>
              <WaxSeal breaking={phase === 'breaking'} />
            </div>

            {/* Date */}
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(11px, 3vw, 14px)',
              color: '#9B8B75',
              letterSpacing: '0.18em',
              marginBottom: '4px',
            }}>
              Sunday · 17 January 2027
            </div>
            <div style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 'clamp(8px, 2.2vw, 10px)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#B6A888',
              fontWeight: 300,
            }}>
              Palakkad, Kerala
            </div>

          </div>
        </div>
      </motion.div>

      {/* Tap hint */}
      <motion.div
        style={{ marginTop: 30, textAlign: 'center' }}
        animate={
          phase !== 'idle'
            ? { opacity: 0, pointerEvents: 'none' }
            : { opacity: [0.45, 1, 0.45] }
        }
        transition={{
          duration: phase === 'idle' ? 2.4 : 0.3,
          repeat: phase === 'idle' ? Infinity : 0,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}
        >
          {/* Hand tap icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 11V6a2 2 0 014 0v5M9 11h4m-4 0v5a2 2 0 004 0v-5"
              stroke="#9A8060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
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
  )
}
