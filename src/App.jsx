import React from 'react'
import Home from './sections/home'
import Header from './component/header'
import Footer from './component/footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import About from './sections/about'
import Project from './sections/project'
import Card from './component/card'
import Contact from './sections/contact'
import MessageIcon from './component/messageIcon'

function App() {
  return (
    <Router>
      
        <Header />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/projects' element={<Project/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
        <MessageIcon/>
        <Footer />
    </Router>
  )
}

export default App