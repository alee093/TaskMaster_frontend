import React, { useState, useEffect, useCallback } from 'react'
import { fetchPublicNotes } from '../../api/notes.js'
import NoteCard from '../../Components/NoteCard/NoteCard.jsx'
import './PublicNotes.css'
import { useNavigate } from 'react-router'

function PublicNotes() {
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const goToHome = () => {
    navigate('/')
  }

  const loadNotes = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchPublicNotes()
      setNotes(data)
    } catch (err) {
      setError('Error loading public notes. Make sure the backend is running.')
      console.error(err)
      setNotes([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadNotes()
  }, [loadNotes])

  if (isLoading) return <div className="loading">Loading public notes...</div>
  if (error) return <div className="error-message">Error: {error}</div>

  return (
    <div className="notes-page public-notes">
      <header>
        <button className='public-go-to'>
          <i className="bi bi-arrow-left" onClick={goToHome}></i>
        </button>
        <h2>Public Notes</h2>
      </header>
      <section>
        {notes.length === 0 ? (
          <p className="no-notes">There are no public notes yet.</p>
        ) : (
          <div className="notes-list">
            {notes.map(note => (
              <NoteCard key={note._id} note={note} isPublicView={true} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default PublicNotes
