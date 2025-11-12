import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState : {
    user:  null, 
    status: "idle", // "idle" / "checking" / "authenticated" / "unauthenticated"
    isLogout: false,
    isDeactivate: false,
    tokenExpired: false,
  },
  reducers: {
    startCheckingAuth: (state) => {
      state.status = "checking";
    },
    setUser: (state, action) => {
      state.isLogout = false
      state.user = action.payload;
      state.status = "authenticated";
      state.tokenExpired = false;
    },
    removeUser: (state, action) => {
      const {logout, deactivate} = action?.payload
      state.user = null;
      state.isLogout = logout === true ? logout : false
      state.isDeactivate = deactivate === true ? deactivate : false
      state.status = "unauthenticated";
    },
    setTokenExpired: (state) => {
      state.tokenExpired = true;
      state.status = "unauthenticated";
      state.user = null;
    },
  },
});



export const checkAuth = () => async (dispatch) => {
  dispatch(startCheckingAuth());
  try {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/me`, { withCredentials: true });
    dispatch(setUser(res.data));
  } catch (err) {
    console.error(err.response?.data)
    dispatch(setTokenExpired());
  }
};

export const { startCheckingAuth, setUser, removeUser, setTokenExpired } = userSlice.actions;
export default userSlice.reducer;
