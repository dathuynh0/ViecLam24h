import { BrowserRouter, Routes, Route } from "react-router"
import { Toaster } from "sonner"
import HomePage from "./pages/HomePage/HomePage"
import Signup from "./pages/Signup/Signup"
import Signin from "./pages/Signin/Signin"
import MainLayOut from "./pages/Layout/MainLayout"
import JobDetail from "./pages/JobDetail/JobDetail"
import CategoryJob from "./pages/CategoryJob/CategoryJob"


function App() {
  return <>
    <Toaster richColors/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayOut/>} >
          <Route index element={<HomePage />} />
          <Route path='/viec-lam/:slug' element={<JobDetail />} />
          <Route path="/:slug" element={<CategoryJob />} />
        </Route>

        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App
