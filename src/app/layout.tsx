import type { Metadata } from 'next'
import { IBM_Plex_Sans, Poppins } from 'next/font/google'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { CartProvider } from '@/lib/cart/CartProvider'
import { QueryProvider } from '@/lib/query/QueryProvider'
import './globals.scss'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const description =
  'Marketplace de artefatos NFT cunhados on-chain. Explore, ordene e monte a sua mochila.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Starsoft — Marketplace de NFTs',
    template: '%s · Starsoft',
  },
  description,
  applicationName: 'Starsoft',
  keywords: ['NFT', 'marketplace', 'ETH', 'Starsoft', 'coleção', 'on-chain'],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Starsoft',
    url: siteUrl,
    title: 'Starsoft — Marketplace de NFTs',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starsoft — Marketplace de NFTs',
    description,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} ${ibmPlexSans.variable}`}
    >
      <body>
        <QueryProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
