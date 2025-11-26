import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const VerifyEmail = () => {
  const [message, setMessage] = useState('Verificando...')
  const [status, setStatus] = useState('pending') // 'pending' | 'success' | 'error'
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    if (!token) {
      setMessage('Verification token is missing.')
      setStatus('error')
      return
    }

    const verify = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/verify-email?token=${encodeURIComponent(token)}`)
        const data = await res.json()

        if (!res.ok) {
          setMessage(data.message || 'Error verifying email. Try again later.')
          setStatus('error')
          return
        }

        setMessage(data.message || 'Email verified successfully! You can now log in.')
        setStatus('success')

        // Redirigir a login después de 2 segundos
        setTimeout(() => navigate('/login'), 2000)
      } catch (error) {
        console.error('VerifyEmail error:', error)
        setMessage('Verification error. Try again later.')
        setStatus('error')
      }
    }

    verify()
  }, [navigate])

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="title-container">
          <h1>TaskMaster</h1>
        </div>
        <h2>Email verification</h2>
        <p className={status === 'error' ? 'message error' : status === 'success' ? 'message success' : ''}>{message}</p>
      </div>
    </div>
  )
}

export default VerifyEmail
