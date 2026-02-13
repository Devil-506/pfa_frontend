import React from 'react'
import { LoginForm } from '../components/Auth/LoginForm'

export const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-8">
          <span className="text-4xl">🧠</span>
          <h1 className="text-2xl font-bold mt-2">Alzheimer Care</h1>
          <p className="text-gray-500 text-sm">Sign in to your account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}