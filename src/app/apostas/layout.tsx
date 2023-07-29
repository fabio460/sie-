import React, { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AppBar from '../components/appBar'
import Footer from '../components/footer'
const inter = Inter({ subsets: ['latin'] })

export default function ApostasLayout({children}:{children:ReactNode}) {
  return (
    <div>
      {children}
    </div>
  )
}
