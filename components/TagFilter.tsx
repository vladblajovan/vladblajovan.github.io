'use client'

import { trackEvent } from '@/app/lib/analytics'

interface TagFilterProps {
  tags: string[]
  activeTag: string
  onTagChange: (tag: string) => void
}

export default function TagFilter({ tags, activeTag, onTagChange }: TagFilterProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <button
        onClick={() => { onTagChange('all'); trackEvent({ action: 'tag_filter', category: 'content', label: 'all' }); }}
        className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
          activeTag === 'all'
            ? 'border-zinc-300 bg-zinc-900 text-white dark:border-zinc-600 dark:bg-white dark:text-black'
            : 'border-zinc-200 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-white'
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => { onTagChange(tag); trackEvent({ action: 'tag_filter', category: 'content', label: tag }); }}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
            activeTag === tag
              ? 'border-zinc-300 bg-zinc-900 text-white dark:border-zinc-600 dark:bg-white dark:text-black'
              : 'border-zinc-200 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-white'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
