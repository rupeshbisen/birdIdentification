import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import GlobalState from '@/context'
import '@fortawesome/fontawesome-free/css/all.min.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BIRD SPECIES IDENTIFICATION',
  description: 'AUTOMATED BIRD SPECIES IDENTIFICATION',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
          <Navbar />
          <main className='flex flex-col h-screen'>{children}</main>
        </GlobalState>
      </body>
    </html>
  )
}
