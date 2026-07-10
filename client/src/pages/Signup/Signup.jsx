import React from 'react'
import { SignupForm } from "@/components/signup-form"

const Signup = () => {
  return (
    <div className="bg-slate-200 flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}

export default Signup
