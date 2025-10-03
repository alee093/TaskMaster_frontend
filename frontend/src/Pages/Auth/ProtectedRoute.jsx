import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../Context/AuthContext.jsx'

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div className="loading-global">Loading TaskMaster...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute