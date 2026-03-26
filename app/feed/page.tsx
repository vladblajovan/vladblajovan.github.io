import type { Metadata } from 'next'
import FeedClient from './FeedClient'

export const metadata: Metadata = {
  title: 'Subscribe via RSS',
  description: 'Subscribe to Vlad Blajovan\'s articles via RSS.',
}

export default function FeedPage() {
  return <FeedClient />
}
