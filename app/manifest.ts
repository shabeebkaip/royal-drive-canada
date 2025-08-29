import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Royal Drive Canada - Premium Used Cars Toronto',
    short_name: 'Royal Drive',
    description: 'Discover quality pre-owned vehicles at Royal Drive Canada, Toronto&apos;s trusted OMVIC licensed dealer.',
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
        src: '/icon.svg',
        sizes: '64x64',
        type: 'image/svg+xml',
      },
    ],
    categories: ['automotive', 'business', 'shopping'],
    lang: 'en-CA',
    dir: 'ltr',
    orientation: 'portrait-primary',
  }
}
