"use client"
import React,{useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import "./tabela.css"
import { selectedType } from '@/types';
import { useAppDispatch } from '../../../../redux/hooksRedux';
import { setApostas } from '../../../../redux/reducers/apostasReducer';


function createData(
  id:string,
  hora:string,
  casa: string,
  fora: string,
  odiCasa:number,
  odiFora:number,
) {
  return {id ,hora ,casa, fora, odiCasa, odiFora };
}

const rows = [
  createData("id1","1°",'Gordão Zn', "Adrien", 3.36, 4.00),
  createData("id2","1°",'mC TESTE', "MC murilo", 1.25, 1.80),
  createData("id3","1°",'mC Spike', "MC Devilzinha", 1.25, 2.26),
  createData("id4","1°",'mC Neo Bxd', "MC Zed", 1.25, 2.27),
  createData("id5","1°",'mC Alê ', "MC Braga bxd", 1.25, 2.23),
  createData("id6","1°",'mC Phl', "MC Mr Pac", 1.25, 3.29),
];

export default function BasicTable() {
  const [selected, setSelected] = useState<selectedType[]>([])

  const handleClick = (e:any, data:selectedType, option:string)=>{
    let existe = selected.find(s=>{
      if (s.option === option) {
        return true
      }
    })
    if (existe) {
      let aux:selectedType[]=[]
      aux = selected.filter(s=>{
        if (s.option !== existe?.option) {
          return s
        }
      })
      setSelected(aux)
    }else{
      const aux = selected.filter(s=>{
        if (s.id !== data.id) {
          return s
        }
      })
      setSelected([...aux,data])
    }
    const cardSelected = e.target.parentElement
    if (cardSelected.className.includes("cardActive")) {
      cardSelected.classList.remove("cardActive")
    }else{
      const cardsArray = document.querySelectorAll(".card"+data.id)
      cardsArray.forEach(card=>{
        card.classList.remove("cardActive")
      })
      cardSelected.classList.add("cardActive")
    }   
  }

  const dispatch = useAppDispatch()
  dispatch(setApostas(selected))
  return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600, maxWidth:800 }} aria-label="simple table">
          <TableHead sx={{overflowX:"scroll"}}>
            <TableRow>
              <TableCell>Fase</TableCell>
              <TableCell align="left">Duelos</TableCell>
              <TableCell align="center">Quartas de final</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.casa}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell >
                    {row.hora}
                </TableCell>
                <TableCell align="left">
                  <div>{row.casa}</div>
                  <div>{row.fora}</div>
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  <div className='resultadoItem'>
                    <div key={row.id+"casa"} id={row.id+"casa"}  className={`card card${row.id}`}  onClick={e=> handleClick(e, {
                      id:row.id,
                      option:row.id+"casa",
                      hora:row.hora,
                      casa: row.casa,
                      fora: row.fora,
                      odiCasa:row.odiFora,
                      odiFora:row.odiFora,
                      select:true,
                      vencedor:row.casa,
                      odiVencedor:row.odiCasa
                    }, row.id+"casa")} >
                      <div>{row.odiCasa.toFixed(2)}</div>
                      <div>{row.casa}</div>
                    </div>
                    {/* <div key={row.id+"empate"} id={row.id+"empate"}  className={`card card${row.id}`} onClick={e=> handleClick(e, {
                      id:row.id,
                      option:row.id+"empate",
                      hora:row.hora,
                      casa: row.casa,
                      fora: row.fora,
                      odiCasa:row.odiFora,
                      odiFora:row.odiFora,
                      odiEmpate:row.odiEmpate,
                      select:true,
                      vencedor:"empate",
                      odiVencedor:row.odiEmpate

                    }, row.id+"empate")}>
                      
                    </div> */}
                      <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>x</div>
                    <div key={row.id+"fora"} id={row.id+"fora"}  className={`card card${row.id}`} onClick={e=> handleClick(e, {
                      id:row.id,
                      option:row.id+"fora",
                      hora:row.hora,
                      casa: row.casa,
                      fora: row.fora,
                      odiCasa:row.odiFora,
                      odiFora:row.odiFora,
                      select:true,
                      vencedor:row.fora,
                      odiVencedor:row.odiFora

                    }, row.id+"fora")}>
                      <div>{row.odiFora.toFixed(2)}</div>
                      <div>{row.fora}</div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
