import { BrowserRouter, Routes, Route } from "react-router"
import { Toaster } from "sonner"
import HomePage from "./pages/client/HomePage"
import Signup from "./pages/Signup/Signup"
import Signin from "./pages/Signin/Signin"
import MainLayOut from "./pages/Layout/MainLayout"
import JobDetail from "./pages/client/JobDetail"
import CategoryJob from "./pages/client/CategoryJob"
import { useEffect } from "react"
import { useAuthStore } from "./stores/useAuthStore"
import PrivateRoute from "./pages/client/PrivateRoute"
import Profile from "./pages/client/Profile"
import Application from "./pages/client/Application"
import SearchJobPage from "./pages/client/SearchJobPage"
import CompanyPage from "./pages/client/CompanyPage"


function App() {
  const { accessToken, user, fetchMe, refresh } = useAuthStore();

  const init = async () => {
    if(!accessToken) {
      await refresh();
    }

    if(accessToken && !user) {
      await fetchMe();
    }
  }

  useEffect(() => {
    init();
  }, [])

  
  return <>
    <Toaster richColors/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayOut/>} >
          <Route index element={<HomePage />} />
          <Route path='/viec-lam/:slug' element={<JobDetail />} />
          <Route path="/:slug" element={<CategoryJob />} />
          <Route path="/tim-kiem" element={<SearchJobPage /> } />
          <Route path="/cong-ty/:slug" element={<CompanyPage /> } />
          <Route element={<PrivateRoute />}>
            <Route path="/ho-so" element={<Profile />} />
            <Route path="/lich-su-ung-tuyen" element={<Application />} />
          </Route>
        </Route>

        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App
