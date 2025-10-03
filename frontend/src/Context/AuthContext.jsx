import React, { createContext, useState, useContext, useEffect } from 'react'
import { loginUser, registerUser } from '../api/auth'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password)
      
      const { token: newToken, user: userData } = data
      
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(userData))
      
      setToken(newToken)
      setUser(userData)
      return { success: true }
    } catch (error) {
      console.error('Login failed:', error)
      return { success: false, message: error.message }
    }
  }

  const register = async (username, email, password) => {
    try {
      const data = await registerUser(username, email, password)
      
      return { success: true, message: data.message }
    } catch (error) {
      console.error('Registration failed:', error)
      return { success: false, message: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}