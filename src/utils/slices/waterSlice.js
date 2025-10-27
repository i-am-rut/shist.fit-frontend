import { createSlice } from "@reduxjs/toolkit";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    today: null,       // today's water intake (glasses)
    past7Days: [],     // array of {date, glasses}
    loading: false,
    error: null,
  },
  reducers: {
    setTodayWater: (state, action) => {
      state.today = action.payload;
    },
    setPast7DaysWater: (state, action) => {
      state.past7Days = action.payload;
    },
    updateTodayWater: (state, action) => {
      // use this when user logs more water (increment)
      if (state.today) {
        state.today.glasses = action.payload.glasses;
      } else {
        state.today = action.payload;
      }
    },
    setWaterLoading: (state, action) => {
      state.loading = action.payload;
    },
    setWaterError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTodayWater,
  setPast7DaysWater,
  updateTodayWater,
  setWaterLoading,
  setWaterError,
} = waterSlice.actions;

export default waterSlice.reducer;
