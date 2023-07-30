"use client"
import { useSession, signIn, signOut } from "next-auth/react"
export default function BtnLogin() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <span style={{marginRight:"10px"}}>  {session?.user?.name} </span>
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