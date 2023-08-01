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
  odiEmpate:number
) {
  return {id ,hora ,casa, fora, odiCasa, odiFora, odiEmpate };
}

const rows = [
  createData("id1","3:00",'Gordão Zn', "Adrien", 3.36,1.33, 4.00),
  createData("id2","16:00",'mC TESTE', "MC murilo", 1.25, 2.39, 1.80),
  createData("id3","16:00",'mC Spike', "MC Devilzinha", 1.25, 2.39, 2.26),
  createData("id4","16:00",'mC Neo Bxd', "MC Zed", 1.25, 2.39, 2.27),
  createData("id5","16:00",'mC Alê ', "MC Braga bxd", 1.25, 2.39, 2.23),
  createData("id6","16:00",'mC Phl', "MC Mr Pac", 1.25, 2.39, 3.29),
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

  function calculoDaOdi(total:number,aposta:number) {
    return (total/aposta).toFixed(2)
  }

  console.log(calculoDaOdi(1800, 500))
  const dispatch = useAppDispatch()
  dispatch(setApostas(selected))
  return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600, maxWidth:800 }} aria-label="simple table">
          <TableHead sx={{overflowX:"scroll"}}>
            <TableRow>
              <TableCell>Hora</TableCell>
              <TableCell align="left">Duelos</TableCell>
              <TableCell align="center">Resultado</TableCell>
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
                      odiEmpate:row.odiEmpate,
                      select:true,
                      vencedor:row.casa,
                      odiVencedor:row.odiCasa
                    }, row.id+"casa")} >
                      <div>{row.odiCasa.toFixed(2)}</div>
                      <div>{row.casa}</div>
                    </div>
                    <div key={row.id+"empate"} id={row.id+"empate"}  className={`card card${row.id}`} onClick={e=> handleClick(e, {
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
                      <div>{row.odiEmpate.toFixed(2)}</div>
                      <div>Empate</div>
                    </div>
                    <div key={row.id+"fora"} id={row.id+"fora"}  className={`card card${row.id}`} onClick={e=> handleClick(e, {
                      id:row.id,
                      option:row.id+"fora",
                      hora:row.hora,
                      casa: row.casa,
                      fora: row.fora,
                      odiCasa:row.odiFora,
                      odiFora:row.odiFora,
                      odiEmpate:row.odiEmpate,
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
