/* eslint-disable camelcase */
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import ReactQueryProvider from './ReactQueryProvider'
import AuthProvider from './auth-provider'

const nunitoSans = Nunito({
  weight: ['400', '700'],
  variable: '--font-nunito',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Bookwise',
  description: 'Bookwise',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunitoSans.variable} bg-gray-800 antialiased`}>
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
