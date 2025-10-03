import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { createNote, fetchNoteById, updateNote } from '../../api/notes.js'
import './NoteForm.css'

const initialFormState = {
    title: '',
    description: '',
    category: '', 
}

function NoteForm() {
    const [formData, setFormData] = useState(initialFormState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    
    const { id } = useParams() 
    const isEditing = !!id

    useEffect(() => {
        if (isEditing) {
            setIsLoading(true)
            fetchNoteById(id)
                .then(data => {
                    setFormData({
                        title: data.title,
                        description: data.description,
                        category: data.category || '', 
                    })
                    setIsLoading(false)
                })
                .catch(err => {
                    console.error("Failed to load task:", err)
                    setError("Couldn't load task for editing. Please try again.")
                    setIsLoading(false)
                })
        }
    }, [id, isEditing])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            let result
            
            if (isEditing) {
                result = await updateNote(id, formData)
                alert('Task updated successfully!')
            } else {
                result = await createNote(formData)
                alert('Task created successfully!')
            }

            navigate('/') 

        } catch (err) {
            console.error("Failed to save task:", err)
            setError(err.message || 'Failed to save task. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    if (isEditing && isLoading) {
        return <div className="loading">Loading the infomation of the task...</div>
    }
    
    const pageTitle = isEditing ? 'Edit task' : 'Create new task'
    
    return (
        <div className="note-form-page">
            <h2 className="page-title">{pageTitle}</h2>
            
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="note-form">
                
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Title of the task..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="5"
                        placeholder="Write the description of the task..."
                    ></textarea>
                </div>
                
                <div className="form-group">
                    <label htmlFor="category" className='form-label-category'>Category:</label>
                    <select id="category" name="category" value={formData.category} onChange={handleChange}>
                        <option value=""disabled selected hidden >Select a category</option>
                        <option value="personal" >Personal</option>
                        <option value="work">Work</option>
                        <option value="school">School</option>
                        <option value="house">House</option>
                    </select>
                </div>
                
                <div className="form-actions">
                    <button type="submit" disabled={isLoading} className="btn btn-ok">
                        {isLoading ? <i className="bi bi-check"></i> : <i className="bi bi-check"></i>}
                    </button>
                    <button type="button" onClick={() => navigate('/')} className="btn btn-cancel">
                        <i className="bi bi-x"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NoteForm