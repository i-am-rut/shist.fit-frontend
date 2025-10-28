import { createSlice } from "@reduxjs/toolkit";

const sleepSlice = createSlice({
  name: "sleep",
  initialState: {
    lastNight: null,        
    past7Days: [],          // [{ date, duration }]
    loading: false,
    error: null,
  },
  reducers: {
    setLastNightSleep: (state, action) => {
      state.lastNight = action.payload;
    },
    setPast7DaysSleep: (state, action) => {
      state.past7Days = action.payload;
    },
    setSleepLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSleepError: (state, action) => {
      state.error = action.payload;
    },
    clearSleepState: (state) => {
      state.lastNight = null;
      state.past7Days = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setLastNightSleep,
  setPast7DaysSleep,
  setSleepLoading,
  setSleepError,
  clearSleepState,
} = sleepSlice.actions;

export default sleepSlice.reducer;
