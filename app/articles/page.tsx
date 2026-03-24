import { getAllArticles, getAllTags } from '@/lib/articles'
import ArticlesClient from './ArticlesClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Articles by Vlad Blajovan.',
}

export default function ArticlesPage() {
  const articles = getAllArticles()
  const tags = getAllTags()

  return <ArticlesClient articles={articles} tags={tags} />
}
