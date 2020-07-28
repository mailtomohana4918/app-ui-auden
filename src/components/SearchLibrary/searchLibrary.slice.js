import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchData: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    pushReposToStore: (state, action) => {
      state.searchData.push(...action.payload);
    },
  },
});

export const { pushReposToStore } = searchSlice.actions;
