import { createSlice } from '@reduxjs/toolkit'

type checkedType={
    checked:boolean
}
const initialState:checkedType = {
   checked:false
}

const removeCheckedsReducer = createSlice({
  name: "removeCheckedsReducer",
  initialState,
  reducers: {
     setCheckedReducer:(state,action)=>{
        state.checked = action.payload
     }
  }
});

export const {setCheckedReducer} = removeCheckedsReducer.actions

export default removeCheckedsReducer.reducer