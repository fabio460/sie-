import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from './components/AuthProvider'
import { Providers } from '../../redux/providers'
import AppBar from './components/appBar'
import Footer from './components/footer'
import ListaFirebase from './components/listaFirebase'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <AuthProvider>
        <html lang="en">
          <body className={inter.className}>
            <AppBar/>
            <div className="bodyAll">
               {children}
            </div>
            <Footer/>
          </body>
        </html>
      </AuthProvider>
    </Providers>
  )
}
