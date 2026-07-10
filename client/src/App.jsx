import { BrowserRouter, Routes, Route } from "react-router"
import { Toaster } from "sonner"
import HomePage from "./pages/HomePage/HomePage"
import Signup from "./pages/Signup/Signup"
import Signin from "./pages/Signin/Signin"
import Job from "./pages/Job/Job"
import MainLayOut from "./pages/Layout/MainLayout"


function App() {
  return <>
    <Toaster richColors/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayOut/>} >
          <Route index element={<HomePage />} />
          <Route path='/viec-lam/:slug' element={<Job />} />
        </Route>

        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App
