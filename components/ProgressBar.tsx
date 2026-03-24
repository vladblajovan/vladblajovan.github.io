'use client'

import { useEffect, useState } from 'react'

export default function ProgressBar() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setWidth(h > 0 ? (window.scrollY / h) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      id="progress-bar"
      className="fixed top-0 left-0 z-[60] h-0.5 bg-zinc-400 dark:bg-zinc-500"
      style={{ width: `${width}%` }}
      aria-hidden="true"
    />
  )
}
