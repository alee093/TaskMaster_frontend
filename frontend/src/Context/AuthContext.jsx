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
      try {
        // CORRECCIÓN: Usamos storedUser (la cadena) y solo lo parseamos
        // si existe. Si el JSON es inválido, el catch lo manejará.
        const parsedUser = JSON.parse(storedUser)

        setToken(storedToken)
        setUser(parsedUser)

      } catch (error) {
        // Si hay un error de parseo (JSON inválido/corrupto),
        // limpiamos el storage para evitar que el error se repita.
        console.error('Error al restaurar el usuario desde localStorage:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password)
      
      const { token: newToken, user: userData } = data
      
      // Aseguramos que userData se guarde como un JSON string válido
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(userData))
      
      setToken(newToken)
      setUser(userData)
      return { success: true }
    } catch (error) {
      // El error de login puede venir del servidor (ej: usuario no verificado)
      console.error('Login failed:', error)
      // Si el error tiene un objeto de respuesta (por ejemplo, Axios), intenta leer el mensaje
      const message = error.response?.data?.message || error.message || 'Error desconocido durante el login.'
      return { success: false, message }
    }
  }

  const register = async (username, email, password) => {
    try {
      const data = await registerUser(username, email, password)
      
      return { success: true, message: data.message }
    } catch (error) {
      console.error('Registration failed:', error)
      const message = error.response?.data?.message || error.message || 'Error desconocido durante el registro.'
      return { success: false, message }
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