import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const SITE_URL = 'https://vladblajovan.github.io'
const articlesDir = path.join(process.cwd(), 'content', 'articles')
const publicDir = path.join(process.cwd(), 'public')

function getAllArticles() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'))
  const articles = files.map(filename => {
    const slug = filename.replace(/\.mdx$/, '')
    const content = fs.readFileSync(path.join(articlesDir, filename), 'utf8')
    const { data } = matter(content)
    return { slug, ...data }
  })
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function generateFeed(articles, title, description, feedPath) {
  const items = articles.map(a => `    <item>
      <title><![CDATA[${a.title}]]></title>
      <description><![CDATA[${a.description}]]></description>
      <link>${SITE_URL}/articles/${a.slug}/</link>
      <guid isPermaLink="true">${SITE_URL}/articles/${a.slug}/</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      ${(a.tags || []).map(t => `<category>${t}</category>`).join('\n      ')}
    </item>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/rss.xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
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
