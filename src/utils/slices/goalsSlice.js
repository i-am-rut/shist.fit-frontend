import { createSlice } from "@reduxjs/toolkit";

const goalsSlice = createSlice({
  name: "goals",
  initialState: {
    data: null,        // holds all goals { calorie, water, weight, sleep, steps }
    loading: false,
    error: null,
  },
  reducers: {
    setGoals: (state, action) => {
      state.data = action.payload;
    },
    updateGoals: (state, action) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      } else {
        state.data = action.payload;
      }
    },
    setGoalsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setGoalsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setGoals,
  updateGoals,
  setGoalsLoading,
  setGoalsError,
} = goalsSlice.actions;

export default goalsSlice.reducer;
