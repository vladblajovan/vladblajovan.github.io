import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnalyticsProvider from '@/components/AnalyticsProvider'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: {
    default: 'Vlad Blajovan',
    template: '%s - Vlad Blajovan',
  },
  description: 'iOS developer building privacy-first apps.',
  alternates: {
    types: {
      'application/rss+xml': [
        { url: '/rss.xml', title: 'All Articles' },
      ],
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${geist.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.jpeg" type="image/jpeg" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="bg-white text-zinc-900 antialiased dark:bg-black dark:text-white font-sans">
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <AnalyticsProvider />
        </ThemeProvider>
      </body>
    </html>
  )
}
