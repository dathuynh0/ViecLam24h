import { BrowserRouter, Routes, Route } from "react-router"
import { Toaster } from "sonner"
import Signup from "./pages/Signup/Signup"
import Signin from "./pages/Signin/Signin"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFound from "./pages/404/NotFound"
import Main from "./pages/Client/Main"
import MainCompany from './pages/Company/Main'
import MainAdmin from './pages/Admin/Main'
import OAuth from "./pages/Client/OAuth"
import VerifyEmail from "./pages/Signup/VerifyEmail"


function App() {
  
  return <>
    <Toaster richColors/>
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          {/* Client Route */}
          <Route path="/*" element={<Main />} />

          {/* Company Route */}
          <Route path="/nha-tuyen-dung/*" element={<MainCompany />} />

          {/* Admin */}
          <Route path="/quan-tri/*" element={<MainAdmin />}/>
        </Route>
        <Route path="/oauth" element={<OAuth />}/>

        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/verify-email" element={<VerifyEmail/>} />

        <Route path="/404" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  </>
}

export default App
