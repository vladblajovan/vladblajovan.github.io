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
        <h1 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">Articles</h1>

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
