import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { BotanicalCorner, BotanicalSprig, FloralFrame } from './Botanicals'
import { Countdown } from './Countdown'
import { AddToCalendar } from './AddToCalendar'

const MAPS_URL =
  'https://www.google.com/maps/search/Club+6+Convention+Center+Palakkad+Kerala'

/* ========= Section fade-in on scroll =========
   - rootMargin: trigger 60px before element enters viewport
     so animation starts while user is still scrolling toward it,
     not after they've already arrived (which causes a visible stutter).
   - rAF: batch the classList write into the next paint frame
     so it never blocks the scroll thread.
   - disconnect immediately after triggering — no wasted observers.
   ================================================ */
function useSectionFade() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If already in view on mount (e.g. very short pages), show immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      el.classList.add('visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Batch into next animation frame — keeps scroll thread free
          requestAnimationFrame(() => {
            el.classList.add('visible')
          })
          observer.disconnect()
        }
      },
      {
        // Trigger 80px before element reaches viewport bottom
        rootMargin: '0px 0px -60px 0px',
        threshold: 0,
      }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

/* ========= Section wrapper ========= */
function Section({ children, style }: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  const ref = useSectionFade()
  return (
    <div ref={ref} className="section-fade" style={style}>
      {children}
    </div>
  )
}


/* ========= Styled divider ========= */
function GoldLine() {
  return (
    <div style={{
      width: '60px',
      height: '1px',
      background: 'linear-gradient(90deg, transparent, #B69A70, transparent)',
      margin: '0 auto',
    }} />
  )
}

/* ========= Detail block ========= */
function DetailBlock({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
}) {
  return (
    <div style={{ textAlign: 'center', padding: '24px 16px' }}>
      <div style={{ marginBottom: '12px', color: '#B69A70' }}>{icon}</div>
      <div style={{
        fontFamily: "'Lato', sans-serif",
        fontSize: '10px',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#9B8F85',
        marginBottom: '8px',
        fontWeight: 400,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(16px, 4.5vw, 22px)',
        color: '#3D3530',
        fontWeight: 400,
        lineHeight: 1.3,
      }}>
        {value}
      </div>
      {sub && (
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(13px, 3.5vw, 16px)',
          color: '#9B8F85',
          fontStyle: 'italic',
          marginTop: '4px',
        }}>
          {sub}
        </div>
      )}
    </div>
  )
}

