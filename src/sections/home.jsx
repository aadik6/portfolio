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
          <p>
            <span className='tw-text-blue-600'>const </span>
            <span className='tw-text-green-500'>githubLink </span>
            <span className='tw-text-white'>= </span>
            <a href='https://github.com/aadik6'>
              <span className='git tw-text-pink-600'>https://www.github.com/aadik6</span></a></p>
        </div>
        <div className="rightCode">
          <div className="color1">
            <div className="blob">
              <svg className='svg' xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 350">
                <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
              </svg>
            </div>
          </div>
          <div className="color2">
            <div className="blob1">
              <svg className='svg' xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 350">
                <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home