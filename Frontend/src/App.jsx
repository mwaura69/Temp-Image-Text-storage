import React from 'react'
import './App.css'
import Insert from './pages/Insert' 
import Read from './pages/Read'
import Upload from './pages/Upload'
import Files from './pages/Files'
import Nav from './navigation/Nav'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      <div>
      <Routes>
          <Route path="/" element={<Nav />}>
              <Route path="Upload" element={<Upload />} /> {/* Relative path */}
              <Route path="List" element={<Files />} /> {/* Relative path */}
              <Route path="Insert" element={<Insert />} /> {/* Relative path */}
              <Route path="Read" element={<Read />} /> {/* Relative path */}
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
