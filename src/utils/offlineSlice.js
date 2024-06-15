import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offlineData: [],
};

const offlineSlice = createSlice({
  name: "offline",
  initialState,
  reducers: {
    addOfflineData: (state, action) => {
      const existItems =
        JSON.parse(localStorage.getItem("customer_address")) || [];
      localStorage.setItem(
        "customer_address",
        JSON.stringify([...existItems, action.payload])
      );
      const NewItems = localStorage.getItem("customer_address");

      state.offlineData = NewItems;
    },

    addOfflineDataMany: (state, action) => {
      state.offlineData = action.payload;
    },
  },
});

export const { addOfflineData, addOfflineDataMany } = offlineSlice.actions;
export default offlineSlice.reducer;
