import { createSlice } from "@reduxjs/toolkit";

export const donorSlice = createSlice({
  name: "donor",
  initialState: {
    donors: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getDonorStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getDonorSuccess: (state, action) => {
      state.isFetching = false;
      state.donors = action.payload;
    },
    getDonorFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteDonorStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteDonorSuccess: (state, action) => {
      state.isFetching = false;
      state.donors.splice(
        state.donors.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteDonorFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateDonorStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateDonorSuccess: (state, action) => {
      state.isFetching = false;
      state.donors[
        state.donors.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.donor;
    },
    updateDonorFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addDonorStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addDonorSuccess: (state, action) => {
      state.isFetching = false;
      state.donors.push(action.payload);
    },
    addDonorFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getDonorStart,
  getDonorSuccess,
  getDonorFailure,
  deleteDonorStart,
  deleteDonorSuccess,
  deleteDonorFailure,
  updateDonorStart,
  updateDonorSuccess,
  updateDonorFailure,
  addDonorStart,
  addDonorSuccess,
  addDonorFailure,
} = donorSlice.actions;

export default donorSlice.reducer;
