'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'
import { trackEvent } from '@/app/lib/analytics'

const FEED_URL = 'https://vladblajovan.github.io/rss.xml'

interface Props {
  articles: ArticleMeta[]
}

export default function FeedClient({ articles }: Props) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(FEED_URL).then(() => {
      setCopied(true)
      trackEvent({ action: 'copy_feed_url', category: 'engagement' })
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <main className="mx-auto max-w-2xl px-6 pt-32 pb-24">
      <section className="fade-in">
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 0 0-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </div>
          <h1 className="mb-2 text-xl font-semibold">Subscribe to this RSS feed</h1>
          <p className="mb-5 text-sm text-zinc-500 dark:text-zinc-400">
            Copy the URL below into your RSS reader to get notified when new articles are published.
          </p>

          <div className="mb-5 space-y-2">
            {['Copy the feed URL below', 'Open your RSS reader and add a new subscription', 'Paste the URL and confirm'].map((text, i) => (
              <div key={i} className="flex items-baseline gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                <span className="inline-flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  {i + 1}
                </span>
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              readOnly
              value={FEED_URL}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 pr-11 font-mono text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400"
            />
            <button
              onClick={handleCopy}
              title="Copy URL"
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              {copied ? (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75m11.25-1.5h-9.75a1.125 1.125 0 0 0-1.125 1.125v12.75c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V6.375c0-.621-.504-1.125-1.125-1.125Z" />
                </svg>
              )}
            </button>
          </div>

          <p className="mt-4 text-[13px] text-zinc-400 dark:text-zinc-500">
            Popular readers:{' '}
            <a href="https://feedly.com" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent({ action: 'rss_click', category: 'engagement', label: 'feedly' })} className="underline underline-offset-2 transition hover:text-zinc-900 dark:hover:text-white">Feedly</a>,{' '}
            <a href="https://netnewswire.com" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent({ action: 'rss_click', category: 'engagement', label: 'netnewswire' })} className="underline underline-offset-2 transition hover:text-zinc-900 dark:hover:text-white">NetNewsWire</a>,{' '}
            <a href="https://newsblur.com" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent({ action: 'rss_click', category: 'engagement', label: 'newsblur' })} className="underline underline-offset-2 transition hover:text-zinc-900 dark:hover:text-white">NewsBlur</a>,{' '}
            <a href="https://www.inoreader.com" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent({ action: 'rss_click', category: 'engagement', label: 'inoreader' })} className="underline underline-offset-2 transition hover:text-zinc-900 dark:hover:text-white">Inoreader</a>
          </p>
        </div>

        <h2 className="mt-12 mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">Recent articles</h2>
        <div className="flex flex-col gap-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group rounded-xl border border-zinc-200 p-6 transition hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
            >
              <h3 className="mb-2 text-base font-semibold leading-snug group-hover:underline group-hover:underline-offset-2">
                {article.title}
              </h3>
              <p className="mb-3 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
                {article.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                <time>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-[11px] text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <Link href="/articles" className="mt-12 inline-flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-zinc-900 dark:hover:text-white">
          &larr; Back to articles
        </Link>
      </section>
    </main>
  )
}
