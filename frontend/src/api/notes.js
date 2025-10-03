const BASE_URL = import.meta.env.VITE_API_BASE_URL + '/notes' 

function getAuthHeader () {
  const token = localStorage.getItem('token')
  
  if (!token) {
    return {
      'Content-Type': 'application/json'
    }
  }

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}` 
  }
}

function handleAuthError (response) {
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login' 
    throw new Error('Authentication failed. Please log in again.')
  }
}

export async function fetchActiveNotes () {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: getAuthHeader()
    })
    
    handleAuthError(response)

    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API Error (fetchActiveNotes):', error)
    throw error
  }
}

export async function fetchArchivedNotes () {
  try {
    const response = await fetch(`${BASE_URL}/archived`, {
      method: 'GET',
      headers: getAuthHeader()
    })
    
    handleAuthError(response)

    if (!response.ok) {
      throw new Error(`Failed to fetch archived tasks: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API Error (fetchArchivedNotes):', error)
    throw error
  }
}

export async function fetchNoteById (noteId) {
  try {
    const response = await fetch(`${BASE_URL}/${noteId}`, {
      method: 'GET',
      headers: getAuthHeader()
    })
    
    handleAuthError(response)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Task not found')
      }
      throw new Error(`Failed to fetch task: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API Error (fetchNoteById):', error)
    throw error
  }
}

export async function createNote (noteData) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(noteData) 
    })
    
    handleAuthError(response)

    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(`Failed to create task: ${errorBody.error || response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API Error (createNote):', error)
    throw error
  }
}

export async function updateNote (noteId, noteData) {
  try {
    const response = await fetch(`${BASE_URL}/${noteId}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(noteData)
    })
    
    handleAuthError(response)

    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(`Failed to update task: ${errorBody.error || response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API Error (updateNote):', error)
    throw error
  }
}

export async function archiveNote (noteId) {
  try {
    const response = await fetch(`${BASE_URL}/${noteId}/archive`, {
      method: 'PATCH',
      headers: getAuthHeader()
    })
    handleAuthError(response)

    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(`Failed to archive task: ${errorBody.error || response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API Error (archiveNote):', error)
    throw error
  }
}

export async function unarchiveNote (noteId) {
  try {
    const response = await fetch(`${BASE_URL}/${noteId}/unarchive`, {
      method: 'PATCH',
      headers: getAuthHeader()
    })
    
    handleAuthError(response)

    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(`Failed to unarchive task: ${errorBody.error || response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API Error (unarchiveNote):', error)
    throw error
  }
}

export async function deleteNote (noteId) {
  try {
    const response = await fetch(`${BASE_URL}/${noteId}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    })
    
    handleAuthError(response)

    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(`Failed to delete task: ${errorBody.error || response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API Error (deleteNote):', error)
    throw error
  }
}