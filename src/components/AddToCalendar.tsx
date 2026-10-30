import { useState } from 'react'

export function AddToCalendar() {
  const [open, setOpen] = useState(false)

  const eventDetails = {
    title: 'Nikah Ceremony — Amrin & Nafih',
    description: 'You are cordially invited to the Nikah ceremony of Dr. Amrin Fatin and Dr. Muhammed Sanad Nafih. With the blessings of Almighty Allah.',
    location: 'Club 6 Convention Center, Palakkad, Kerala',
    // 17 Jan 2027 11:00 AM IST
    startIST: '20270117T053000Z', // UTC
    endIST: '20270117T083000Z',   // 2:00 PM IST = 08:30 UTC
  }

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.startIST}/${eventDetails.endIST}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//EN
BEGIN:VEVENT
DTSTART:20270117T053000Z
DTEND:20270117T083000Z
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`

  const downloadICS = () => {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Amrin-Nafih-wedding.ics'
    a.click()
    URL.revokeObjectURL(url)
    setOpen(false)
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        id="add-to-calendar-btn"
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 28px',
          border: '1px solid rgba(182, 154, 112, 0.6)',
          borderRadius: '2px',
          background: 'transparent',
          color: '#B69A70',
          fontFamily: "'Lato', sans-serif",
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase' as const,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontWeight: 400,
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(182, 154, 112, 0.08)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
        }}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.5" />
          <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Add to Calendar
      </button>

      {open && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 40 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="menu"
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 8px)',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#FAF8F4',
              border: '1px solid rgba(182, 154, 112, 0.3)',
              borderRadius: '4px',
              padding: '6px 0',
              zIndex: 50,
              minWidth: '180px',
              boxShadow: '0 8px 32px rgba(61, 53, 48, 0.12)',
            }}
          >
            {[
              {
                id: 'cal-google',
                label: 'Google Calendar',
                icon: '📅',
                action: () => { window.open(googleUrl, '_blank'); setOpen(false) },
              },
              {
                id: 'cal-apple',
                label: 'Apple Calendar (.ics)',
                icon: '🍎',
                action: downloadICS,
              },
              {
                id: 'cal-outlook',
                label: 'Outlook (.ics)',
                icon: '📧',
                action: downloadICS,
              },
            ].map(item => (
              <button
                key={item.id}
                id={item.id}
                role="menuitem"
                onClick={item.action}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 16px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '13px',
                  color: '#3D3530',
                  textAlign: 'left' as const,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(182, 154, 112, 0.08)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'none'
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
