import { BrowserRouter, Routes, Route } from "react-router"
import AppLayout from "./Pages/AppLayout"
import HomePage from "./Pages/HomePage"
import SignUp from "./Pages/Signup"
import Login from "./Pages/Login"
import VerifyEmail from "./Pages/VerifyEmail"
import Feedback from "./Pages/Feedback"
import ForgotPassword from "./Pages/ForgotPassword"
import Page404 from "./Pages/404"
import Dashboard from "./Pages/Dashboard"
import DashboardLayout from "./Pages/DashboardLayout"
import FoodLogger from "./Pages/FoodLogger"
import HealthMetrics from "./Pages/HealthMetrics"


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="foodlog" element={<FoodLogger />} />
            <Route path='healthmetrics' element={<HealthMetrics />} />
          </Route>
          <Route path='feedback' element={<Feedback />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
