'use client'

import { createContext, useContext, useEffect, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>({
  theme: 'light',
  toggleTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

function subscribe(cb: () => void) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener('change', cb)
  window.addEventListener('storage', cb)
  window.addEventListener('theme-change', cb)
  return () => {
    mq.removeEventListener('change', cb)
    window.removeEventListener('storage', cb)
    window.removeEventListener('theme-change', cb)
  }
}

function getSnapshot(): Theme {
  const stored = localStorage.getItem('theme') as Theme | null
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getServerSnapshot(): Theme {
  return 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // The inline script in app/layout.tsx applies the dark class on first paint
  // so React must not drive the class from `theme` (it would briefly flip
  // the class to the server-snapshot value during hydration). Instead, only
  // react to live system-preference changes when no user override is stored.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => {
      if (!localStorage.getItem('theme')) {
        document.documentElement.classList.toggle('dark', mq.matches)
      }
    }
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    window.dispatchEvent(new Event('theme-change'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
