import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offlineData: [],
};

const offlineSlice = createSlice({
  name: "offline",
  initialState,
  reducers: {
    addOfflineData: (state, action) => {
      state.offlineData.push(action.payload);
    },
  },
});

export const { addOfflineData } = offlineSlice.actions;
export default offlineSlice.reducer;
