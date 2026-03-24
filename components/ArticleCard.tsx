import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="article-card group rounded-2xl border border-zinc-200 p-6 transition-all duration-200 hover:border-zinc-400 hover:shadow-lg hover:-translate-y-0.5 dark:border-zinc-800 dark:hover:border-zinc-600 flex flex-col"
    >
      <div className="mb-3 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span key={tag} className="inline-block rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {tag}
          </span>
        ))}
      </div>
      <h2 className="mb-2 text-lg font-semibold leading-snug text-zinc-900 transition group-hover:text-zinc-900 dark:text-white dark:group-hover:text-white">
        {article.title}
      </h2>
      <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">
        {article.description}
      </p>
      <div className="mt-auto flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
        <time dateTime={article.date}>
          {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
        <span>&middot;</span>
        <span>~{article.readTime} read</span>
      </div>
    </Link>
  )
}
