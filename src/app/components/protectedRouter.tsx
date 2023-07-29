"use client"
import { useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'
import Loadding from './loadding'
import AcessoNegado from './acessoNegado'

export default function ProtectedRouter({children}:{children:ReactNode}) {
    const {data, status} = useSession()
    if (status === "loading") {
      return <Loadding/>
    }
    if (status === "authenticated") {
      return <div>{children}</div>
    }else{
       return <AcessoNegado/>
    }
}
