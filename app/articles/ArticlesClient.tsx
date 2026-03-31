'use client'

import { useState } from 'react'
import ArticleCard from '@/components/ArticleCard'
import TagFilter from '@/components/TagFilter'
import type { ArticleMeta } from '@/lib/articles'
import { trackEvent } from '@/app/lib/analytics'

interface Props {
  articles: ArticleMeta[]
  tags: string[]
}

export default function ArticlesClient({ articles, tags }: Props) {
  const [activeTag, setActiveTag] = useState('all')

  const filtered = activeTag === 'all'
    ? articles
    : articles.filter(a => a.tags.includes(activeTag))

  return (
    <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
      <section className="fade-in">
        <div className="mb-6 flex items-center gap-3">
          <h1 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Articles</h1>
          <a
            href="/feed"
            onClick={() => trackEvent({ action: 'rss_click', category: 'engagement', label: 'feed_button' })}
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-white"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 0 0-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            RSS
          </a>
        </div>

        <TagFilter tags={tags} activeTag={activeTag} onTagChange={setActiveTag} />

        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-sm text-zinc-400 dark:text-zinc-500">No articles match this filter.</p>
        )}

        <div className="mt-12">
          <p className="text-sm text-zinc-400 dark:text-zinc-500">Follow me on{' '}
            <a href="https://github.com/vladblajovan" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent({ action: 'social_click', category: 'engagement', label: 'github' })} className="underline transition hover:text-zinc-900 dark:hover:text-white">GitHub</a> or{' '}
            <a href="https://www.linkedin.com/in/vlad-blajovan" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent({ action: 'social_click', category: 'engagement', label: 'linkedin' })} className="underline transition hover:text-zinc-900 dark:hover:text-white">LinkedIn</a>{' '}
            to get notified when new articles drop.
          </p>
        </div>
      </section>
    </main>
  )
}
