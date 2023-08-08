import { selectedType } from '@/types';
import { createSlice } from '@reduxjs/toolkit'

type listaType={
    lista:selectedType[]
}
const initialState:listaType = {
   lista:[]
}

const listaDeMCs = createSlice({
  name: "listaDeMCs",
  initialState,
  reducers: {
    setListaReducer:(state, action)=>{
       state.lista = action.payload
    }
  }
});

export const {
    setListaReducer
} = listaDeMCs.actions

export default listaDeMCs.reducer