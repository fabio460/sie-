"use client"
import { useSession, signIn, signOut } from "next-auth/react"
export default function BtnLogin() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <span>  {session?.user?.name} </span>
        <button onClick={() => signOut()}>Sair</button>
      </>
    )
  }
  return (
    <>
      <button onClick={() => signIn()}>Entrar</button>
    </>
  )
}