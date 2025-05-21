import React from 'react'

import { Routes, Route } from "react-router-dom"

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SearchDetails  from "./pages/SearchDetails"

import './App.css'

const App = () => {
  return (
    <div className='app-container'>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Hero />}/>
          <Route path='/search-details' element={<SearchDetails />} />
        </Routes>
      </main>
      
    </div>
  )
}

export default App