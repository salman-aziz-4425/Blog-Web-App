import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  users:0, 
  allData:[]
};

export const postSlice = createSlice({
  name: 'postHandler',
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.users = action.payload;
    },
    addAllData: (state, action) => {
      state.allData = [...action.payload];
    },
}
});

export const { addUsers,addAllData } = postSlice.actions;

export default postSlice.reducer;