import { BrowserRouter, Routes, Route } from "react-router"
import AppLayout from "./Pages/AppLayout"
import HomePage from "./Pages/HomePage"
import SignUp from "./Pages/Signup"
import Login from "./Pages/Login"


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
