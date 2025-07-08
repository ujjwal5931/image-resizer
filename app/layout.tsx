import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Image Resizer - Resize Images Online',
  description: 'Free online image resizer. Resize JPG, PNG, and WebP images to any size with high quality.',
  keywords: 'image resizer, resize images, online image editor, jpg resizer, png resizer, webp resizer',
  authors: [{ name: 'Image Resizer' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Image Resizer - Resize Images Online',
    description: 'Free online image resizer. Resize JPG, PNG, and WebP images to any size with high quality.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {children}
      </body>
    </html>
  )
} 