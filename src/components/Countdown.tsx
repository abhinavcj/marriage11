import { useState, useEffect, useTransition, useCallback } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Wedding: 17 January 2027, 11:00 AM IST = 05:30 UTC
const WEDDING_DATE = new Date('2027-01-17T05:30:00.000Z')

function getTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000)  / 60_000),
    seconds: Math.floor((diff % 60_000)     / 1_000),
  }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ textAlign: 'center', minWidth: '56px' }}>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(30px, 8vw, 52px)',
        fontWeight: 300,
        color: '#B69A70',
        lineHeight: 1,
        letterSpacing: '-0.02em',
        /* Use transform for digit swap — avoids layout */
        contain: 'content',
      }}>
        {pad(value)}
      </div>
      <div style={{
        fontFamily: "'Lato', sans-serif",
        fontSize: 'clamp(9px, 2.5vw, 11px)',
        color: '#9B8F85',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginTop: '6px',
        fontWeight: 300,
      }}>
        {label}
      </div>
    </div>
  )
}

function Separator() {
  return (
    <div style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: 'clamp(26px, 7vw, 44px)',
      color: '#D4B896',
      fontWeight: 300,
      lineHeight: 1,
      paddingBottom: '18px',
      opacity: 0.6,
    }}>
      :
    </div>
  )
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft)
  // useTransition marks the state update as low-priority —
  // the browser can skip it during an active scroll gesture,
  // preventing the 1-second tick from causing mid-scroll jank.
  const [, startTransition] = useTransition()

  const tick = useCallback(() => {
    startTransition(() => setTimeLeft(getTimeLeft()))
  }, [startTransition])

  useEffect(() => {
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [tick])

  const isPast = Object.values(timeLeft).every(v => v === 0)

  return (
    <div style={{ textAlign: 'center' }}>
      {isPast ? (
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(18px, 4vw, 24px)',
          color: '#B69A70',
          fontStyle: 'italic',
        }}>
          The celebration has begun ✨
        </p>
      ) : (
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 'clamp(8px, 3vw, 20px)',
        }}>
          <CountUnit value={timeLeft.days}    label="Days"    />
          <Separator />
          <CountUnit value={timeLeft.hours}   label="Hours"   />
          <Separator />
          <CountUnit value={timeLeft.minutes} label="Minutes" />
          <Separator />
          <CountUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      )}
    </div>
  )
}