/* ========= Main InvitationCard ========= */
export function InvitationCard() {

  return (
    <div
      id="invitation-card"
      style={{
        minHeight: '100vh',
        background: '#FAF8F4',
        // No overflow:hidden here — that traps scroll on iOS.
        // Horizontal clip is handled at html/body level.
      }}
    >
      {/* ============================
          HERO / BISMILLAH SECTION
          ============================ */}
      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(60px, 10vw, 100px) clamp(20px, 6vw, 60px)',
          textAlign: 'center',
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(182,154,112,0.08) 0%, transparent 60%),
            linear-gradient(180deg, #FAF8F4 0%, #F5F1EA 50%, #FAF8F4 100%)
          `,
        }}
      >
        {/* Corner botanicals */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 'clamp(80px,15vw,140px)', opacity: 0.6 }}>
          <BotanicalCorner />
        </div>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 'clamp(80px,15vw,140px)', opacity: 0.6 }}>
          <BotanicalCorner flip />
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: 'clamp(80px,15vw,140px)', opacity: 0.6,
          transform: 'scaleY(-1)' }}>
          <BotanicalCorner />
        </div>
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 'clamp(80px,15vw,140px)', opacity: 0.6,
          transform: 'scale(-1)' }}>
          <BotanicalCorner />
        </div>

        {/* Gold border frame */}
        <div style={{
          position: 'absolute',
          inset: 'clamp(12px, 3vw, 24px)',
          border: '1px solid rgba(182, 154, 112, 0.2)',
          borderRadius: '2px',
          pointerEvents: 'none',
        }} />

        {/* Bismillah */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div
            className="font-arabic"
            style={{
              fontSize: 'clamp(26px, 7vw, 44px)',
              color: '#B69A70',
              lineHeight: 1.6,
              marginBottom: '10px',
              direction: 'rtl',
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(11px, 3vw, 14px)',
            color: '#9B8F85',
            letterSpacing: '0.1em',
            fontStyle: 'italic',
            marginBottom: '40px',
          }}>
            In the name of Allah, the Most Gracious, the Most Merciful
          </div>
        </motion.div>

        <GoldLine />

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{ margin: '32px 0 16px' }}
        >
          <span style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: 'clamp(9px, 2.5vw, 11px)',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#9B8F85',
            fontWeight: 300,
          }}>
            The Wedding Celebration of
          </span>
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <h1 style={{ margin: 0 }}>
            <div
              className="font-calligraphy gold-shimmer"
              style={{
                fontSize: 'clamp(44px, 12vw, 80px)',
                lineHeight: 1.05,
              }}
            >
              Dr. Amrin Fatin
            </div>
          </h1>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(18px, 5vw, 28px)',
            color: '#A8B5A0',
            margin: '8px 0',
            fontStyle: 'italic',
            fontWeight: 300,
          }}>
            &amp;
          </div>

          <div
            className="font-calligraphy gold-shimmer"
            style={{
              fontSize: 'clamp(36px, 10vw, 68px)',
              lineHeight: 1.1,
            }}
          >
            Dr. Muhammed Sanad Nafih
          </div>
        </motion.div>

        {/* Botanical sprig divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ width: 'clamp(180px, 50vw, 280px)', margin: '24px auto 0' }}
        >
          <BotanicalSprig />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          aria-hidden="true"
        >
          <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
            <rect x="1" y="1" width="18" height="30" rx="9" stroke="#B69A70" strokeWidth="1.2" opacity="0.5" />
            <motion.circle
              cx="10" cy="10" r="3" fill="#B69A70" opacity="0.6"
              animate={{ cy: [10, 20, 10] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
      </div>

      {/* ============================
          INVITATION MESSAGE
          ============================ */}
      <Section
        style={{
          padding: 'clamp(60px, 10vw, 100px) clamp(24px, 8vw, 80px)',
          maxWidth: '720px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <FloralFrame style={{ width: '100%', maxWidth: 400, margin: '0 auto 40px' }} />

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(16px, 4.5vw, 22px)',
          color: '#6B5F54',
          lineHeight: 1.9,
          fontStyle: 'italic',
          fontWeight: 300,
        }}>
          Two hearts, one beautiful beginning.
        </p>

        <div style={{ height: 'clamp(16px, 4vw, 28px)' }} />

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(14px, 3.8vw, 18px)',
          color: '#9B8F85',
          lineHeight: 2,
          fontWeight: 300,
          maxWidth: '560px',
          margin: '0 auto',
        }}>
          With the blessings of Almighty Allah, we joyfully invite you to celebrate our
          <span style={{ color: '#B69A70', fontStyle: 'italic' }}> Nikah </span>
          and share in the happiness of our special day.
        </p>

        <FloralFrame style={{ width: '100%', maxWidth: 400, margin: '40px auto 0',
          transform: 'scaleX(-1)' }} />
      </Section>

      {/* ============================
          WEDDING DETAILS
          ============================ */}
      <Section
        style={{
          background: 'linear-gradient(180deg, #FAF8F4 0%, #F0EDE6 50%, #FAF8F4 100%)',
          padding: 'clamp(60px, 10vw, 100px) clamp(20px, 6vw, 40px)',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          {/* Section label */}
          <div style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#9B8F85',
            marginBottom: '40px',
            fontWeight: 300,
          }}>
            Wedding Details
          </div>

          {/* Gold border box */}
          <div style={{
            border: '1px solid rgba(182, 154, 112, 0.3)',
            borderRadius: '4px',
            padding: 'clamp(32px, 6vw, 56px) clamp(20px, 5vw, 40px)',
            position: 'relative',
            background: 'rgba(250, 248, 244, 0.8)',
          }}>
            {/* Corner dots */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => (
              <div
                key={pos}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#B69A70',
                  opacity: 0.5,
                  ...(pos === 'top-left' ? { top: -3, left: -3 } :
                    pos === 'top-right' ? { top: -3, right: -3 } :
                    pos === 'bottom-left' ? { bottom: -3, left: -3 } :
                    { bottom: -3, right: -3 }),
                }}
              />
            ))}

            {/* Details grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'clamp(16px, 4vw, 0)',
              position: 'relative',
            }}>
              <DetailBlock
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                }
                label="Date"
                value="Sunday, 17 January 2027"
              />

              {/* Vertical divider */}
              <div style={{
                position: 'absolute',
                top: '20%',
                bottom: '20%',
                left: '33.3%',
                width: '1px',
                background: 'linear-gradient(180deg, transparent, rgba(182,154,112,0.3), transparent)',
              }} />
              <div style={{
                position: 'absolute',
                top: '20%',
                bottom: '20%',
                left: '66.6%',
                width: '1px',
                background: 'linear-gradient(180deg, transparent, rgba(182,154,112,0.3), transparent)',
              }} />

              <DetailBlock
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
                    <polyline points="12 7 12 12 15 15" stroke="currentColor" strokeWidth="1.2"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
                label="Ceremony"
                value="Nikah — 11:00 AM"
                sub="IST"
              />

              <DetailBlock
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                }
                label="Venue"
                value="Club 6 Convention Center"
                sub="Palakkad, Kerala"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ============================
          COUNTDOWN
          ============================ */}
      <Section
        style={{
          padding: 'clamp(60px, 10vw, 100px) clamp(20px, 6vw, 40px)',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <div style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: '10px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#9B8F85',
          marginBottom: '16px',
          fontWeight: 300,
        }}>
          Counting Down
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(16px, 4vw, 22px)',
          color: '#6B5F54',
          fontStyle: 'italic',
          marginBottom: '40px',
          fontWeight: 300,
        }}>
          Until our special day
        </div>

        <Countdown />
      </Section>

      {/* ============================
          LOCATION & ACTIONS
          ============================ */}
      <Section
        style={{
          background: 'linear-gradient(180deg, #FAF8F4 0%, #F0EDE6 100%)',
          padding: 'clamp(60px, 10vw, 100px) clamp(20px, 6vw, 40px)',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#9B8F85',
            marginBottom: '32px',
            fontWeight: 300,
          }}>
            Find Us
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(22px, 6vw, 32px)',
            color: '#3D3530',
            marginBottom: '8px',
          }}>
            Club 6 Convention Center
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(14px, 3.5vw, 18px)',
            color: '#9B8F85',
            fontStyle: 'italic',
            marginBottom: '40px',
          }}>
            Palakkad, Kerala
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {/* Directions button */}
            <a
              id="get-directions-btn"
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 28px',
                background: 'linear-gradient(135deg, #B69A70 0%, #9A7D5E 100%)',
                color: '#FAF8F4',
                fontFamily: "'Lato', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(182, 154, 112, 0.3)',
                fontWeight: 400,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'
                ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 30px rgba(182, 154, 112, 0.4)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(182, 154, 112, 0.3)'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  fill="currentColor" opacity="0.9" />
                <circle cx="12" cy="9" r="2.5" fill="#FAF8F4" />
              </svg>
              Get Directions
            </a>

            <AddToCalendar />
          </div>
        </div>
      </Section>

      {/* ============================
          CLOSING MESSAGE
          ============================ */}
      <Section
        style={{
          padding: 'clamp(80px, 12vw, 120px) clamp(24px, 8vw, 60px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background botanical accent */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(ellipse at 50% 50%, rgba(168,181,160,0.06) 0%, transparent 70%)
          `,
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
          {/* Botanical sprig above */}
          <div style={{ width: 'clamp(160px, 40vw, 240px)', margin: '0 auto 40px' }}>
            <BotanicalSprig />
          </div>

          <div style={{
            width: '48px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #B69A70, transparent)',
            margin: '0 auto 40px',
          }} />

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(18px, 5vw, 26px)',
            color: '#6B5F54',
            lineHeight: 1.8,
            fontStyle: 'italic',
            fontWeight: 300,
            marginBottom: '24px',
          }}>
            "Your presence will make our celebration even more beautiful."
          </p>

          <div style={{
            width: '32px',
            height: '1px',
            background: 'rgba(182, 154, 112, 0.4)',
            margin: '0 auto 24px',
          }} />

          <div
            className="font-calligraphy gold-shimmer"
            style={{
              fontSize: 'clamp(36px, 9vw, 58px)',
              lineHeight: 1.2,
            }}
          >
            With love, Amrin &amp; Sanad
          </div>

          {/* Final botanical */}
          <div style={{ width: 'clamp(120px, 30vw, 180px)', margin: '36px auto 0',
            transform: 'scaleX(-1)' }}>
            <BotanicalSprig />
          </div>

          {/* Arabic closing */}
          <div
            className="font-arabic"
            style={{
              fontSize: 'clamp(18px, 5vw, 28px)',
              color: '#B69A70',
              direction: 'rtl',
              marginTop: '48px',
              opacity: 0.7,
            }}
          >
            بَارَكَ اللَّهُ لَكُم
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(11px, 3vw, 13px)',
            color: '#9B8F85',
            fontStyle: 'italic',
            marginTop: '6px',
            letterSpacing: '0.08em',
          }}>
            May Allah bless you
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '80px',
          paddingTop: '32px',
          borderTop: '1px solid rgba(182, 154, 112, 0.15)',
        }}>
          <div style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '10px',
            color: '#C0B4AA',
            letterSpacing: '0.15em',
            fontWeight: 300,
          }}>
            17 · 01 · 2027
          </div>
        </div>
      </Section>
    </div>
  )
}
