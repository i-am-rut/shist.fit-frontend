import axios from "axios";
import appStore from "./appStore"
import { setTokenExpired } from "./slices/userSlice";
import { notifyError } from "./toasts";

let logoutInProgress = false

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:1618",
  withCredentials: true,
})

const handleLogout = () => {
  if(logoutInProgress) return
  logoutInProgress = true
  appStore.dispatch(setTokenExpired())
  notifyError("Session Expired", "Please log in again")
}

api.interceptors.response.use(
  response => response,
  error => {
    if(error.response?.status === 401) {
      const message = error.response.data?.error || ""
      if(message.toLowerCase().includes('expired')) {
        handleLogout()
      }
    }
    return Promise.reject(error)
  }
)

export default api;
