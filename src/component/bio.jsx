import React from 'react'
import "./bio.css"
import cv from "../assets/Aadarsh-cv.pdf"

const Bio = () => {
  return (
    <div className="bio-container">
      <div className="bio-scroll-wrapper">
        <div className="bio-section">
          <h2><span className="tw-text-white">// about-me</span></h2>
          
          <div className="bio-item">
            <div className="bio-header">
              <h3 className="bio-title tw-text-white">
                <i className="ri-user-3-fill tw-text-[#43D9AD] tw-mr-2"></i>
                Aadarsh Kushwaha
              </h3>
              <span className="role tw-text-[#607B96]">Frontend Developer</span>
            </div>
            
            <div className="bio-content">
              <p className="tw-text-[#607B96] tw-mb-4">
                I am a frontend developer with 2+ years of experience working on React-based dynamic projects. 
                I started my career creating static websites, eventually transitioning to modern web applications 
                with advanced frameworks.
              </p>
              
              <p className="tw-text-[#607B96] tw-mb-4">
                I am passionate about building scalable, responsive, and user-friendly interfaces. With skills 
                in React, JavaScript, and Mongoose, I continuously strive to improve and stay updated with 
                the latest technologies.
              </p>
              
              <p className="tw-text-[#607B96] tw-mb-4">
                Currently, I am applying for full-time positions and exploring opportunities to further my 
                career in web development.
              </p>
            </div>
            
            <div className="bio-highlights">
              <h4 className="tw-text-white tw-text-sm tw-mb-2">// highlights</h4>
              <ul>
                <li className="tw-text-[#607B96]"><span className="tw-text-[#E99287]">▹</span> Specialized in React and modern JavaScript frameworks</li>
                <li className="tw-text-[#607B96]"><span className="tw-text-[#E99287]">▹</span> Experience with responsive design and cross-browser compatibility</li>
                <li className="tw-text-[#607B96]"><span className="tw-text-[#E99287]">▹</span> Strong problem-solving skills and attention to detail</li>
                <li className="tw-text-[#607B96]"><span className="tw-text-[#E99287]">▹</span> Collaborative team player with excellent communication</li>
              </ul>
            </div>
            
            <div className="bio-cv-section">
              <h4 className="tw-text-white tw-text-sm tw-mb-2">// resume</h4>
              <a href={cv} download className="cv-download-btn">
                <i className="ri-file-download-line tw-mr-2 tw-bg-[#1E2D3D]"></i>
                <span>download_cv.pdf</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical separator */}
      <div className="vertical-separator"></div>

      {/* Code snippet section */}
      <div className="bio-code-snippet">
        <pre>
          <code>
            <p className="tw-text-[#607B96]"><span className="line-number">1</span>// bio.js</p>
            <div><span className="line-number">2</span> <span className="keyword">const</span> <span className="variable">aadarsh</span> = {"{"}</div>
            <div><span className="line-number">3</span>   <span className="property">name</span>: <span className="string">'Aadarsh Kushwaha'</span>,</div>
            <div><span className="line-number">4</span>   <span className="property">title</span>: <span className="string">'Frontend Developer'</span>,</div>
            <div><span className="line-number">5</span>   <span className="property">skills</span>: [</div>
            <div><span className="line-number">6</span>     <span className="string">'React'</span>,</div>
            <div><span className="line-number">7</span>     <span className="string">'JavaScript'</span>,</div>
            <div><span className="line-number">8</span>     <span className="string">'CSS/Tailwind'</span>,</div>
            <div><span className="line-number">9</span>     <span className="string">'Responsive Design'</span></div>
            <div><span className="line-number">10</span>   ],</div>
            <div><span className="line-number">11</span>   <span className="property">getResume</span>: <span className="keyword">{"() =>"}</span> {"{"}  </div>
            <div><span className="line-number">12</span>     <span className="keyword">return</span> <span className="string">'download_cv.pdf'</span>;</div>
            <div><span className="line-number">13</span>   {"}"}</div>
            <div><span className="line-number">14</span>{"}"}</div>
          </code>
        </pre>
      </div>
    </div>
  )
}

export default Bio