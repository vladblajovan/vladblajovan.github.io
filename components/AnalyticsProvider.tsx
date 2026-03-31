'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { getConsent } from '@/app/lib/analytics'
import ConsentBanner from './ConsentBanner'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function AnalyticsProvider() {
  const [loadGA, setLoadGA] = useState(false)
  const pathname = usePathname()
  const gaInitialized = useRef(false)

  useEffect(() => {
    if (getConsent() === 'granted') {
      setLoadGA(true)
    }
  }, [])

  useEffect(() => {
    if (!loadGA || !GA_ID || gaInitialized.current) return
    gaInitialized.current = true

    const inline = document.createElement('script')
    inline.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    `
    document.head.appendChild(inline)

    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    script.async = true
    document.head.appendChild(script)
  }, [loadGA])

  useEffect(() => {
    if (loadGA && window.gtag && GA_ID) {
      window.gtag('config', GA_ID, { page_path: pathname })
    }
  }, [pathname, loadGA])

  const handleConsent = useCallback((granted: boolean) => {
    if (granted) {
      setLoadGA(true)
    }
  }, [])

  return <ConsentBanner onConsent={handleConsent} />
}
