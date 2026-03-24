import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDirectory = path.join(process.cwd(), 'content', 'articles')

export interface ArticleMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readTime: string
}

export function getAllArticles(): ArticleMeta[] {
  const files = fs.readdirSync(articlesDirectory).filter(f => f.endsWith('.mdx'))

  const articles = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const filePath = path.join(articlesDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      readTime: data.readTime || '5 min',
    }
  })

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(slug: string) {
  const filePath = path.join(articlesDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    meta: {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      readTime: data.readTime || '5 min',
    } as ArticleMeta,
    content,
  }
}

export function getArticlesByTag(tag: string): ArticleMeta[] {
  return getAllArticles().filter((article) =>
    article.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllTags(): string[] {
  const articles = getAllArticles()
  const tagSet = new Set<string>()
  articles.forEach((article) => article.tags.forEach((tag) => tagSet.add(tag)))
  return Array.from(tagSet).sort()
}
