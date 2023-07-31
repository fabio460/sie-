import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   teste:"teste"
}

const testeReducer = createSlice({
  name: 'teste',
  initialState,
  reducers: {
    getTeste:(state, action)=>{
       state.teste = action.payload
    }
  }
});

export const {
    getTeste
} = testeReducer.actions

export default testeReducer.reducer