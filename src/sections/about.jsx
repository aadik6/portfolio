import React, { useState } from 'react'
import './about.css'
import "remixicon/fonts/remixicon.css";

function About() {
  const [currentFile, setCurrentFile] = useState('personal-info')
  const [isBioOpen,setIsBioOpen] = useState(false);
  const [isInterestOpen,setIsInterestOpen] = useState(false);
  const [isEducationOpen,setEducationOpen] = useState(false);
  const [isExperienceOpen,setIsExperienceOpen] = useState(false);
  const [isSkillOpen,setIsSkillOpen] = useState(false);
  const [isCertificateOpen,setIsCertificateOpen] = useState(false); 
  const [isMusicOpen,setIsMUsicOpen] = useState(false);
  const [isBookOpen,setIsBookOpen] = useState(false);
  const [isGamingOpen,setIsGamingOpen] = useState(false);  

  return (
    <>
      <div className="desktop">
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
                  <li className='tw-text-white' onClick={()=>setIsBioOpen(!isBioOpen)}><i className={`ri-arrow-${isBioOpen?'down':'right'}-s-line tw-text-[#607B96] tw-text-[20px]`}></i><i class="ri-folder-6-fill tw-text-pink-400"></i> bio</li>
                    {isBioOpen &&
                    <ul className='tw-ml-5'>
                      <li className='tw-text-[16px] tw-text-[#607B96]'><i class="ri-id-card-line tw-text-[#607B96]"></i> cv</li>
                    </ul>
                    }
                  <li className='tw-text-white tw-mt-1' onClick={()=>{setIsInterestOpen(!isInterestOpen)}}><i className={`ri-arrow-${isInterestOpen?'down':'right'}-s-line tw-text-[#607B96] tw-text-[20px]`}></i><i class="ri-folder-6-fill tw-text-sky-500"></i> interest</li>
                  {isInterestOpen &&
                    <ul className='tw-ml-5'>
                      <li className='tw-text-[16px] tw-text-[#607B96]'><i class="ri-markdown-fill tw-text-[#607B96]"></i> my-interest</li>
                    </ul>
                  }
                  <li className='tw-text-white tw-mt-1' onClick={()=>{setEducationOpen(!isEducationOpen)}}><i className={`ri-arrow-${isEducationOpen?'down':'right'}-s-line tw-text-[#607B96] tw-text-[20px]`}></i><i class="ri-folder-6-fill tw-text-green-500"></i> education</li>
                  {isEducationOpen&&
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
                  <li className='tw-text-white' onClick={()=>{setIsExperienceOpen(!isExperienceOpen)}}><i className={`ri-arrow-${isExperienceOpen?'down':'right'}-s-line tw-text-[#607B96] tw-text-[20px]`}></i><i class="ri-folder-6-fill tw-text-pink-400"></i> experience</li>
                  <li className='tw-text-white tw-mt-1' onClick={()=>{setIsSkillOpen(!isSkillOpen)}}><i className={`ri-arrow-${isSkillOpen?'down':'right'}-s-line tw-text-[#607B96] tw-text-[20px]`}></i><i class="ri-folder-6-fill tw-text-sky-500"></i> skills</li>
                  <li className='tw-text-white tw-mt-1' onClick={()=>{setIsCertificateOpen(!isCertificateOpen)}}><i className={`ri-arrow-${isCertificateOpen?'down':'right'}-s-line tw-text-[#607B96] tw-text-[20px]`}></i><i class="ri-folder-6-fill tw-text-green-500"></i> certificate</li>
                </ul>
              </div>
            }
            {currentFile == 'hobbies' &&
              <div className='hobbies tw-mt-5 tw-ml-1'>
                <ul>
                  <li className='tw-text-white' onClick={()=>{setIsMUsicOpen(!isMusicOpen)}}><i className={`ri-arrow-${isMusicOpen?'down':'right'}-s-line tw-text-[#607B96] tw-text-[20px]`}></i><i class="ri-folder-6-fill tw-text-pink-400"></i> music</li>
                  <li className='tw-text-white tw-mt-1' onClick={()=>{setIsBookOpen(!isBookOpen)}}><i className={`ri-arrow-${isBookOpen?'down':'right'}-s-line tw-text-[#607B96] tw-text-[20px]`}></i><i class="ri-folder-6-fill tw-text-sky-500"></i> book</li>
                  <li className='tw-text-white tw-mt-1' onClick={()=>{setIsGamingOpen(!isGamingOpen)}}><i className={`ri-arrow-${isGamingOpen?'down':'right'}-s-line tw-text-[#607B96] tw-text-[20px]`}></i><i class="ri-folder-6-fill tw-text-green-500"></i> gaming</li>
                </ul>
              </div>
            }
          </div>
          <li className='tw-mx-8 separator2'></li>
        </div>

      </div>
      <div className="mobile">
        <p className='tw-text-center'>Desktop version is constructing now</p>
      </div>
    </>
  )
}

export default About