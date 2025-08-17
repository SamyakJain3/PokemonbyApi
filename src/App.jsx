import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './Home.jsx'

const App = () => {
  return (
    <div>
     <nav className="navbar-3d mb-4">
  <Link to="/" className="btn-3d">Home</Link>
</nav>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
