import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const SITE_URL = 'https://vladblajovan.github.io'
const articlesDir = path.join(process.cwd(), 'content', 'articles')
const publicDir = path.join(process.cwd(), 'public')

function getAllArticles() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'))
  const articles = files.map(filename => {
    const slug = filename.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(articlesDir, filename), 'utf8')
    const { data, content } = matter(raw)
    // Strip JSX/import lines that marked can't handle
    const markdown = content
      .replace(/^import\s.+$/gm, '')
      .replace(/<[A-Z]\w+[^>]*\/>/g, '')
      .replace(/<[A-Z]\w+[^>]*>[\s\S]*?<\/[A-Z]\w+>/g, '')
      .trim()
    const html = marked.parse(markdown)
      // Escape any ]]> inside content to avoid breaking CDATA
      .replace(/\]\]>/g, ']]&gt;')
    return { slug, html, ...data }
  })
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function generateFeed(articles, title, description, feedPath) {
  const items = articles.map(a => `    <item>
      <title><![CDATA[${a.title}]]></title>
      <description><![CDATA[${a.description}]]></description>
      <content:encoded><![CDATA[${a.html}]]></content:encoded>
      <link>${SITE_URL}/articles/${a.slug}/</link>
      <guid isPermaLink="true">${SITE_URL}/articles/${a.slug}/</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      ${(a.tags || []).map(t => `<category>${t}</category>`).join('\n      ')}
    </item>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${title}</title>
    <description>${description}</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}${feedPath}" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`
}

const articles = getAllArticles()

// Global feed
fs.writeFileSync(path.join(publicDir, 'rss.xml'), generateFeed(
  articles,
  'Vlad Blajovan - Articles',
  'Articles by Vlad Blajovan on software engineering, mobile development, and AI.',
  '/rss.xml'
))
console.log('Generated /rss.xml')

// Per-tag feeds
const tags = new Set()
articles.forEach(a => (a.tags || []).forEach(t => tags.add(t)))

const rssDir = path.join(publicDir, 'rss')
if (!fs.existsSync(rssDir)) fs.mkdirSync(rssDir)

for (const tag of tags) {
  const slug = tag.toLowerCase().replace(/\s+/g, '-')
  const filtered = articles.filter(a => (a.tags || []).includes(tag))
  fs.writeFileSync(path.join(rssDir, `${slug}.xml`), generateFeed(
    filtered,
    `Vlad Blajovan - ${tag} Articles`,
    `Articles tagged "${tag}" by Vlad Blajovan.`,
    `/rss/${slug}.xml`
  ))
  console.log(`Generated /rss/${slug}.xml`)
}
