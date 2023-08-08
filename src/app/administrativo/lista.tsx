import { selectedType } from '@/types';
import { collection, onSnapshot, query } from 'firebase/firestore';
import React from 'react'
import db from '../firebaseConfig';

export default async function Lista() {
    let lista:selectedType[] = []
    async function getList() {    
    }
    const q = query(collection(db, "aposta"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
          lista.push({
            id:doc.id,
            MC:doc.data().MC,
            ODI:doc.data().ODI,
            aposta:doc.data().aposta
          });
      });
    });
    console.log({lista,unsubscribe})
  return (
    <div>
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
    </div>
  )
}
