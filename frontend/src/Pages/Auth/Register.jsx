import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../Context/AuthContext.jsx'
import './auth.css'

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setIsLoading(true)

    const result = await register(formData.username, formData.email, formData.password)

    if (result.success) {
      setMessage('Registration successful! Redirecting to login...')
      setTimeout(() => navigate('/login'), 1500)
    } else {
      setMessage(result.message || 'Registration failed. Try again.')
    }
    setIsLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className='title-container'>
          <h1>TaskMaster</h1>
          <img src="/favicon.svg" alt="TaskMaster Logo" />
        </div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required placeholder='Username...'/>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder='Email...'/>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required placeholder='Password...' />
          </div>

          <button type="submit" className="btn btn-register-login" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Register'}
          </button>
        </form>

        {message && <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}

        <p className="login-link">
          Already have an account? <a className="form-link" href="/login">Log In</a>
        </p>
      </div>
    </div>
  )
}

export default Register