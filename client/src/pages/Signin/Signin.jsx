import React, { useEffect } from 'react'
import { LoginForm } from "@/components/login-form"

const Signin = () => {
  
  useEffect(() => {
    document.title = "Đăng nhập - Việc làm 24h"
  }, [])

  return (
    <div className="bg-slate-200 flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}

export default Signin
