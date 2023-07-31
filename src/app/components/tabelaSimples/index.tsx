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

type selectedType={
  id:string,
  option:string,
  hora:string,
  casa: string,
  fora: string,
  odiCasa:number,
  odiFora:number,
  odiEmpate:number,
  select?:boolean
}
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
  createData("id1","3:00",'Mc FABIO', "MC Biel", 3.36,1.3, 2.23),
  createData("id2","16:00",'mC TESTE', "MC murilo", 1.25, 2.39, 2.2),

];

export default function BasicTable() {
  const [selected, setSelected] = useState<selectedType[]>([])
  const handleClick = (e:any, data:selectedType, option:string)=>{
    let existe = selected.find(s=>{
      if (s.option === option) {
        return true
      }
    })
    console.log(data)
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
    
    const cardsArray = document.querySelectorAll(".card"+data.id)
    cardsArray.forEach(card=>{
      card.classList.remove("cardActive")
    })
    const cardSelected = e.target.parentElement
    cardSelected.classList.add("cardActive")
    
  }

  console.log(selected)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
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
                  <Card key={row.id+"casa"} className={`card card${row.id} text-red-50`}  onClick={e=> handleClick(e, {
                    id:row.id,
                    option:row.id+"casa",
                    hora:row.hora,
                    casa: row.casa,
                    fora: row.fora,
                    odiCasa:row.odiFora,
                    odiFora:row.odiFora,
                    odiEmpate:row.odiEmpate,
                    select:true
                  }, row.id+"casa")} >
                    <div>{row.odiCasa}</div>
                    <div>{row.casa}</div>
                  </Card>
                  <Card key={row.id+"empate"} className={`card card${row.id}`} onClick={e=> handleClick(e, {
                    id:row.id,
                    option:row.id+"empate",
                    hora:row.hora,
                    casa: row.casa,
                    fora: row.fora,
                    odiCasa:row.odiFora,
                    odiFora:row.odiFora,
                    odiEmpate:row.odiEmpate,
                    select:true

                  }, row.id+"empate")}>
                    <div>{row.odiEmpate}</div>
                    <div>Empate</div>
                  </Card>
                  <Card key={row.id+"fora"} className={`card card${row.id}`} onClick={e=> handleClick(e, {
                    id:row.id,
                    option:row.id+"fora",
                    hora:row.hora,
                    casa: row.casa,
                    fora: row.fora,
                    odiCasa:row.odiFora,
                    odiFora:row.odiFora,
                    odiEmpate:row.odiEmpate,
                    select:true

                  }, row.id+"fora")}>
                    <div>{row.odiFora}</div>
                    <div>{row.fora}</div>
                  </Card>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
