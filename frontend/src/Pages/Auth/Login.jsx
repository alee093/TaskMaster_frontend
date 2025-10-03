import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../Context/AuthContext.jsx'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setIsLoading(true)

    const result = await login(formData.email, formData.password)

    if (result.success) {
      navigate('/')
    } else {
      setMessage(result.message || 'Login failed. Check your credentials.')
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
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder='Email...' />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required placeholder='Password...' />
          </div>

          <button type="submit" className="btn btn-register-login" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {message && <p className={`message ${message.includes('failed') ? 'error' : 'success'}`}>{message}</p>}

        <p className="login-link">
          Don't have an account? <a className='form-link' href="/register">Register</a>
        </p>
      </div>
    </div>
  )
}

export default Login