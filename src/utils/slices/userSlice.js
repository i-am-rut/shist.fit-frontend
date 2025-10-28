import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); 
    },
    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); 
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
