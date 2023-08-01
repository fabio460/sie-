import { selectedType } from '@/types';
import { createSlice } from '@reduxjs/toolkit'

type initialStateType = {
    aposta:selectedType[]
}

const initialState:initialStateType = {
  aposta:[]
}

const apostasReducer = createSlice({
  name: 'apostasReducer',
  initialState,
  reducers: {
    setApostas:(state,action)=>{
       state.aposta = action.payload
    }
  }
});

export const {setApostas} = apostasReducer.actions

export default apostasReducer.reducer