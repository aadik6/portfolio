import React from 'react'
import './home.css'


function Home() { 
  return (
    <>
      <div className="home tw-flex tw-justify-center">
        <div className="leftText">
          <p className='geet tw-text-white tw-text-lg'>Hi all, I am</p>
          <h1 className='name tw-text-white tw-text-5xl'>Aadarsh Kushwaha</h1>
          <h3 className='roll tw-text-blue-700 tw-text-3xl'> Front-end developer</h3>
          <p className='tw-mt-12 tw-text-[#607B96]'>//Find my profile on github</p>
          <p><span className='tw-text-blue-600'>const </span><span className='tw-text-green-500'>githubLink </span><span className='tw-text-white'>= </span><a href='https://github.com/aadik6'><span className='tw-text-pink-600'>https://www.github.com/aadik6</span></a></p>
        </div>
        <div className="rightCode">
            <div className="color1"></div>
            <div className="color2"></div>
        </div>
      </div>
    </>
  )
}

export default Home