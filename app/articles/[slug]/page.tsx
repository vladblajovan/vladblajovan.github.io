import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import ProgressBar from '@/components/ProgressBar'
import TableOfContents from '@/components/TableOfContents'
import ScrollToTop from '@/components/ScrollToTop'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { meta } = getArticleBySlug(slug)
  return {
    title: meta.title,
    description: meta.description,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const { meta, content } = getArticleBySlug(slug)

  return (
    <>
      <ProgressBar />
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-24">
        <div className="fade-in">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white mb-8"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
            </svg>
            Back to Articles
          </Link>

          <div className="relative lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
            <TableOfContents />

            <div className="max-w-3xl">
              <header className="mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-4 text-zinc-900 dark:text-white">
                  {meta.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                  <span>Vlad Blajovan</span>
                  <span className="text-zinc-300 dark:text-zinc-700">&middot;</span>
                  <time dateTime={meta.date}>
                    {new Date(meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                  <span className="text-zinc-300 dark:text-zinc-700">&middot;</span>
                  <span>~{meta.readTime} read</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {meta.tags.map((tag) => (
                    <span key={tag} className="inline-block rounded-full bg-zinc-100 px-3 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </header>

              <article className="article-body text-zinc-700 dark:text-zinc-300">
                <MDXRemote
                  source={content}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                    },
                  }}
                />
              </article>
            </div>
          </div>
        </div>
      </main>
      <ScrollToTop />
    </>
  )
}
