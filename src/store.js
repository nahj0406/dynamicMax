import { configureStore, createSlice } from "@reduxjs/toolkit";

// let count = useSelector((state)=> state.count) // 불러올땐 이렇게.

let count = createSlice({
   name: 'count',
   initialState : [
      {},
      {},
   ]
})

export default configureStore({
   reducer: {
      count : count.reducer,
   }
})