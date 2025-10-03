import React, { useState, useEffect, useCallback } from 'react'
import { fetchActiveNotes, archiveNote, deleteNote } from '../../api/notes.js' 
import NoteCard from '../../Components/NoteCard/NoteCard.jsx' 
import './ActiveNotes.css' 
import { useNavigate } from 'react-router'
import LogoutButton from '../../Components/LogoutButton/LogoutButton.jsx'

function ActiveNotes() {
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()

  const filteredNotes = notes.filter(note => filter === 'all' || note.category === filter)

  const navigateToArchived = () => {
    navigate('/archived')
  }
  const navigateToAddNewNote = () => {
    navigate('/new')
  }

  const loadNotes = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchActiveNotes()
      setNotes(data)
    } catch (err) {
      setError('Error loading active tasks. Make sure the backend (Node/Express) is running.')
      console.error(err)
      setNotes([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadNotes()
  }, [loadNotes])

  const handleArchive = async (noteId) => {
    try {
      await archiveNote(noteId)
      setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId))
    } catch (err) {
      alert('Failed to archive task. Try again.')
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
    return <div className="loading">Loading active tasks...</div>
  }
  
  if (error) {
    return <div className="error-message">Error: {error}</div>
  }

  return (
    <div className="notes-page active-notes">
      <header>
        <h2>TaskMaster</h2>
        <LogoutButton />
      </header>
      <div className='section-container'>

        <aside>
          <div className='div-active-tasks'>
            <span className='border-purple'></span>
            <span className='active-task-text'>
              Active Tasks
            </span>
          </div>
          <button className='btn btn-go-to' onClick={navigateToArchived}>Go to Archived</button>
        </aside>

        <section>
          <div className='div-add'>
            <div className='filter-container'>
              <label htmlFor="filter">Filter:</label>
              <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="school">School</option>
                <option value="house">House</option>
              </select>
            </div>
            <button className='btn-add' onClick={navigateToAddNewNote}>
              <i className="bi bi-plus-circle"></i>
            </button>
          </div>
          {filteredNotes.length === 0 ? (
            filter === "all" ? (
              <p className="no-notes">You have no active tasks, create one!</p>
            ) : (
              <p className="no-notes">You have no active tasks in this category.</p>
            )
          ) : (
            <div className="notes-list">
              {filteredNotes.map(note => (
                <NoteCard 
                  key={note._id}
                  note={note}
                  onArchive={() => handleArchive(note._id)}
                  onDelete={() => handleDelete(note._id)}
                  isArchivedView={false} 
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default ActiveNotes