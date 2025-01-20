import React from 'react'
import Home from './sections/home'
import Header from './component/header'
import Footer from './component/footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import About from './sections/about'

function App() {
  return (
    <Router>
      
        <Header />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
        
        <Footer />
    </Router>
  )
}

export default App