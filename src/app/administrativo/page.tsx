"use client"
import React,{useState, useEffect} from 'react'
import {doc, setDoc, collection, query, where, onSnapshot, getDocs, QueryDocumentSnapshot, DocumentData } from "firebase/firestore"; 
import db from '../firebaseConfig';
import { Button, TextField } from '@mui/material';
import "./administrativo.css"
import { geraHash } from '@/metodosImportantes';
import { selectedType } from '@/types';
import { getHash } from 'next/dist/server/image-optimizer';
export default function Administrativo() {
  const [MC, setMc] = useState<string>()
  const [ODI, setOdi] = useState<string>()
  const [aposta, setAposta] = useState<number>()
  const [lista, setLista] = useState<selectedType[]>([])
  const data = db
  async function setData() {
    await setDoc(doc(db, "aposta", geraHash().toString()), {
      MC,
      ODI:parseFloat(ODI as string),
      aposta
    });
    window.location.reload()
  }


  return (
    <div>
      <div content='div' className='formularioAdm'>
        <h1>Formulario</h1>
        <input placeholder="MC"  style={{width:"100%", marginBottom:"10px"}} onChange={e=>setMc(e.target.value)}/>
        <input placeholder="Odi" style={{width:"100%", marginBottom:"10px"}} onChange={e=>setOdi(e.target.value)}/>
        <input placeholder="Aposta"  style={{width:"100%", marginBottom:"10px"}} onChange={e=>setAposta(parseFloat(e.target.value))}/>
        <Button 
           variant="contained"
           onClick={()=>setData()}
           className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"   
        >Inserir</Button>
      </div>

     
    </div>
  )
}
