import { getAllArticles } from '@/lib/articles'
import { SocialPills, ContactPills, AppCard, ArticleLink, ViewAllArticles } from './HomeComponents'

export default function Home() {
  const latestArticles = getAllArticles().slice(0, 3)

  return (
    <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
      {/* Hero */}
      <section className="mb-24 fade-in relative">
        <div className="pointer-events-none absolute -top-16 -left-24 h-64 w-64 rounded-full bg-gradient-to-br from-zinc-200/40 to-transparent blur-3xl dark:from-zinc-800/30" aria-hidden="true" />
        <p className="relative max-w-xl text-lg text-zinc-600 leading-relaxed dark:text-zinc-400">
          I&apos;m Vlad, crafting software with a focus on building products that are genuinely useful, beautifully designed, and improve your life.
        </p>
        <SocialPills />
      </section>

      {/* Apps */}
      <section id="apps" className="mb-24 fade-in scroll-mt-24">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">Apps</h2>
        <p className="mb-8 text-sm text-zinc-400 dark:text-zinc-500">Indie apps crafted with care, from idea to App Store.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AppCard
            name="Ritualist"
            description="A habit tracker that respects your privacy. AI-powered insights, location-based reminders, and detailed analytics — without the social pressure."
            icon="/brand-icon.png"
            gradient="from-[#0A95C2] to-[#0556A6]"
            platforms={['iPhone', 'iPad']}
            href="https://vladblajovan.github.io/RitualistApp/"
          />
          <AppCard
            name="AppDock"
            description="A better app launcher for macOS. Organize, search, and switch between your apps faster than Spotlight or the Dock."
            icon="/appdock-icon.png"
            gradient="from-[#7C6FE0] to-[#4F46E5]"
            platforms={['macOS']}
            comingSoon
          />
          <AppCard
            name="StickyNotes"
            description="Lightweight sticky notes that float on your desktop. Jot down ideas without leaving what you're working on."
            icon="/stickynotes-icon.png"
            gradient="from-[#FFD60A] to-[#FF9F0A]"
            platforms={['macOS']}
            comingSoon
          />
        </div>
      </section>

      {/* Articles */}
      <section id="articles" className="mb-24 fade-in scroll-mt-24">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-zinc-500">Articles</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => (
            <ArticleLink key={article.slug} article={article} />
          ))}
        </div>
        <ViewAllArticles />
      </section>

      {/* About */}
      <section id="about" className="mb-24 fade-in scroll-mt-24">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">About</h2>
        <div className="max-w-xl space-y-4 text-zinc-600 leading-relaxed dark:text-zinc-400">
          <p>
            From mobile apps to web experiences, I work across the full product surface — crafting interfaces that feel native, systems that perform at scale, and experiences that don&apos;t demand more attention than they deserve.
          </p>
          <p>
            Privacy isn&apos;t a feature I bolt on — it&apos;s a foundation I build from. I believe your data belongs to you, and I design every product around that principle from day one.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="fade-in scroll-mt-24">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">Contact</h2>
        <p className="mb-6 max-w-md text-zinc-600 leading-relaxed dark:text-zinc-400">
          Got a question, a project idea, or just want to say hi? Reach out.
        </p>
        <ContactPills />
      </section>
    </main>
  )
}
