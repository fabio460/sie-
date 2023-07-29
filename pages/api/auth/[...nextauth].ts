import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { loginApi } from "@/api/usuariosApi";


export default NextAuth({
    providers: [
 
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const user = await loginApi(credentials?.username as string, credentials?.password as string)
          const usuario = {
            email:user.auth.email,
            name:user.auth.nome,
            id:user.auth.id,
            image:user.auth.id
          }
          if (user.token) {
            return usuario
          } else {
            return null
          }
        },
        
      })
    ],
    pages:{
      signIn:"/login"
    },
})
