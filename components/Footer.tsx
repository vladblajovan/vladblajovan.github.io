'use client'

import Link from 'next/link'
import { trackEvent, clearConsent } from '@/app/lib/analytics'
import { useTheme } from './ThemeProvider'

export default function Footer() {
  const { theme, toggleTheme } = useTheme()
  return (
    <footer className="border-t border-zinc-200 px-6 py-12 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center sm:items-start gap-4">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6">
              <Link href="/#apps" onClick={() => trackEvent({ action: 'nav_click', category: 'navigation', label: 'apps' })} className="text-sm text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Apps</Link>
              <Link href="/articles" onClick={() => trackEvent({ action: 'nav_click', category: 'navigation', label: 'articles' })} className="text-sm text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Articles</Link>
              <Link href="/resume" onClick={() => trackEvent({ action: 'nav_click', category: 'navigation', label: 'resume' })} className="text-sm text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Resume</Link>
              <Link href="/#about" onClick={() => trackEvent({ action: 'nav_click', category: 'navigation', label: 'about' })} className="text-sm text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">About</Link>
              <Link href="/#contact" onClick={() => trackEvent({ action: 'nav_click', category: 'navigation', label: 'contact' })} className="text-sm text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">Contact</Link>
              <Link href="/feed" onClick={() => trackEvent({ action: 'nav_click', category: 'navigation', label: 'rss' })} className="text-sm text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">RSS</Link>
            </div>
            <a href="https://www.buymeacoffee.com/vladblajovan" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent({ action: 'outbound_click', category: 'engagement', label: 'buymeacoffee' })}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{ height: '32px' }} loading="lazy" />
            </a>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-3">
            <div className="flex items-center gap-4">
              <a href="mailto:vlad.blajovan@outlook.com" aria-label="Email" onClick={() => trackEvent({ action: 'social_click', category: 'engagement', label: 'email' })} className="text-zinc-400 transition hover:text-zinc-900 dark:hover:text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                </svg>
              </a>
              <a href="https://github.com/vladblajovan" target="_blank" rel="noopener noreferrer" aria-label="GitHub" onClick={() => trackEvent({ action: 'social_click', category: 'engagement', label: 'github' })} className="text-zinc-400 transition hover:text-[#333] dark:hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/vlad-blajovan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" onClick={() => trackEvent({ action: 'social_click', category: 'engagement', label: 'linkedin' })} className="text-zinc-400 transition hover:text-[#0A66C2] dark:hover:text-[#0A66C2]">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.threads.com/@vladblajovan" target="_blank" rel="noopener noreferrer" aria-label="Threads" onClick={() => trackEvent({ action: 'social_click', category: 'engagement', label: 'threads' })} className="text-zinc-400 transition hover:text-zinc-900 dark:hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.19.408-2.285 1.33-3.082.88-.762 2.084-1.2 3.583-1.291.89-.055 1.738.009 2.544.137-.142-.752-.44-1.337-.897-1.744-.588-.525-1.449-.8-2.56-.816l-.008-.002c-.869.002-1.979.2-2.71.85l-1.39-1.494C8.455 5.154 9.882 4.7 11.467 4.68c1.584.018 2.873.467 3.833 1.334.911.825 1.484 1.98 1.707 3.434.83.174 1.585.454 2.244.844 1.168.69 2.044 1.708 2.536 2.937.81 2.012.76 4.723-1.345 6.79-1.834 1.8-4.091 2.617-7.299 2.952L12.186 24zm.281-8.985c-.678.042-2.756.251-2.864 1.548-.043.516.199.975.681 1.29.572.373 1.36.548 2.221.503 1.07-.058 1.89-.464 2.437-1.146.335-.416.6-.96.783-1.626a10.675 10.675 0 00-3.258-.569z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/vladblajovan/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" onClick={() => trackEvent({ action: 'social_click', category: 'engagement', label: 'instagram' })} className="text-zinc-400 transition hover:text-[#E4405F] dark:hover:text-[#E4405F]">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://linktr.ee/vlad.blajovan" target="_blank" rel="noopener noreferrer" aria-label="All my links on Linktree" onClick={() => trackEvent({ action: 'social_click', category: 'engagement', label: 'linktree' })} className="text-zinc-400 transition hover:text-[#43E660] dark:hover:text-[#43E660]">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5108 10.6562H18.094L14.1018 14.4319L17 17.337L13.2244 13.5613V21.6041H10.7757V13.5613L7 17.337L9.89823 14.4319L5.90603 10.6562H10.4892L7.58823 7.81989L9.32035 6.08777L12 8.79085L14.6797 6.08777L16.4118 7.81989L13.5108 10.6562ZM10.7757 24V21.6041H13.2244V24H10.7757Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; 2025&ndash;{new Date().getFullYear()} Vlad Blajovan
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { clearConsent(); window.location.reload(); }}
              className="text-xs text-zinc-400 underline underline-offset-2 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              Cookie Settings
            </button>
            <button
              onClick={() => { toggleTheme(); trackEvent({ action: 'theme_toggle', category: 'engagement', label: theme === 'dark' ? 'light' : 'dark' }); }}
              aria-label="Toggle theme"
              className="flex items-center justify-center rounded-full border border-zinc-300 p-1.5 text-zinc-400 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-white"
            >
              {theme === 'dark' ? (
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
                </svg>
              ) : (
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
