import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  issueData: [],
};

export const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    pushIssuestoStore: (state, action) => {
      state.issueData.push(action.payload);
    },
  },
});

export const { pushIssuestoStore } = issueSlice.actions;
