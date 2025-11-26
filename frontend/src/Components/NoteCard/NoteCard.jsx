import React from 'react'
import { useNavigate } from 'react-router'
import './NoteCard.css'

function NoteCard({ note, onDelete, onArchive, onUnarchive, isArchivedView, isPublicView }) {
  const navigate = useNavigate()

  const handleEdit = () => {
    navigate(`/edit/${note._id}`)
  }

  const ArchiveButton = () => {
    if (isArchivedView) {
      return (
        <button onClick={onUnarchive} className="btn btn-unarchive">
          <i className="bi bi-archive"></i>
        </button>
      )
    } else {
      return (
        <button onClick={onArchive} className="btn btn-archive">
          <i className="bi bi-archive"></i>
        </button>
      )
    }
  }

  return (
    <div className="note-card">
      <div className="note-header-badges">
        <span className='note-category'>{note.category}</span>
        <span className={`note-privacy ${note.is_public ? 'public' : 'private'}`}>
          {note.is_public ? 'Public' : 'Private'}
        </span>
      </div>
      <h3 className="note-title">{note.title}</h3>
      <p className="note-description">{note.description}</p>

      <small className="note-date">
        Created: {new Date(note.created_at).toLocaleDateString()}
        {note.modified_at && ` | Modified: ${new Date(note.modified_at).toLocaleDateString()}`}
      </small>

      {!isPublicView ? (
        <div className="note-actions">
          <div className='edit-archive-actions'>
            {!isArchivedView && (
              <button onClick={handleEdit} className="btn btn-edit">
                <i className="bi bi-pencil"></i>
              </button>
            )}

            <ArchiveButton />
          </div>
          
          <button onClick={onDelete} className="btn btn-delete">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      ) : (
        <div className="note-public-meta">
          {note.creator_id?.username && <small className="note-creator">By: {note.creator_id.username}</small>}
        </div>
      )}
    </div>
  )
}

export default NoteCard