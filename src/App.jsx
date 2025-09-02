import { BrowserRouter, Routes, Route } from "react-router"
import AppLayout from "./Pages/AppLayout"
import HomePage from "./Pages/HomePage"
import SignUp from "./Pages/Signup"
import Login from "./Pages/Login"
import VerifyEmail from "./Pages/VerifyEmail"
import Feedback from "./Pages/Feedback"
import ForgotPassword from "./Pages/ForgotPassword"


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path='feedback' element={<Feedback />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
