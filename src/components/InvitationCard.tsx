import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Countdown } from './Countdown'
import { AddToCalendar } from './AddToCalendar'

const MAPS_URL =
  'https://www.google.com/maps/search/Club+6+Convention+Center+Palakkad+Kerala'

/* ---- Inline section observer (same optimised logic) ---- */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('visible')
      return
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { requestAnimationFrame(() => el.classList.add('visible')); io.disconnect() }
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

function FadeIn({ children, delay = 0, style }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties
}) {
  const ref = useFadeIn()
  return (
    <div
      ref={ref}
      className="section-fade"
      style={{
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ---- Decorative elements ---- */
function GoldDivider({ wide = false }: { wide?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      margin: '0 auto',
      width: wide ? '100%' : '60%',
    }}>
      <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(182,154,112,0.5))' }} />
      <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(182,154,112,0.7)', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '0.5px', background: 'linear-gradient(90deg, rgba(182,154,112,0.5), transparent)' }} />
    </div>
  )
}

function OrnamentRow() {
  return (
    <svg viewBox="0 0 300 22" fill="none" style={{ width: '100%', maxWidth: 300 }} aria-hidden="true">
      <line x1="0" y1="11" x2="125" y2="11" stroke="url(#og1)" strokeWidth="0.6" />
      <circle cx="137" cy="11" r="2" fill="#B69A70" opacity="0.5" />
      <circle cx="150" cy="11" r="4" fill="#B69A70" opacity="0.7" />
      <circle cx="163" cy="11" r="2" fill="#B69A70" opacity="0.5" />
      <line x1="175" y1="11" x2="300" y2="11" stroke="url(#og2)" strokeWidth="0.6" />
      <defs>
        <linearGradient id="og1"><stop offset="0%" stopColor="transparent" /><stop offset="100%" stopColor="#B69A70" stopOpacity="0.6" /></linearGradient>
        <linearGradient id="og2"><stop offset="0%" stopColor="#B69A70" stopOpacity="0.6" /><stop offset="100%" stopColor="transparent" /></linearGradient>
      </defs>
    </svg>
  )
}

function LeafSpray({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 200 44" fill="none"
      style={{ width: '100%', maxWidth: 220, transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden="true">
      {/* Stem */}
      <path d="M100 36 C85 28 65 22 45 26 C25 30 10 38 5 40" stroke="#B69A70" strokeWidth="0.9" strokeLinecap="round" opacity="0.55" />
      <path d="M100 36 C115 28 135 22 155 26 C175 30 190 38 195 40" stroke="#B69A70" strokeWidth="0.9" strokeLinecap="round" opacity="0.55" />
      {/* Leaves left */}
      <ellipse cx="60" cy="24" rx="12" ry="5" fill="#A8B5A0" opacity="0.45" transform="rotate(15 60 24)" />
      <ellipse cx="38" cy="30" rx="10" ry="4" fill="#A8B5A0" opacity="0.38" transform="rotate(10 38 30)" />
      <ellipse cx="80" cy="20" rx="10" ry="4" fill="#A8B5A0" opacity="0.35" transform="rotate(20 80 20)" />
      {/* Leaves right */}
      <ellipse cx="140" cy="24" rx="12" ry="5" fill="#A8B5A0" opacity="0.45" transform="rotate(-15 140 24)" />
      <ellipse cx="162" cy="30" rx="10" ry="4" fill="#A8B5A0" opacity="0.38" transform="rotate(-10 162 30)" />
      <ellipse cx="120" cy="20" rx="10" ry="4" fill="#A8B5A0" opacity="0.35" transform="rotate(-20 120 20)" />
      {/* Center flower */}
      <circle cx="100" cy="14" r="5.5" fill="#D4B896" opacity="0.65" />
      <circle cx="100" cy="14" r="3" fill="#B69A70" opacity="0.85" />
      <circle cx="88" cy="16" r="2.5" fill="#B69A70" opacity="0.4" />
      <circle cx="112" cy="16" r="2.5" fill="#B69A70" opacity="0.4" />
    </svg>
  )
}

function CornerAccent({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const styles: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0 },
    tr: { top: 0, right: 0, transform: 'scaleX(-1)' },
    bl: { bottom: 0, left: 0, transform: 'scaleY(-1)' },
    br: { bottom: 0, right: 0, transform: 'scale(-1)' },
  }
  return (
    <div style={{ position: 'absolute', width: 'clamp(60px,12vw,90px)',
      height: 'clamp(60px,12vw,90px)', opacity: 0.55, pointerEvents: 'none', ...styles[pos] }}
      aria-hidden="true">
      <svg viewBox="0 0 80 80" fill="none">
        <path d="M6 74 C20 56 40 40 62 16" stroke="#B69A70" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        <ellipse cx="24" cy="58" rx="11" ry="4.5" fill="#A8B5A0" opacity="0.5" transform="rotate(-38 24 58)" />
        <ellipse cx="40" cy="44" rx="9" ry="4" fill="#A8B5A0" opacity="0.42" transform="rotate(-55 40 44)" />
        <ellipse cx="54" cy="30" rx="8" ry="3.5" fill="#A8B5A0" opacity="0.36" transform="rotate(-68 54 30)" />
        <circle cx="16" cy="66" r="2.5" fill="#B69A70" opacity="0.45" />
        <circle cx="30" cy="52" r="2" fill="#B69A70" opacity="0.38" />
      </svg>
    </div>
  )
}

/* ============================================================
   Main InvitationCard — one continuous letter-paper page
   ============================================================ */
export function InvitationCard() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FDFAF4 0%, #F9F5EE 40%, #FAF7F1 100%)',
      position: 'relative',
    }}>
      {/* Subtle paper-line texture */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(182,154,112,0.028) 30px, rgba(182,154,112,0.028) 31px)',
      }} />

      {/* ---- Content column ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          padding: 'clamp(48px,8vw,80px) clamp(20px,5vw,48px) clamp(60px,10vw,100px)',
          position: 'relative',
          zIndex: 1,
        }}
      >

        {/* ---- Running gold border frame (full page height) ---- */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          top: 'clamp(16px,3vw,28px)', bottom: 'clamp(16px,3vw,28px)',
          left: 'clamp(8px,2vw,16px)', right: 'clamp(8px,2vw,16px)',
          border: '1px solid rgba(182,154,112,0.22)',
          borderRadius: '2px',
          pointerEvents: 'none',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute',
          top: 'clamp(22px,4vw,36px)', bottom: 'clamp(22px,4vw,36px)',
          left: 'clamp(13px,3vw,22px)', right: 'clamp(13px,3vw,22px)',
          border: '0.5px solid rgba(182,154,112,0.1)',
          borderRadius: '1px',
          pointerEvents: 'none',
        }} />

        {/* Corner accents */}
        <CornerAccent pos="tl" />
        <CornerAccent pos="tr" />
        <CornerAccent pos="bl" />
        <CornerAccent pos="br" />

        {/* ============================
            BISMILLAH
            ============================ */}
        <FadeIn style={{ textAlign: 'center', paddingTop: 'clamp(16px,4vw,28px)' }}>
          <div style={{
            fontFamily: "'Scheherazade New', serif",
            fontSize: 'clamp(22px, 6vw, 34px)',
            color: '#B69A70',
            direction: 'rtl',
            lineHeight: 1.7,
            marginBottom: '6px',
          }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(11px, 3vw, 13px)',
            color: '#A89880',
            fontStyle: 'italic',
            letterSpacing: '0.08em',
          }}>
            In the name of Allah, the Most Gracious, the Most Merciful
          </div>
        </FadeIn>

        <div style={{ height: 'clamp(28px,5vw,44px)' }} />
        <FadeIn style={{ display: 'flex', justifyContent: 'center' }} delay={80}>
          <OrnamentRow />
        </FadeIn>
        <div style={{ height: 'clamp(24px,4vw,36px)' }} />

        {/* ============================
            HEADING
            ============================ */}
        <FadeIn style={{ textAlign: 'center' }} delay={100}>
          <span style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: 'clamp(8px, 2vw, 10px)',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#A89880',
            fontWeight: 300,
          }}>
            The Wedding Celebration of
          </span>
        </FadeIn>

        <div style={{ height: 'clamp(16px,3vw,24px)' }} />

        {/* ============================
            COUPLE NAMES
            ============================ */}
        <FadeIn style={{ textAlign: 'center' }} delay={150}>
          <h1 style={{ margin: 0 }}>
            <div className="font-calligraphy gold-shimmer"
              style={{ fontSize: 'clamp(44px,11vw,72px)', lineHeight: 1.08 }}>
              Dr. Amrin Fatin
            </div>
          </h1>
        </FadeIn>

        <FadeIn style={{ textAlign: 'center', margin: 'clamp(4px,1.5vw,8px) 0' }} delay={180}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(20px,5vw,30px)',
            color: '#A8B5A0',
            fontStyle: 'italic',
            fontWeight: 300,
          }}>
            &amp;
          </div>
        </FadeIn>

        <FadeIn style={{ textAlign: 'center' }} delay={210}>
          <div className="font-calligraphy gold-shimmer"
            style={{ fontSize: 'clamp(34px,9vw,58px)', lineHeight: 1.1 }}>
            Dr. Muhammed Sanad Nafih
          </div>
        </FadeIn>

        <div style={{ height: 'clamp(28px,5vw,40px)' }} />

        {/* Botanical spray */}
        <FadeIn style={{ display: 'flex', justifyContent: 'center' }} delay={240}>
          <LeafSpray />
        </FadeIn>

        <div style={{ height: 'clamp(28px,5vw,44px)' }} />

        {/* ============================
            INVITATION TEXT
            ============================ */}
        <FadeIn style={{ textAlign: 'center' }} delay={120}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(17px,4.5vw,22px)',
            color: '#6B5F54',
            lineHeight: 1.9,
            fontStyle: 'italic',
            fontWeight: 300,
            maxWidth: '500px',
            margin: '0 auto',
          }}>
            Two hearts, one beautiful beginning.
          </p>
          <div style={{ height: 'clamp(14px,3vw,20px)' }} />
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(14px,3.8vw,18px)',
            color: '#8A7C70',
            lineHeight: 2.0,
            fontWeight: 300,
            maxWidth: '480px',
            margin: '0 auto',
          }}>
            With the blessings of Almighty Allah,
            we joyfully invite you to celebrate our
            <span style={{ color: '#B69A70', fontStyle: 'italic' }}> Nikah </span>
            and share in the happiness of our special day.
          </p>
        </FadeIn>

        <div style={{ height: 'clamp(36px,7vw,56px)' }} />
        <FadeIn style={{ display: 'flex', justifyContent: 'center' }}>
          <GoldDivider wide />
        </FadeIn>
        <div style={{ height: 'clamp(36px,7vw,56px)' }} />

        {/* ============================
            WEDDING DETAILS BOX
            ============================ */}
        <FadeIn>
          <div style={{
            border: '1px solid rgba(182,154,112,0.28)',
            borderRadius: '3px',
            padding: 'clamp(28px,5vw,44px) clamp(16px,4vw,36px)',
            position: 'relative',
            background: 'rgba(253,250,244,0.6)',
          }}>
            {/* Corner diamonds */}
            {[
              { top: -4, left: -4 }, { top: -4, right: -4 },
              { bottom: -4, left: -4 }, { bottom: -4, right: -4 },
            ].map((pos, i) => (
              <div key={i} aria-hidden="true" style={{
                position: 'absolute', width: 8, height: 8,
                background: '#B69A70', opacity: 0.55,
                transform: 'rotate(45deg)',
                ...pos,
              }} />
            ))}

            {/* Date row */}
            <div style={{ textAlign: 'center', marginBottom: 'clamp(20px,4vw,32px)' }}>
              <div style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 'clamp(8px,2vw,10px)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#A89880',
                marginBottom: '8px',
                fontWeight: 300,
              }}>Date</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(20px,5vw,28px)',
                color: '#3D3530',
                fontWeight: 400,
              }}>
                Sunday, 17 January 2027
              </div>
            </div>

            {/* Thin rule */}
            <div style={{ height: '0.5px', background: 'linear-gradient(90deg, transparent, rgba(182,154,112,0.3), transparent)', marginBottom: 'clamp(20px,4vw,32px)' }} />

            {/* Time + Venue split */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1px 1fr',
              gap: 0,
              alignItems: 'center',
            }}>
              <div style={{ textAlign: 'center', padding: '0 16px' }}>
                <div style={{ color: '#B69A70', marginBottom: 10 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
                    <polyline points="12 7 12 12 15.5 14.5" stroke="currentColor" strokeWidth="1.2"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{
                  fontFamily: "'Lato', sans-serif", fontSize: '9px',
                  letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A89880',
                  marginBottom: 6, fontWeight: 300,
                }}>Nikah Ceremony</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(16px,4vw,22px)', color: '#3D3530',
                }}>11:00 AM</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(11px,3vw,14px)', color: '#A89880', fontStyle: 'italic',
                }}>IST</div>
              </div>

              {/* Vertical separator */}
              <div style={{
                width: '1px', alignSelf: 'stretch',
                background: 'linear-gradient(180deg, transparent, rgba(182,154,112,0.3), transparent)',
              }} />

              <div style={{ textAlign: 'center', padding: '0 16px' }}>
                <div style={{ color: '#B69A70', marginBottom: 10 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </div>
                <div style={{
                  fontFamily: "'Lato', sans-serif", fontSize: '9px',
                  letterSpacing: '0.25em', textTransform: 'uppercase', color: '#A89880',
                  marginBottom: 6, fontWeight: 300,
                }}>Venue</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(14px,3.8vw,20px)', color: '#3D3530', lineHeight: 1.3,
                }}>Club 6 Convention Center</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(11px,3vw,14px)', color: '#A89880', fontStyle: 'italic',
                }}>Palakkad, Kerala</div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div style={{ height: 'clamp(40px,8vw,64px)' }} />
        <FadeIn style={{ display: 'flex', justifyContent: 'center' }}>
          <GoldDivider />
        </FadeIn>
        <div style={{ height: 'clamp(40px,8vw,64px)' }} />

        {/* ============================
            COUNTDOWN
            ============================ */}
        <FadeIn style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '9px', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#A89880',
            marginBottom: '6px', fontWeight: 300,
          }}>Counting Down To</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(14px,4vw,18px)',
            color: '#8A7C70', fontStyle: 'italic',
            marginBottom: 'clamp(24px,4vw,36px)',
          }}>
            Our Special Day
          </div>
          <Countdown />
        </FadeIn>

        <div style={{ height: 'clamp(40px,8vw,64px)' }} />
        <FadeIn style={{ display: 'flex', justifyContent: 'center' }}>
          <GoldDivider />
        </FadeIn>
        <div style={{ height: 'clamp(40px,8vw,64px)' }} />

        {/* ============================
            LOCATION + ACTIONS
            ============================ */}
        <FadeIn style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '9px', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: '#A89880',
            marginBottom: 'clamp(20px,4vw,32px)', fontWeight: 300,
          }}>Find the Venue</div>

          <div style={{
            display: 'flex', flexWrap: 'wrap',
            gap: 14, justifyContent: 'center', alignItems: 'center',
          }}>
            {/* Directions */}
            <a
              id="get-directions-btn"
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 26px',
                background: 'linear-gradient(135deg, #B69A70 0%, #9A7D5E 100%)',
                color: '#FDFAF4',
                fontFamily: "'Lato', sans-serif",
                fontSize: '10px', letterSpacing: '0.2em',
                textTransform: 'uppercase', textDecoration: 'none',
                borderRadius: '2px', fontWeight: 400,
                boxShadow: '0 4px 20px rgba(182,154,112,0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                willChange: 'transform',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'
                ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 28px rgba(182,154,112,0.4)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = ''
                ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(182,154,112,0.3)'
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  fill="currentColor" opacity="0.9" />
                <circle cx="12" cy="9" r="2.5" fill="#FDFAF4" />
              </svg>
              Get Directions
            </a>

            <AddToCalendar />
          </div>
        </FadeIn>

        <div style={{ height: 'clamp(48px,9vw,72px)' }} />

        {/* Full-width botanical */}
        <FadeIn style={{ display: 'flex', justifyContent: 'center' }}>
          <LeafSpray flip />
        </FadeIn>

        <div style={{ height: 'clamp(36px,6vw,52px)' }} />
        <FadeIn style={{ display: 'flex', justifyContent: 'center' }}>
          <OrnamentRow />
        </FadeIn>
        <div style={{ height: 'clamp(36px,6vw,52px)' }} />

        {/* ============================
            CLOSING MESSAGE
            ============================ */}
        <FadeIn style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(17px,4.8vw,24px)',
            color: '#6B5F54',
            lineHeight: 1.9,
            fontStyle: 'italic',
            fontWeight: 300,
            maxWidth: '460px',
            margin: '0 auto',
          }}>
            "Your presence will make our celebration<br />even more beautiful."
          </p>
        </FadeIn>

        <div style={{ height: 'clamp(24px,4vw,36px)' }} />

        <FadeIn style={{ display: 'flex', justifyContent: 'center' }}>
          <GoldDivider />
        </FadeIn>

        <div style={{ height: 'clamp(24px,4vw,36px)' }} />

        {/* Couple sign-off */}
        <FadeIn style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(12px,3vw,15px)',
            color: '#A89880',
            letterSpacing: '0.1em',
            marginBottom: '8px',
            fontStyle: 'italic',
          }}>
            With love,
          </div>
          <div className="font-calligraphy gold-shimmer"
            style={{ fontSize: 'clamp(38px,9vw,58px)', lineHeight: 1.15 }}>
            Amrin &amp; Sanad
          </div>
        </FadeIn>

        <div style={{ height: 'clamp(36px,6vw,52px)' }} />

        {/* Arabic closing blessing */}
        <FadeIn style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Scheherazade New', serif",
            fontSize: 'clamp(18px,5vw,26px)',
            color: '#B69A70',
            direction: 'rtl',
            lineHeight: 1.6,
            opacity: 0.8,
          }}>
            بَارَكَ اللَّهُ لَكُم
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(11px,2.8vw,13px)',
            color: '#A89880',
            fontStyle: 'italic',
            marginTop: '5px',
            letterSpacing: '0.08em',
          }}>
            May Allah bless you
          </div>
        </FadeIn>

        <div style={{ height: 'clamp(48px,8vw,64px)' }} />

        {/* Footer rule */}
        <FadeIn style={{ display: 'flex', justifyContent: 'center' }}>
          <GoldDivider wide />
        </FadeIn>

        <FadeIn style={{ textAlign: 'center', paddingTop: 'clamp(16px,3vw,24px)', paddingBottom: 'clamp(16px,3vw,28px)' }}>
          <div style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '9px', color: '#C0B0A0',
            letterSpacing: '0.2em', fontWeight: 300,
          }}>
            17 · 01 · 2027 &nbsp;·&nbsp; Palakkad, Kerala
          </div>
        </FadeIn>

      </motion.div>
    </div>
  )
}
