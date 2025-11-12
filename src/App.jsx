import { BrowserRouter, Routes, Route } from "react-router"
import AppLayout from "./layouts/AppLayout"
import HomePage from "./Pages/HomePage"
import SignUp from "./Pages/Signup"
import Login from "./Pages/Login"
import VerifyEmail from "./Pages/VerifyEmail"
import Feedback from "./Pages/Feedback"
import ForgotPassword from "./Pages/ForgotPassword"
import Page404 from "./Pages/404"
import Dashboard from "./Pages/Dashboard"
import DashboardLayout from "./layouts/DashboardLayout"
import FoodLogger from "./Pages/FoodLogger"
import HealthMetrics from "./Pages/HealthMetrics"
import HealthMetricsWeight from "./Pages/HealthMetricsWeight"
import HealthMetricsSleep from "./Pages/HealthMetricsSleep"
import HealthMetricsHydration from "./Pages/HealthMetricsHydration"
import HealthMetricsActivity from "./Pages/HealthMetricsActivity"
import Goals from "./Pages/Goals"
import GoalSetting from "./Pages/GoalSetting"
import GoalsOverview from "./Pages/GoalsOverview"
import Profile from "./Pages/Profile"
import Settings from "./Pages/Settings"
import { Bounce, ToastContainer } from "react-toastify"
import AuthLayout from "./layouts/AuthLayout"
import ScrollToTop from "./components/ScrollToTop"
import Verify from "./Pages/Verify"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./utils/slices/userSlice"
import Loader from "./components/Loader"


function App() {
  const dispatch = useDispatch()
  const status = useSelector(state => state.user.status)

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if(status === "checking" || status === 'idle') {
    return (
        <div className='flex flex-col gap-4 items-center justify-center h-screen bg-black'>
            <Loader />
            <p className="text-white font-bold">Checking authentication...</p>
        </div>
    )
  }

  return (
    <>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route element={<AuthLayout />}>
              <Route path="dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="foodlog" element={<FoodLogger />} />
                <Route path='healthmetrics' element={<HealthMetrics />}>
                  <Route index element={<HealthMetricsWeight />} />
                  <Route path="sleep" element={<HealthMetricsSleep />} />
                  <Route path="hydration" element={<HealthMetricsHydration />} />
                  <Route path="activity" element={<HealthMetricsActivity />} />
                </Route>
              </Route>
              <Route path="goals" element={<Goals />} >
                <Route index element={<GoalsOverview />} />
                <Route path="goal-settings" element={<GoalSetting />} />
              </Route>
              <Route path="profile" element={<Profile />} />
              <Route path='feedback' element={<Feedback />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        theme="dark"
        rtl={false}
        autoClose={5000}
        newestOnTop
        closeOnClick={false}
        closeButton
        pauseOnHover
        transition={Bounce}
        hideProgressBar={false}
        draggable
      />
    </BrowserRouter>
      
    </>
  )
}

export default App
