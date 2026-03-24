import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()
  const siteUrl = 'https://vladblajovan.github.io'

  const articleRoutes = articles.map((article) => ({
    url: `${siteUrl}/articles/${article.slug}/`,
    lastModified: new Date(article.date),
  }))

  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/articles/`, lastModified: new Date() },
    { url: `${siteUrl}/resume/`, lastModified: new Date() },
    ...articleRoutes,
  ]
}
