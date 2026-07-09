import { BrowserRouter, Routes, Route } from "react-router"
import HomePage from "./pages/HomePage/HomePage"
import Signup from "./pages/Signup/Signup"
import Signin from "./pages/Signin/Signin"


function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />

        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App
