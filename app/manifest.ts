import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/metadata'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.title,
    short_name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['automotive', 'business', 'shopping'],
    lang: 'en-CA',
    dir: 'ltr',
    orientation: 'portrait-primary',
    scope: '/',
    id: '/',
  }
}
