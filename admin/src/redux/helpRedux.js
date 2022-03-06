import { createSlice } from "@reduxjs/toolkit";

export const helpSlice = createSlice({
  name: "help",
  initialState: {
    helps: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getHelpStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getHelpSuccess: (state, action) => {
      state.isFetching = false;
      state.helps = action.payload;
    },
    getHelpFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteHelpStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteHelpSuccess: (state, action) => {
      state.isFetching = false;
      state.helps.splice(
        state.helps.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteHelpFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateHelpStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateHelpSuccess: (state, action) => {
      state.isFetching = false;
      state.helps[
        state.helps.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.help;
    },
    updateHelpFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addHelpStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addHelpSuccess: (state, action) => {
      state.isFetching = false;
      state.helps.push(action.payload);
    },
    addHelpFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getHelpStart,
  getHelpSuccess,
  getHelpFailure,
  deleteHelpStart,
  deleteHelpSuccess,
  deleteHelpFailure,
  updateHelpStart,
  updateHelpSuccess,
  updateHelpFailure,
  addHelpStart,
  addHelpSuccess,
  addHelpFailure,
} = helpSlice.actions;

export default helpSlice.reducer;
