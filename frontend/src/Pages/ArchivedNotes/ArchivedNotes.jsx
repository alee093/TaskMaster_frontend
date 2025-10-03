import React, { useState, useEffect, useCallback } from 'react'
import { fetchArchivedNotes, unarchiveNote, deleteNote } from '../../api/notes.js' 
import NoteCard from '../../Components/NoteCard/NoteCard.jsx'
import { useNavigate } from 'react-router'

function ArchivedNotes() {
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const navigateToActive = () => {
    navigate('/')
  }

  const loadNotes = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchArchivedNotes() 
      setNotes(data)
    } catch (err) {
      setError('Error loading archived tasks. Make sure the backend (Node/Express) is running.')
      console.error(err)
      setNotes([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadNotes()
  }, [loadNotes])

  const handleUnarchive = async (noteId) => {
    try {
      await unarchiveNote(noteId) 
      setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId))
    } catch (err) {
      alert('Failed to unarchive task. Try again.')
      console.error(err)
    }
  }

  const handleDelete = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return
    
    try {
      await deleteNote(noteId)
      setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId))
    } catch (err) {
      alert('Failed to delete task. Try again.')
      console.error(err)
    }
  }
  
  if (isLoading) {
    return <div className="loading">Loading archived tasks...</div>
  }
  
  if (error) {
    return <div className="error-message">Error: {error}</div>
  }

  return (
    <div className="notes-page archived-notes">
      <header>
        <h2>TaskMaster</h2>
        <h4>Archived Tasks</h4>
      </header>
      <div className='section-container'>
        <aside>
          <div className='div-active-tasks'>
            <span className='border-purple'></span>
            <span className='active-task-text'>
              Archived Tasks
            </span>
          </div>
          <button onClick={navigateToActive} className="btn btn-go-to">
            Go to Active
          </button>
        </aside>
        <section>
          {notes.length === 0 ? (
            <p className="no-notes">You have no archived tasks.</p>
          ) : (
            <div className="notes-list">
              {notes.map(note => (
                <NoteCard 
                  key={note._id}
                  note={note}
                  onUnarchive={() => handleUnarchive(note._id)}
                  onDelete={() => handleDelete(note._id)}
                  isArchivedView={true} 
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default ArchivedNotes