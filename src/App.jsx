import React from 'react'
import Home from './sections/home'
import Header from './component/header'
import Footer from './component/footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      
        <Header />
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
        
        <Footer />
    </Router>
  )
}

export default App