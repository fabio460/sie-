"use client"
import React,{useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooksRedux'
import "./aba.css"
import { calculoDaOdi, formatoMonetario, handleODI } from '@/metodosImportantes'
import { Button } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore'
import db from '@/app/firebaseConfig'
import { setCheckedReducer } from '../../../../redux/reducers/removeCheckedsReducer'
export default function AbaDeApostas() {
  const [valor, setValor] = useState(0)
  const [ODIs, setODIs] = useState(0)
  const apostas = useAppSelector(state=>state.apostasReducer.aposta)
  const lista = useAppSelector(state=>state.listaDeMCs.lista)
  const dispatch = useAppDispatch()
  const odiTotal = apostas.reduce((acc:number, elem)=>{
    return acc * (elem.ODI as number)
  },1)
  if (Number.isNaN(valor)) {
    setValor(0)
  }
  
  const somaDasApostas = lista.reduce((acc, elem)=>{
    return acc + (elem.aposta as number)
  },0)
  
  const apostar = async()=>{
    apostas.map(async(e)=>{
      //alert("Voce apostou "+formatoMonetario(e.ODI*valor))
      const frankDocRef = doc(db, "aposta", e.id);
      await updateDoc(frankDocRef, {
        "ODI": handleODI(e.aposta as number + valor, e.aposta as number, somaDasApostas as number),
        "aposta": (e.aposta as number) + valor
      });
    })
    setValor(0)
    dispatch(setCheckedReducer(true)) 
    setTimeout(() => {
      dispatch(setCheckedReducer(false)) 
    }, 100);
  }

  
  return (
    <div>
      <div>
        {
          apostas.map((elem, key)=>{
            return <div key={key} className='boxAbas'>
              <div>{elem.MC}</div>
              <div className='intensAbasBox'>{elem.MC} - ({elem.ODI.toFixed(2)})</div>
            </div>
          })
        }
      </div>
      <div className='inputContainerBoxAbas'> 
        <input value={valor} onChange={e=> setValor(parseFloat(e.target.value))} type='text' className='inputBoxAbas' placeholder='valor'/>
        {/* <div className='valorBoxAbas'>{formatoMonetario(valorGanho)}</div> */}
      </div>
      <div className='boxAbas'>
         <div style={{display:"flex", justifyContent:"space-between"}}>
           <div >Valor a receber</div>
           <div style={{color:"#ed6c02"}}>{formatoMonetario(odiTotal*valor)}</div>
         </div>
      </div>
      <div>
          <Button
            variant='contained'
            onClick={apostar}
            type="submit"
            sx={{width:"100%"}}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Apostar
          </Button>
      </div>
        
    </div>
  )
}
