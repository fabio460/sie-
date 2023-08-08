"use client"
import db from '@/app/firebaseConfig'
import { selectedType } from '@/types'
import { collection, onSnapshot, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

export default function ListaFirebase() {
  const [lista, setLista] = useState<selectedType[]>([])
  useEffect(()=>{
    var ind = 0;
    const q = query(collection(db, "aposta"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listAux:any = [];
      querySnapshot.forEach((doc) => {
        listAux.push({
            id:doc.id,
            MC:doc.data().MC,
            ODI:doc.data().ODI,
            aposta:doc.data().aposta
          });
      });
      setLista(listAux)
    });
    return ()=> {      
      unsubscribe()
    }
  },[])
  return (
    <div>
    {
      lista.map((item, key)=>{
        return <div key={key}>
          <span>{item.MC}</span>
          <span> - {item.ODI}</span>
          <span> - {item.aposta}</span>
        </div>
      })
    }
  </div>
  )
}
