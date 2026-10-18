import { useEffect, useState, useRef } from 'react'

interface Petal {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  rotation: number
  color: string
  type: number
}

interface FloatingPetalsProps {
  active: boolean
  intensity?: 'light' | 'medium'
}

const PETAL_COLORS = [
  'rgba(182, 154, 112, 0.6)',
  'rgba(212, 184, 150, 0.5)',
  'rgba(168, 181, 160, 0.5)',
  'rgba(197, 208, 190, 0.4)',
  'rgba(232, 213, 176, 0.6)',
  'rgba(255, 235, 210, 0.7)',
]

function PetalSVG({ type, color, size }: { type: number; color: string; size: number }) {
  if (type === 0) {
    return (
      <svg width={size} height={size * 1.4} viewBox="0 0 20 28" fill="none">
        <ellipse cx="10" cy="14" rx="7" ry="12" fill={color} />
      </svg>
    )
  }
  if (type === 1) {
    return (
      <svg width={size * 1.2} height={size} viewBox="0 0 24 20" fill="none">
        <path d="M12 2 C18 6 20 12 12 18 C4 12 6 6 12 2Z" fill={color} />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M10 1 C14 5 16 9 10 13 C4 9 6 5 10 1Z M10 7 C14 11 16 15 10 19 C4 15 6 11 10 7Z" fill={color} />
    </svg>
  )
}

export function FloatingPetals({ active, intensity = 'light' }: FloatingPetalsProps) {
  const [petals, setPetals] = useState<Petal[]>([])
  const counterRef = useRef(0)

  const count = intensity === 'medium' ? 12 : 6

  useEffect(() => {
    if (!active) {
      setPetals([])
      return
    }

    const createPetal = (): Petal => ({
      id: counterRef.current++,
      x: Math.random() * 100,
      size: 10 + Math.random() * 16,
      duration: 7 + Math.random() * 8,
      delay: Math.random() * 2,
      rotation: Math.random() * 360,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      type: Math.floor(Math.random() * 3),
    })

    // Initial burst
    setPetals(Array.from({ length: count }, createPetal))

    // Continuous spawn
    const interval = setInterval(() => {
      setPetals(prev => {
        const filtered = prev.filter(p => p.id > counterRef.current - 20)
        return [...filtered, createPetal()]
      })
    }, 1200)

    return () => clearInterval(interval)
  }, [active, count])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {petals.map(petal => (
        <div
          key={petal.id}
          style={{
            position: 'absolute',
            left: `${petal.x}%`,
            top: '-40px',
            animation: `petal-float ${petal.duration}s ease-in ${petal.delay}s forwards`,
            transform: `rotate(${petal.rotation}deg)`,
          }}
          onAnimationEnd={() => {
            setPetals(prev => prev.filter(p => p.id !== petal.id))
          }}
        >
          <PetalSVG type={petal.type} color={petal.color} size={petal.size} />
        </div>
      ))}
    </div>
  )
}
