import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PhotoResize - Free Online Image Editor | Resize, Crop, Edit Photos",
  description: "Free online photo editor to resize images, crop photos, remove backgrounds, convert JPG to PNG, edit pictures. No download required. Support JPG, PNG, GIF, WebP, BMP formats.",
  keywords: [
    "photo resize", "image resize", "resize photo online", "crop image", "photo editor",
    "image editor", "resize jpg", "resize png", "convert jpg to png", "png to jpg",
    "remove background", "background remover", "photo crop", "image crop",
    "online photo editor", "free image editor", "picture resize", "photo resizer",
    "image resizer", "compress image", "reduce image size", "photo filter",
    "image filter", "rotate image", "flip image", "brightness contrast",
    "saturation hue", "blur image", "sharpen image", "photo effects",
    "image effects", "webp converter", "gif editor", "bmp converter",
    "photo editing tools", "image editing software", "online image tools",
    "free photo tools", "picture editor", "image optimizer", "photo compressor"
  ].join(", "),
  authors: [{ name: "PhotoResize Team" }],
  creator: "PhotoResize",
  publisher: "PhotoResize",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://photoresize.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "PhotoResize - Free Online Image Editor | Resize, Crop, Edit Photos",
    description: "Free online photo editor to resize images, crop photos, remove backgrounds, convert formats. Support JPG, PNG, GIF, WebP, BMP. No download required.",
    url: 'https://photoresize.com',
    siteName: 'PhotoResize',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PhotoResize - Free Online Image Editor',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "PhotoResize - Free Online Image Editor",
    description: "Free online photo editor to resize images, crop photos, remove backgrounds, convert formats. No download required.",
    images: ['/twitter-image.jpg'],
    creator: '@photoresize',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Image Editing Software',
  generator: 'PhotoResize v1.0'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://photoresize.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "PhotoResize",
              "description": "Free online image editor to resize photos, crop images, remove backgrounds, and convert between formats like JPG, PNG, WebP, GIF, BMP",
              "url": "https://photoresize.com",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Resize images online",
                "Crop photos",
                "Remove background",
                "Convert image formats",
                "Apply filters and effects",
                "Rotate and flip images",
                "Adjust brightness and contrast",
                "Compress images"
              ],
              "screenshot": "https://photoresize.com/screenshot.jpg",
              "softwareVersion": "1.0",
              "author": {
                "@type": "Organization",
                "name": "PhotoResize Team"
              },
              "publisher": {
                "@type": "Organization",
                "name": "PhotoResize",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://photoresize.com/logo.png"
                }
              }
            })
          }}
        />
        
        {/* FAQ Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How to resize an image online for free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Upload your image to PhotoResize, enter new dimensions, and download the resized image. Supports JPG, PNG, GIF, WebP, and BMP formats."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I remove background from photos online?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, PhotoResize offers free background removal tool that automatically detects and removes backgrounds from your photos."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What image formats are supported?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "PhotoResize supports JPG, JPEG, PNG, GIF, WebP, and BMP image formats for both input and output."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
