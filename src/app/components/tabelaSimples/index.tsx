"use client"
import React,{useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { collection, onSnapshot, query } from 'firebase/firestore'
import "./tabela.css"
import { selectedType } from '@/types';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooksRedux';
import { setApostas } from '../../../../redux/reducers/apostasReducer';
import { Avatar, Checkbox } from '@mui/material';
import { calculoDaOdi, formatoMonetario } from '@/metodosImportantes';
import db from '@/app/firebaseConfig';
import { setListaReducer } from '../../../../redux/reducers/listaDeMCs';

export default function BasicTable() {
  const lista = useAppSelector(state=>state.listaDeMCs.lista)
  const [checked, setChecked] = React.useState<boolean[]>([]);

  useEffect(()=>{
    const q = query(collection(db, "aposta"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listAux:selectedType[] = [];
      querySnapshot.forEach((doc) => {
        listAux.push({
            id:doc.id,
            MC:doc.data().MC,
            ODI:doc.data().ODI,
            aposta:doc.data().aposta
          });
      });
      dispatch(setListaReducer(listAux))
    });
    return ()=> {      
      unsubscribe()
    }
  },[])

  const somaDasApostas = lista.reduce((acc, elem)=>{
    return acc + (elem.aposta as number)
  },0)

  const [selected, setSelected] = useState<selectedType[]>([])
  const handleClick = (check:boolean,data:selectedType)=>{
    if (check) {
      setSelected([...selected,Object.assign(data,{checked:check})])
    }else{
       let aux = selected.filter((item, key)=>{
        if (item.id !== data.id) {
          return item
        }
       })
       setSelected(aux)
    }
  }

  const [chekeds, setchekeds] = useState(false)
  const removerSelect = ()=>{
    setchekeds(true)
    let aux = selected.filter((item, key)=>{
      if (!item.checked) {
        return item
      }
     })
     setSelected(aux)
     setTimeout(() => {  
       setchekeds(false)
     }, 50);
  }

  const dispatch = useAppDispatch()
  const removeChecked = useAppSelector(state=>state.removeCheckedsReducer.checked)
  useEffect(()=>{
    dispatch(setApostas(selected))
  },[selected])
  
  useEffect(()=>{    
    if (removeChecked) {
      removerSelect()
    }
  },[removeChecked])
  
  return (
      <div>
        <div style={{color:"green", marginBottom:"10px"}}>Total de apostas {formatoMonetario(somaDasApostas)}</div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600, maxWidth:800 }} aria-label="simple table">
            <TableHead sx={{overflowX:"scroll"}}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Imagem</TableCell>
                <TableCell>MCs</TableCell>
                <TableCell align="left">ODI</TableCell>
                <TableCell>Total de apostas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chekeds ?
                 lista.map((row) => (
                <TableRow
                  key={row.MC}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    .
                    <Checkbox 
                      className='checkboxs'
                      checked={false}
                      onChange={e=> handleClick(e.target.checked,{
                        id:row.id,
                        MC:row.MC,
                        ODI:row.ODI,
                        aposta:row.aposta,
                        avatar:row.avatar
                      })}
                    />
                  </TableCell>
                  <TableCell><Avatar src={row.avatar}>{row.MC[0]}</Avatar></TableCell>
                  <TableCell >
                      {row.MC}
                  </TableCell>
                  <TableCell>{(row.ODI).toFixed(2)}</TableCell>
                  <TableCell >
                      {formatoMonetario(row.aposta)}
                  </TableCell>
                </TableRow>
              ))
              :
              lista.map((row) => (
                <TableRow
                  key={row.MC}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Checkbox 
                      className='checkboxs'
                      onChange={e=> handleClick(e.target.checked,{
                        id:row.id,
                        MC:row.MC,
                        ODI:row.ODI,
                        aposta:row.aposta,
                        avatar:row.avatar
                      })}
                    />
                  </TableCell>
                  <TableCell><Avatar src={row.avatar}>{row.MC[0]}</Avatar></TableCell>
                  <TableCell >
                      {row.MC}
                  </TableCell>
                  <TableCell>{(row.ODI).toFixed(2)}</TableCell>
                  <TableCell >
                      {formatoMonetario(row.aposta)}
                  </TableCell>
                </TableRow>
              ))
            }


            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}






// <TableCell align="left" component="th" scope="row">
// <div className='resultadoItem'>
//   <div key={row.id+"casa"} id={row.id+"casa"}  className={`card card${row.id}`}  onClick={e=> handleClick(e, {
//     id:row.id,
//     option:row.id+"casa",
//     select:true,
//     odiVencedor:row.ODI
//   }, row.id+"casa")} >
//     <div>{row.ODI.toFixed(2)}</div>
 
//   </div>
//   <div key={row.id+"empate"} id={row.id+"empate"}  className={`card card${row.id}`} onClick={e=> handleClick(e, {
//     id:row.id,
//     option:row.id+"empate",
//     hora:row.hora,
//     casa: row.casa,
//     fora: row.fora,
//     odiCasa:row.odiFora,
//     odiFora:row.odiFora,
//     odiEmpate:row.odiEmpate,
//     select:true,
//     vencedor:"empate",
//     odiVencedor:row.odiEmpate

//   }, row.id+"empate")}>
    
//   </div>
//     <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>x</div>
//   <div key={row.id+"fora"} id={row.id+"fora"}  className={`card card${row.id}`} onClick={e=> handleClick(e, {
//     id:row.id,
//     option:row.id+"fora",
//     hora:row.hora,
//     casa: row.casa,
//     fora: row.fora,
//     odiCasa:row.odiFora,
//     odiFora:row.odiFora,
//     select:true,
//     vencedor:row.fora,
//     odiVencedor:row.odiFora

//   }, row.id+"fora")}>
//     <div>{row.odiFora.toFixed(2)}</div>
//     <div>{row.fora}</div>
//   </div>
// </div>
// </TableCell>