import React, { useContext } from 'react'
import { useAuth } from '../../Context/AuthContext.jsx'
import './LogoutButton.css'
const LogoutButton = ({ className = '' }) => {
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className='logout-container'>
      {user && (
        <span className='username'>
          Welcome, {user.username}
        </span>
      )}
      
      <button onClick={handleLogout} className='btn btn-logout'>
        LogOut
      </button>
    </div>
  )
}

export default LogoutButton