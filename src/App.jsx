import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

import './App.css'

const App = () => {
  return (
    <div className='app-container'>
      <Navbar />
      <Hero />
      {/* You can add more sections here as needed */}
    </div>
  )
}

export default App