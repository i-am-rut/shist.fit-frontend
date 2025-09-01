import { BrowserRouter, Routes, Route } from "react-router"
import HomePage from "./Pages/HomePage"
import SignUp from "./Pages/Signup"


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
