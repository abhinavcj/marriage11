import { useState, useRef, useEffect } from 'react'

/**
 * MusicToggle — Ambient music player with muted-by-default policy.
 * Uses a freely available relaxing instrumental via web audio oscillator
 * (no external file needed) as a placeholder ambient tone.
 * 
 * In production, replace with an actual .mp3 file hosted on your server.
 */
export function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])

  useEffect(() => {
    // Show after 2s
    const t = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(t)
  }, [])

  const createAmbientSound = () => {
    const ctx = new AudioContext()
    audioCtxRef.current = ctx

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0, ctx.currentTime)
    masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2)
    masterGain.connect(ctx.destination)
    gainRef.current = masterGain

    // Create a peaceful drone chord: A minor — A2, E3, A3, C4
    const frequencies = [110, 165, 220, 261.63, 329.63, 440]
    const freqGains = [0.3, 0.2, 0.25, 0.15, 0.1, 0.08]

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const oscGain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      // Subtle vibrato
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      oscGain.gain.value = freqGains[i]
      osc.connect(oscGain)
      oscGain.connect(masterGain)
      osc.start()
      oscillatorsRef.current.push(osc)
    })
  }

  const toggle = () => {
    if (!playing) {
      if (!audioCtxRef.current) {
        createAmbientSound()
      } else {
        // Resume
        audioCtxRef.current.resume()
        gainRef.current?.gain.linearRampToValueAtTime(0.08, audioCtxRef.current.currentTime + 1)
      }
      setPlaying(true)
    } else {
      // Fade out and suspend
      if (audioCtxRef.current && gainRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1)
        setTimeout(() => audioCtxRef.current?.suspend(), 1100)
      }
      setPlaying(false)
    }
  }

  if (!visible) return null

  return (
    <button
      id="music-toggle-btn"
      className="music-btn"
      onClick={toggle}
      aria-label={playing ? 'Mute ambient music' : 'Play ambient music'}
      title={playing ? 'Mute music' : 'Play ambient music'}
    >
      {playing ? (
        // Sound waves icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#B69A70" />
          <path d="M15.54 8.46a5 5 0 010 7.07" stroke="#B69A70" strokeWidth="1.5"
            strokeLinecap="round" />
          <path d="M19.07 4.93a10 10 0 010 14.14" stroke="#B69A70" strokeWidth="1.5"
            strokeLinecap="round" />
        </svg>
      ) : (
        // Muted icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#9B8F85" />
          <line x1="23" y1="9" x2="17" y2="15" stroke="#9B8F85" strokeWidth="1.5"
            strokeLinecap="round" />
          <line x1="17" y1="9" x2="23" y2="15" stroke="#9B8F85" strokeWidth="1.5"
            strokeLinecap="round" />
        </svg>
      )}
    </button>
  )
}
