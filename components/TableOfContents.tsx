'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.article-body h2'))
    const items = els
      .filter((el): el is HTMLElement => el instanceof HTMLElement)
      .map((el) => {
        if (!el.id) {
          el.id = el.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') || ''
        }
        return { id: el.id, text: el.textContent || '' }
      })
    setHeadings(items)

    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -75% 0px', threshold: 0 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-28 pr-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
          Contents
        </h4>
        <ul className="space-y-2 text-sm border-l border-zinc-200 dark:border-zinc-800">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block pl-4 -ml-px border-l py-0.5 transition ${
                  activeId === h.id
                    ? 'border-zinc-900 text-zinc-900 font-medium dark:border-white dark:text-white'
                    : 'border-transparent text-zinc-500 hover:text-zinc-900 hover:border-zinc-400 dark:text-zinc-400 dark:hover:text-white dark:hover:border-zinc-500'
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
