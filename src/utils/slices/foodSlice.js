import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    todayCalories: null,   
    todayMacros: null,     // { protein, carbs, fats }
    recentMeals: [],       
    loading: false,
    error: null,
  },
  reducers: {
    setTodayCalories: (state, action) => {
      state.todayCalories = action.payload;
    },
    incrementTotalCalories: (state, action) => {
      const addValue = action.payload;
      state.todayCalories = (state.todayCalories || 0) + addValue;
    },
    incrementTotalMacros: (state, action) => {
      const { carbs = 0, protein = 0, fats = 0 } = action.payload || {};
      if (!state.todayMacros) state.todayMacros = { carbs: 0, protein: 0, fats: 0 };
      state.todayMacros.carbs += carbs;
      state.todayMacros.protein += protein;
      state.todayMacros.fats += fats;
    },
    updateRecentMeals: (state, action) => {
      const newEntry = action.payload;
      if (!Array.isArray(state.recentMeals)) state.recentMeals = [];

      if (state.recentMeals.length >= 4) {
        state.recentMeals.shift();
      }

      state.recentMeals.push(newEntry);
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
  incrementTotalCalories,
  incrementTotalMacros,
  setRecentMeals,
  updateRecentMeals,
  setFoodStreak,
  setFoodLoading,
  setFoodError,
  clearFoodState,
} = foodSlice.actions;

export default foodSlice.reducer;
