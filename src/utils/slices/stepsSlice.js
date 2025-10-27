import { createSlice } from "@reduxjs/toolkit";

const stepsSlice = createSlice({
  name: "steps",
  initialState: {
    today: null,         // Steps for today
    past7days: [],       // Array of { date, steps }
    totalPast7Days: 0,   // Sum of past 7 days
    loading: false,
    error: null,
  },
  reducers: {
    setTodaySteps: (state, action) => {
      state.today = action.payload;
    },
    setPast7DaysSteps: (state, action) => {
      state.past7days = action.payload;

      // Compute total past 7 days steps
      state.totalPast7Days = action.payload.reduce(
        (sum, day) => sum + (day.steps || 0),
        0
      );
    },
    setStepsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setStepsError: (state, action) => {
      state.error = action.payload;
    },
    clearStepsState: (state) => {
      state.today = null;
      state.past7days = [];
      state.totalPast7Days = 0;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setTodaySteps,
  setPast7DaysSteps,
  setStepsLoading,
  setStepsError,
  clearStepsState,
} = stepsSlice.actions;

export default stepsSlice.reducer;
