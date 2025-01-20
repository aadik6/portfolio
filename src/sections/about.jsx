import React, { useState } from 'react'
import './about.css'
import "remixicon/fonts/remixicon.css";

function About() {
  const [currentFile, setCurrentFile] = useState('personal-info')
  return (
    <>
      <div className="desktop">
        <div className="about-info tw-flex">
          <ul className='tw-flex tw-w-20'>
            <div className="icons tw-ml-2">
              <li className='tw-ml-2 tw-my-2' onClick={()=>{setCurrentFile('professional-info')}}><i class="ri-terminal-box-fill footer-icon"></i></li>
              <li className='tw-ml-2 tw-my-2' onClick={()=>{setCurrentFile('personal-info')}}><i class="ri-user-4-fill footer-icon"></i></li>
              <li className='tw-ml-2 tw-my-2' onClick={()=>{setCurrentFile('hobbies')}}><i class="ri-gamepad-fill footer-icon"></i></li>
            </div>
            <li className='tw-mx-8 separator2'></li>
          </ul>
          <div className="tw-flex tw-flex-col">
            <p className='tw-w-[176.5px] tw-text-white tw-text-[15px]'><i class="ri-arrow-down-s-fill"></i>{currentFile}</p>
            <hr className='about-hr'></hr>
          </div>
          <li className='tw-mx-8 separator2'></li>
        </div>

      </div>
    </>
  )
}

export default About