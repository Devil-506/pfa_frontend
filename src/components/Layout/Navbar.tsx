import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <span className="text-2xl">🧠</span>
          <span className="font-semibold text-gray-800">Alzheimer Care</span>
        </Link>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">{user?.fullName || 'Caregiver'}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}