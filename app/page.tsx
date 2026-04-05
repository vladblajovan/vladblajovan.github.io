import Link from 'next/link'
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

function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'mail':
      return <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
    case 'github':
      return <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
    case 'linkedin':
      return <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    case 'threads':
      return <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.19.408-2.285 1.33-3.082.88-.762 2.084-1.2 3.583-1.291.89-.055 1.738.009 2.544.137-.142-.752-.44-1.337-.897-1.744-.588-.525-1.449-.8-2.56-.816l-.008-.002c-.869.002-1.979.2-2.71.85l-1.39-1.494C8.455 5.154 9.882 4.7 11.467 4.68c1.584.018 2.873.467 3.833 1.334.911.825 1.484 1.98 1.707 3.434.83.174 1.585.454 2.244.844 1.168.69 2.044 1.708 2.536 2.937.81 2.012.76 4.723-1.345 6.79-1.834 1.8-4.091 2.617-7.299 2.952L12.186 24zm.281-8.985c-.678.042-2.756.251-2.864 1.548-.043.516.199.975.681 1.29.572.373 1.36.548 2.221.503 1.07-.058 1.89-.464 2.437-1.146.335-.416.6-.96.783-1.626a10.675 10.675 0 00-3.258-.569z"/></svg>
    case 'instagram':
      return <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
    default:
      return null
  }
}

