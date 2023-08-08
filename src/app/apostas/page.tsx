import React from 'react'
import AppBar from '../components/appBar'
import TabelaSimples from '../components/tabelaSimples'
import AbaDeApostas from '../components/abaDeApostas'
import "./apostas.css"
import ListaFirebase from '../components/listaFirebase'
export default function Apostas() {
  return (
    <div className='apostasBody'>
      <div>
        <TabelaSimples/>
      </div>
      
      <div className='abaDeApostasContainer'>
       <AbaDeApostas/>
      </div>
      <div className='abaDeApostasContainerMobile'>
         <AbaDeApostas/>
      </div>
    </div>
  )
}
