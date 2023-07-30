"use client"
import { loginApi } from '@/api/usuariosApi'
import {signIn} from 'next-auth/react'
import { useState } from 'react'
import BtnLogin from '../components/btnLogin'
import CarregandoBtn from '../components/carregandoBtn'
export default function Login() {
  const [email, setemail] = useState<string>()
  const [password, setpassword] = useState<string>()
  const [error, seterror] = useState(false)
  const [loading, setloading] = useState(false)
    const login = async()=>{
      alert("Ação de relembrar senha, falta implementar")
    }
    function loginKeyUp(e:any) {
      if (e.code === "Enter") {
        login()
      }
    }
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Esqueceu sua senha?
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6" >
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    onKeyUp={e=> loginKeyUp(e)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e)=>setemail(e.target.value as string)}
                    className={`block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${error && 'border-2 border-rose-600'} `}
                  />
                </div>
              </div>
  
              <div>
                <button
                  onClick={login}
                  onKeyUp={e=> loginKeyUp(e)}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {
                    loading ? <CarregandoBtn/>:<span>Enviar</span>
                  }
                </button>
              </div>
            </div>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              <a href="/cadastro" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                cadastre-se
              </a>
              {' '} ou {' '}
              <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                volte ao login
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  