import { Routes, Route } from 'react-router'
import ActiveNotes from './Pages/ActiveNotes/ActiveNotes.jsx' 
import ArchivedNotes from './Pages/ArchivedNotes/ArchivedNotes.jsx'
import './App.css' 
import NoteForm from './Components/NoteForm/NoteForm.jsx'
import Register from './Pages/Auth/Register.jsx'
import Login from './Pages/Auth/Login.jsx'
import ProtectedRoute from './Pages/Auth/ProtectedRoute.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'



function App() {
  return (
    <>
      <AuthProvider>
        <div className="container">
          <Routes>
            
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<ActiveNotes />} /> 
              <Route path="/archived" element={<ArchivedNotes />} />
              <Route path="/edit/:id" element={<NoteForm />} />
              <Route path="/new" element={<NoteForm />} />         
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </>
  )
}

export default App