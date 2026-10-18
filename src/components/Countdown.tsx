import { useState, useEffect } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  // Wedding: 17 January 2027, 11:00 AM IST (UTC+5:30)
  const weddingDate = new Date('2027-01-17T05:30:00.000Z') // 11:00 AM IST = 05:30 UTC
  const now = new Date()
  const diff = weddingDate.getTime() - now.getTime()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ textAlign: 'center', minWidth: '60px' }}>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(32px, 8vw, 52px)',
          fontWeight: 300,
          color: '#B69A70',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          transition: 'all 0.3s ease',
        }}
      >
        {pad(value)}
      </div>
      <div
        style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: 'clamp(9px, 2.5vw, 11px)',
          color: '#9B8F85',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginTop: '6px',
          fontWeight: 300,
        }}
      >
        {label}
      </div>
    </div>
  )
}

function Separator() {
  return (
    <div
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(28px, 7vw, 44px)',
        color: '#D4B896',
        fontWeight: 300,
        lineHeight: 1,
        paddingBottom: '18px',
        opacity: 0.7,
        animation: 'soft-pulse 2s ease-in-out infinite',
      }}
    >
      :
    </div>
  )
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const isPast = timeLeft.days === 0 && timeLeft.hours === 0 &&
    timeLeft.minutes === 0 && timeLeft.seconds === 0

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
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: 'clamp(8px, 3vw, 20px)',
          }}
        >
          <CountUnit value={timeLeft.days} label="Days" />
          <Separator />
          <CountUnit value={timeLeft.hours} label="Hours" />
          <Separator />
          <CountUnit value={timeLeft.minutes} label="Minutes" />
          <Separator />
          <CountUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      )}
    </div>
  )
}
