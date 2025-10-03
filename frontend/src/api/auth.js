const AUTH_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/auth'

export async function registerUser (username, email, password) {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed due to server error')
    }

    return data
  } catch (error) {
    console.error('API Error (registerUser):', error)
    throw error
  }
}

export async function loginUser (email, password) {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed: Invalid email or password')
    }

    return data
  } catch (error) {
    console.error('API Error (loginUser):', error)
    throw error
  }
}