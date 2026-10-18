import type { CSSProperties } from 'react'

/**
 * BotanicalSVG — Decorative botanical illustration elements
 * Used as accent decorations throughout the invitation
 */

export function BotanicalCorner({
  className = '',
  flip = false,
}: {
  className?: string
  flip?: boolean
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
    >
      {/* Main branch */}
      <path
        d="M10 110 C30 85 55 70 75 45 C85 32 90 20 88 10"
        stroke="#B69A70"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {/* Leaves */}
      <ellipse cx="38" cy="80" rx="10" ry="5" fill="#A8B5A0" opacity="0.5"
        transform="rotate(-30 38 80)" />
      <ellipse cx="55" cy="65" rx="9" ry="4.5" fill="#A8B5A0" opacity="0.45"
        transform="rotate(-50 55 65)" />
      <ellipse cx="68" cy="50" rx="8" ry="4" fill="#A8B5A0" opacity="0.4"
        transform="rotate(-65 68 50)" />
      <ellipse cx="78" cy="36" rx="7" ry="3.5" fill="#A8B5A0" opacity="0.35"
        transform="rotate(-75 78 36)" />
      {/* Small berries */}
      <circle cx="30" cy="88" r="2.5" fill="#B69A70" opacity="0.5" />
      <circle cx="45" cy="75" r="2" fill="#B69A70" opacity="0.4" />
      <circle cx="62" cy="58" r="2" fill="#B69A70" opacity="0.4" />
      {/* Tendrils */}
      <path d="M38 80 C32 75 28 78 26 82" stroke="#B69A70" strokeWidth="0.8"
        strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M55 65 C50 58 46 61 44 66" stroke="#B69A70" strokeWidth="0.8"
        strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  )
}

export function BotanicalSprig({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 60" fill="none" className={className} aria-hidden="true">
      <path
        d="M100 50 C80 40 60 35 40 38 C20 41 10 50 5 55"
        stroke="#B69A70" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"
      />
      <path
        d="M100 50 C120 40 140 35 160 38 C180 41 190 50 195 55"
        stroke="#B69A70" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"
      />
      {/* Left leaves */}
      <ellipse cx="50" cy="35" rx="12" ry="5" fill="#A8B5A0" opacity="0.4"
        transform="rotate(20 50 35)" />
      <ellipse cx="30" cy="42" rx="10" ry="4" fill="#A8B5A0" opacity="0.35"
        transform="rotate(15 30 42)" />
      <ellipse cx="70" cy="31" rx="10" ry="4" fill="#A8B5A0" opacity="0.35"
        transform="rotate(25 70 31)" />
      {/* Right leaves */}
      <ellipse cx="150" cy="35" rx="12" ry="5" fill="#A8B5A0" opacity="0.4"
        transform="rotate(-20 150 35)" />
      <ellipse cx="170" cy="42" rx="10" ry="4" fill="#A8B5A0" opacity="0.35"
        transform="rotate(-15 170 42)" />
      <ellipse cx="130" cy="31" rx="10" ry="4" fill="#A8B5A0" opacity="0.35"
        transform="rotate(-25 130 31)" />
      {/* Center flower */}
      <circle cx="100" cy="28" r="5" fill="#D4B896" opacity="0.6" />
      <circle cx="100" cy="28" r="3" fill="#B69A70" opacity="0.8" />
      {/* Small dots */}
      <circle cx="86" cy="30" r="2" fill="#B69A70" opacity="0.4" />
      <circle cx="114" cy="30" r="2" fill="#B69A70" opacity="0.4" />
    </svg>
  )
}

export function WaxSeal({
  initials = 'A & S',
  size = 100,
  broken = false,
}: {
  initials?: string
  size?: number
  broken?: boolean
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      aria-label="Wax seal"
      style={{
        filter: 'drop-shadow(0 3px 8px rgba(140, 115, 85, 0.4))',
        transform: broken ? 'scale(0) rotate(15deg)' : 'scale(1)',
        transition: 'transform 0.5s ease',
        opacity: broken ? 0 : 1,
      }}
    >
      {/* Outer ring — dripped wax effect */}
      <circle cx="50" cy="50" r="46" fill="#8C7355" opacity="0.15" />
      <circle cx="50" cy="50" r="43" fill="#9A7D5E" />
      {/* Wax texture rings */}
      <circle cx="50" cy="50" r="40" fill="none" stroke="#B69A70" strokeWidth="1.5" opacity="0.4" />
      <circle cx="50" cy="50" r="36" fill="none" stroke="#B69A70" strokeWidth="0.8" opacity="0.3" />
      {/* Inner seal */}
      <circle cx="50" cy="50" r="33" fill="#7A6348" />
      <circle cx="50" cy="50" r="30" fill="#8C7355" />
      {/* Star/sun burst around edge */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <line
          key={i}
          x1={50 + 32 * Math.cos((angle * Math.PI) / 180)}
          y1={50 + 32 * Math.sin((angle * Math.PI) / 180)}
          x2={50 + 36 * Math.cos((angle * Math.PI) / 180)}
          y2={50 + 36 * Math.sin((angle * Math.PI) / 180)}
          stroke="#B69A70"
          strokeWidth="1.5"
          opacity="0.6"
        />
      ))}
      {/* Initials text */}
      <text
        x="50"
        y="55"
        textAnchor="middle"
        fontFamily="'Great Vibes', cursive"
        fontSize="14"
        fill="#FAF8F4"
        opacity="0.95"
      >
        {initials}
      </text>
      {/* Subtle shine */}
      <ellipse cx="38" cy="38" rx="8" ry="5" fill="white" opacity="0.08"
        transform="rotate(-20 38 38)" />
    </svg>
  )
}

export function GoldDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 20" fill="none" className={className} aria-hidden="true">
      <line x1="0" y1="10" x2="120" y2="10" stroke="url(#goldGrad)" strokeWidth="0.8" />
      <circle cx="140" cy="10" r="2" fill="#B69A70" />
      <circle cx="150" cy="10" r="3.5" fill="#B69A70" />
      <circle cx="160" cy="10" r="2" fill="#B69A70" />
      <line x1="180" y1="10" x2="300" y2="10" stroke="url(#goldGradR)" strokeWidth="0.8" />
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="120" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#B69A70" />
        </linearGradient>
        <linearGradient id="goldGradR" x1="0" y1="0" x2="120" y2="0">
          <stop offset="0%" stopColor="#B69A70" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function FloralFrame({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 400 20" fill="none" className={className} style={style} aria-hidden="true">
      {/* Center ornament */}
      <g transform="translate(200 10)">
        <circle cx="0" cy="0" r="4" fill="#B69A70" opacity="0.7" />
        <circle cx="-12" cy="0" r="2.5" fill="#B69A70" opacity="0.5" />
        <circle cx="12" cy="0" r="2.5" fill="#B69A70" opacity="0.5" />
        <circle cx="-22" cy="0" r="1.5" fill="#B69A70" opacity="0.4" />
        <circle cx="22" cy="0" r="1.5" fill="#B69A70" opacity="0.4" />
      </g>
      {/* Left line */}
      <line x1="0" y1="10" x2="172" y2="10" stroke="url(#fGrad1)" strokeWidth="0.6" />
      {/* Right line */}
      <line x1="228" y1="10" x2="400" y2="10" stroke="url(#fGrad2)" strokeWidth="0.6" />
      <defs>
        <linearGradient id="fGrad1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#B69A70" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="fGrad2">
          <stop offset="0%" stopColor="#B69A70" stopOpacity="0.7" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  )
}
