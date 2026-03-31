'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from './ThemeProvider'
import { usePathname } from 'next/navigation'
import { trackEvent } from '@/app/lib/analytics'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()

  const isHome = pathname === '/'
  const isArticles = pathname.startsWith('/articles')
  const isResume = pathname === '/resume' || pathname === '/resume/'

  const navLinks = isHome
    ? [
        { href: '#apps', label: 'Apps' },
        { href: '/articles', label: 'Articles', active: false },
        { href: '/resume', label: 'Resume', active: false },
        { href: '#about', label: 'About' },
        { href: '#contact', label: 'Contact' },
      ]
    : [
        { href: '/', label: 'Home', active: false },
        { href: '/#apps', label: 'Apps', active: false },
        { href: '/articles', label: 'Articles', active: isArticles },
        { href: '/resume', label: 'Resume', active: isResume },
        { href: '/#about', label: 'About', active: false },
        { href: '/#contact', label: 'Contact', active: false },
      ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200/60 bg-white/80 backdrop-blur-md dark:border-zinc-800/60 dark:bg-black/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-5xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white no-underline">
          Hi.
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <a href="https://www.buymeacoffee.com/vladblajovan" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent({ action: 'outbound_click', category: 'engagement', label: 'buymeacoffee' })}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{ height: '28px' }} loading="lazy" />
          </a>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => { setMenuOpen(false); trackEvent({ action: 'nav_click', category: 'navigation', label: link.label.toLowerCase() }); }}
              className={`text-sm font-medium transition ${
                link.active
                  ? 'text-zinc-900 dark:text-white'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { toggleTheme(); trackEvent({ action: 'theme_toggle', category: 'engagement', label: theme === 'dark' ? 'light' : 'dark' }); }}
            aria-label="Toggle theme"
            className="flex items-center justify-center rounded-full border border-zinc-300 p-1.5 text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-white"
          >
            {theme === 'dark' ? (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
            {menuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-black menu-open">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <a href="https://www.buymeacoffee.com/vladblajovan" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent({ action: 'outbound_click', category: 'engagement', label: 'buymeacoffee' })}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{ height: '32px' }} loading="lazy" />
            </a>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => { setMenuOpen(false); trackEvent({ action: 'nav_click', category: 'navigation', label: link.label.toLowerCase() }); }}
                className={`text-base font-medium transition ${
                  link.active
                    ? 'text-zinc-900 dark:text-white'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { toggleTheme(); trackEvent({ action: 'theme_toggle', category: 'engagement', label: theme === 'dark' ? 'light' : 'dark' }); }}
              className="text-left text-base font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
