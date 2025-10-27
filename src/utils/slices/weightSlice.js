import { createSlice } from "@reduxjs/toolkit";

const weightSlice = createSlice({
  name: "weight",
  initialState: {
    current: null,      // current weight entry
    past7Days: [],      // array of weight entries
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentWeight: (state, action) => {
      state.current = action.payload;
    },
    setPast7DaysWeight: (state, action) => {
      state.past7Days = action.payload;
    },
    setWeightLoading: (state, action) => {
      state.loading = action.payload;
    },
    setWeightError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentWeight,
  setPast7DaysWeight,
  setWeightLoading,
  setWeightError,
} = weightSlice.actions;

export default weightSlice.reducer;
