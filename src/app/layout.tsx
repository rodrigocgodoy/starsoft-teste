import type { Metadata } from 'next'
import { IBM_Plex_Sans, Poppins } from 'next/font/google'
import { CartDrawer } from '@/components/cart/CartDrawer'
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

export const metadata: Metadata = {
  title: 'Front-end Challenge',
  description: 'Starsoft front-end challenge',
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
            <CartDrawer />
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
