import React, { useState } from 'react'
import './about.css'
import "remixicon/fonts/remixicon.css";

function About() {
  const [currentFile, setCurrentFile] = useState('personal-info')
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isInterestOpen, setIsInterestOpen] = useState(false);
  const [isEducationOpen, setEducationOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [isSkillOpen, setIsSkillOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isMusicOpen, setIsMUsicOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isGamingOpen, setIsGamingOpen] = useState(false);

  return (
    <>
      <div className="desktop tw-flex">
        <div className="about-info tw-flex">
          <ul className='tw-flex tw-w-20'>
            <div className="icons tw-ml-2">
              <li className='tw-ml-2 tw-my-2' onClick={() => { setCurrentFile('professional-info') }}><i class={`ri-terminal-box-fill  ${currentFile == 'professional-info' ? 'tw-text-white' : 'tw-text-[#607B96]'}`}></i></li>
              <li className='tw-ml-2 tw-my-2' onClick={() => { setCurrentFile('personal-info') }}><i class={`ri-user-4-fill ${currentFile == 'personal-info' ? 'tw-text-white' : 'tw-text-[#607B96]'}`}></i></li>
              <li className='tw-ml-2 tw-my-2' onClick={() => { setCurrentFile('hobbies') }}><i class={`ri-gamepad-fill ${currentFile == 'hobbies' ? 'tw-text-white' : 'tw-text-[#607B96]'}`}></i></li>
            </div>
            <li className='tw-mx-8 separator2'></li>
          </ul>
          <div className="tw-flex tw-flex-col">
            <p className='tw-w-[176.5px] tw-text-white tw-text-[15px]'><i class="ri-arrow-down-s-fill tw-text-white"></i>{currentFile}</p>
            <hr className='about-hr'></hr>
            {currentFile == 'personal-info' &&
              <div className='personal-info tw-mt-5 tw-ml-1'>
                <ul>
                  <li className='tw-text-white' onClick={() => setIsBioOpen(!isBioOpen)}><i className={`ri-arrow-${isBioOpen ? 'down' : 'right'}-s-line tw-text-[#607B96] tw-text-[20px]`}></i><i class="ri-folder-6-fill tw-text-pink-400"></i> bio</li>
                  {isBioOpen &&
                    <ul className='tw-ml-5'>
                      <li className='tw-text-[16px] tw-text-[#607B96]'><i class="ri-id-card-line tw-text-[#607B96]"></i> cv</li>
                    </ul>
                  }
                  <li className='tw-text-[#607B96] tw-mt-0.5' onClick={() => { setIsInterestOpen(!isInterestOpen) }}><i className={`ri-arrow-${isInterestOpen ? 'down' : 'right'}-s-line tw-text-[#607B96] tw-text-[20px]`}></i><i class="ri-folder-6-fill tw-text-sky-500"></i> interest</li>
                  {isInterestOpen &&
                    <ul className='tw-ml-5'>
                      <li className='tw-text-[16px] tw-text-[#607B96]'><i class="ri-markdown-fill tw-text-[#607B96]"></i> my-interest</li>
                    </ul>
                  }
                  <li className='tw-text-[#607B96] tw-mt-0.5' onClick={() => { setEducationOpen(!isEducationOpen) }}><i className={`ri-arrow-${isEducationOpen ? 'down' : 'right'}-s-line tw-text-[#607B96] tw-text-[20px]`}></i><i class="ri-folder-6-fill tw-text-green-500"></i> education</li>
                  {isEducationOpen &&
                    <ul className='tw-ml-5'>
                      <li className='tw-text-[16px] tw-text-[#607B96]'><i class="ri-markdown-fill tw-text-[#607B96]"></i> school</li>
                      <li className='tw-text-[16px] tw-text-[#607B96]'><i class="ri-markdown-fill tw-text-[#607B96]"></i> high-school</li>
                      <li className='tw-text-[16px] tw-text-[#607B96]'><i class="ri-markdown-fill tw-text-[#607B96]"></i> univercity</li>
                    </ul>
                  }
                </ul>
              </div>
            }
            {currentFile == 'professional-info' &&
              <div className='professional-info tw-mt-5 tw-ml-1'>
                <ul>
                  <li className='tw-text-[#607B96]' onClick={() => { setIsExperienceOpen(!isExperienceOpen) }}><i className={`ri-arrow-${isExperienceOpen ? 'down' : 'right'}-s-line tw-text-[#607B96] tw-text-[20px]`}></i><i class="ri-folder-6-fill tw-text-pink-400"></i> experience</li>
                  <li className='tw-text-[#607B96] tw-mt-0.5' onClick={() => { setIsSkillOpen(!isSkillOpen) }}><i className={`ri-arrow-${isSkillOpen ? 'down' : 'right'}-s-line tw-text-[#607B96] tw-text-[20px]`}></i><i class="ri-folder-6-fill tw-text-sky-500"></i> skills</li>
                  <li className='tw-text-[#607B96] tw-mt-0.5' onClick={() => { setIsCertificateOpen(!isCertificateOpen) }}><i className={`ri-arrow-${isCertificateOpen ? 'down' : 'right'}-s-line tw-text-[#607B96] tw-text-[20px]`}></i><i class="ri-folder-6-fill tw-text-green-500"></i> certificate</li>
                </ul>
              </div>
            }
            {currentFile == 'hobbies' &&
              <div className='hobbies tw-mt-5 tw-ml-1'>
                <ul>
                  <li className='tw-text-[#607B96]' onClick={() => { setIsMUsicOpen(!isMusicOpen) }}><i className={`ri-arrow-${isMusicOpen ? 'down' : 'right'}-s-line tw-text-[#607B96] tw-text-[20px]`}></i><i class="ri-folder-6-fill tw-text-pink-400"></i> music</li>
                  <li className='tw-text-[#607B96] tw-mt-0.5' onClick={() => { setIsBookOpen(!isBookOpen) }}><i className={`ri-arrow-${isBookOpen ? 'down' : 'right'}-s-line tw-text-[#607B96] tw-text-[20px]`}></i><i class="ri-folder-6-fill tw-text-sky-500"></i> book</li>
                  <li className='tw-text-[#607B96] tw-mt-0.5' onClick={() => { setIsGamingOpen(!isGamingOpen) }}><i className={`ri-arrow-${isGamingOpen ? 'down' : 'right'}-s-line tw-text-[#607B96] tw-text-[20px]`}></i><i class="ri-folder-6-fill tw-text-green-500"></i> gaming</li>
                </ul>
              </div>
            }
          </div>
          <li className='tw-ml-8 separator2'></li>
        </div>
        <div className="about-details tw-flex tw-items-center tw-justify-center">
          {/* <li className='tw-ml-8 separator2'></li> */}
          <div className="details tw-w-[35em]">
            <div class="code-container">
              <pre className='tw-text-[14px]'>
                <p className='tw-text-[#607B96]'><span className='code-span'>  1  </span>/**</p>
                <p className='tw-text-[#607B96]'><span className='code-span'>  2  </span>* About me</p>
                <p className='tw-text-[#607B96]'><span className='code-span'>  3  </span>* I am a frontend developer with 1.5 years of experience</p>
                <p className='tw-text-[#607B96]'><span className='code-span'>  4  </span>* working on React-based dynamic projects. I started my</p>
                <p className='tw-text-[#607B96]'><span className='code-span'>  5  </span>* career creating static websites, eventually transitioning</p>
                <p className='tw-text-[#607B96]'><span className='code-span'>  6  </span>* to modern web applications with advanced frameworks.</p>
                <p className='tw-text-[#607B96]'><span className='code-span'>  7  </span>*</p>
                <p className='tw-text-[#607B96]'><span className='code-span'>  8  </span>* I am passionate about building scalable, responsive,</p>
                <p className='tw-text-[#607B96]'><span className='code-span'>  9  </span>* and user-friendly interfaces. With skills in React,</p>
                <p className='tw-text-[#607B96]'><span className='code-span'> 10  </span>* JavaScript, and Mongoose, I continuously strive to</p>
                <p className='tw-text-[#607B96]'><span className='code-span'> 11  </span>* improve and stay updated with the latest technologies.</p>
                <p className='tw-text-[#607B96]'><span className='code-span'> 12  </span>*</p>
                <p className='tw-text-[#607B96]'><span className='code-span'> 13  </span>* Currently, I am applying for full-time positions and</p>
                <p className='tw-text-[#607B96]'><span className='code-span'> 14  </span>* exploring opportunities to further my career in web</p>
                <p className='tw-text-[#607B96]'><span className='code-span'> 15  </span>* and mobile development.</p>
                <p className='tw-text-[#607B96]'><span className='code-span'> 16  </span>*/</p>
              </pre>
            </div>

          </div>
          <li className='tw-ml-8  separator2'></li>
          <li className='tw-ml-2 separator2'></li>

        </div>

      </div>
      <div className="mobile">
        <p className='tw-text-center'>Desktop version is constructing now</p>
      </div>
    </>
  )
}

export default About