'use client'

import { useEffect, useState } from 'react'
import { trackEvent } from '@/app/lib/analytics'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); trackEvent({ action: 'scroll_to_top', category: 'engagement' }); }}
      className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white/80 text-zinc-600 shadow-lg backdrop-blur-sm transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-black/80 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-white scroll-top-visible"
      aria-label="Scroll to top"
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  )
}
