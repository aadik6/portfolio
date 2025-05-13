import React from 'react'
import './education.css'

const Education = () => {
  return (
    <div className="education-container">
      <div className="education-scroll-wrapper">
        <div className="education-section">
          <h2><span className="tw-text-white">// education</span></h2>
          
          {/* University */}
          <div className="education-item">
            <div className="education-header">
              <span className="date">2021 - current</span>
              <h3 className="institution tw-text-white">Tribhuvan University</h3>
              <span className="degree tw-text-[#43D9AD]">Bachelor in Computer Application</span>
            </div>
            <p className="description tw-text-[#607B96]">
              pursuing a four-year degree program with focus on programming, data structures, 
              algorithms, database systems, and software engineering principles.
            </p>
            <div className="skills">
              <span className="skill-tag">Data Structures</span>
              <span className="skill-tag">Java</span>
              <span className="skill-tag">Javascript</span>
              <span className="skill-tag">Database Design</span>
            </div>
          </div>

          {/* High School */}
          <div className="education-item">
            <div className="education-header">
              <span className="date">2019 - 2021</span>
              <h3 className="institution tw-text-white">Makwanpur Multiple Campus Hetauda</h3>
              <span className="degree tw-text-[#43D9AD]">Higher Secondary Education in Science</span>
            </div>
            <p className="description tw-text-[#607B96]">
              Completed two years of higher secondary education with concentration on Physics, 
              Chemistry, Mathematics and Computer Science.
            </p>
            <div className="skills">
              <span className="skill-tag">Mathematics</span>
              <span className="skill-tag">Physics</span>
              <span className="skill-tag">Basic Programming</span>
            </div>
          </div>

          {/* School */}
          <div className="education-item">
            <div className="education-header">
              <span className="date">2008 - 2019</span>
              <h3 className="institution tw-text-white">Shree Nepal Secondry School Khajani</h3>
              <span className="degree tw-text-[#43D9AD]">School Leaving Certificate</span>
            </div>
            <p className="description tw-text-[#607B96]">
              Completed primary and secondary education with distinction, establishing a strong 
              foundation in mathematics, science, and computer literacy.
            </p>
            <div className="skills">
              <span className="skill-tag">Mathematics</span>
              <span className="skill-tag">Science</span>
              <span className="skill-tag">Computer Basics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical separator */}
      <div className="vertical-separator"></div>

      {/* Code snippet section similar to other pages */}
      <div className="education-code-snippet">
        <pre>
          <code>
            <p className="tw-text-[#607B96]"><span className="line-number">1</span>// education.js</p>
            <div><span className="line-number">2</span> <span className="keyword">const </span> <span className="variable">education</span> = {"{"}</div>
            <div><span className="line-number">3</span>   <span className="property">university</span>: {"{"}</div>
            <div><span className="line-number">4</span>     <span className="property">name</span>: <span className="string">'Tribhuvan University'</span>,</div>
            <div><span className="line-number">5</span>     <span className="property">degree</span>: <span className="string">'BCA'</span>,</div>
            <div><span className="line-number">6</span>     <span className="property">year</span>: <span className="string">'2021-current'</span></div>
            <div><span className="line-number">7</span>   {"}"},</div>
            <div><span className="line-number">8</span>   <span className="property">highSchool</span>: {"{"}</div>
            <div><span className="line-number">9</span>     <span className="property">name</span>: <span className="string">'MMC-Hetauda'</span>,</div>
            <div><span className="line-number">10</span>    <span className="property">program</span>: <span className="string">'Higher Secondary'</span>,</div>
            <div><span className="line-number">11</span>    <span className="property">year</span>: <span className="string">'2019-2021'</span></div>
            <div><span className="line-number">12</span>  {"}"}</div>
            <div><span className="line-number">13</span>{"}"}</div>
          </code>
        </pre>
      </div>
    </div>
  )
}

export default Education