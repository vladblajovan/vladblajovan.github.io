import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume of Vlad Blajovan.',
}

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
      <section className="fade-in">
        <h1 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">Resume</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Coming soon.</p>
      </section>
    </main>
  )
}
