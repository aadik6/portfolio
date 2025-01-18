import React from 'react'
import Home from './sections/home'
import Header from './component/header'
import Footer from './component/footer'
import './App.css'

function App() {
  return (
    <>
      <div className='parent-app'>
        <Header />
        <div className='section'>
          <Home />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App