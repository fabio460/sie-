"use client"
import React,{useState} from 'react'
import { useAppSelector } from '../../../../redux/hooksRedux'
import "./aba.css"
import { formatoMonetario } from '@/metodosImportantes'
import { Button } from '@mui/material';
export default function AbaDeApostas() {
  const [valor, setValor] = useState(0)
  const [ODIs, setODIs] = useState(0)
  const apostas = useAppSelector(state=>state.apostasReducer.aposta)
  const odiTotal = apostas.reduce((acc:any, elem:any)=>{
    return acc * elem.odiVencedor
  },1)
  if (Number.isNaN(valor)) {
    setValor(0)
  }
  const apostar =()=>{
    alert("valor do prêmio é "+formatoMonetario(valor*odiTotal)+" (falta implementar)")
  }
  return (
    <div>
      <div>
        {
          apostas.map((elem, key)=>{
            return <div key={key} className='boxAbas'>
              <div>{elem.casa} x {elem.fora}</div>
              <div className='intensAbasBox'>{elem.vencedor} - ({elem.odiVencedor.toFixed(2)})</div>
            </div>
          })
        }
      </div>
      <div className='inputContainerBoxAbas'> 
        <input onChange={e=> setValor(parseFloat(e.target.value))} type='search' className='inputBoxAbas' placeholder='valor'/>
        <div className='valorBoxAbas'>{odiTotal.toFixed(2)}</div>
      </div>
      <div className='boxAbas'>
         <div style={{display:"flex", justifyContent:"space-between"}}>
           <div >Valor a receber</div>
           <div style={{color:"#ed6c02"}}>{formatoMonetario(valor*odiTotal)}</div>
         </div>
      </div>
      <div>
          <button
            onClick={apostar}
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Apostar
          </button>
      </div>
        
    </div>
  )
}
