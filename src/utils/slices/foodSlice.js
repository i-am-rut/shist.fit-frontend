import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    todayCalories: null,   // total calories today
    todayMacros: null,     // { protein, carbs, fats }
    recentMeals: [],       // last 4 meals logged
    loading: false,
    error: null,
  },
  reducers: {
    setTodayCalories: (state, action) => {
      state.todayCalories = action.payload;
    },
    setTodayMacros: (state, action) => {
      state.todayMacros = action.payload;
    },
    setRecentMeals: (state, action) => {
      state.recentMeals = action.payload;
    },
    setFoodStreak: (state, action) => {
      state.streak = action.payload;
    },
    setFoodLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFoodError: (state, action) => {
      state.error = action.payload;
    },
    clearFoodState: (state) => {
      state.todayCalories = null;
      state.todayMacros = null;
      state.recentMeals = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setTodayCalories,
  setTodayMacros,
  setRecentMeals,
  setFoodStreak,
  setFoodLoading,
  setFoodError,
  clearFoodState,
} = foodSlice.actions;

export default foodSlice.reducer;
