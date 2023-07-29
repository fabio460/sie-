import React, { ReactNode } from 'react'
import ProtectedRouter from '../components/protectedRouter'
import AppBar from '../components/appBar'
import Footer from '../components/footer'

export default function RootLayout({children}: {children:ReactNode}) {
  return (
    <ProtectedRouter>
      {children}
    </ProtectedRouter>
  )
}
