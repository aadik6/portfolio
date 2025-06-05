import React from 'react'
import './skills.css'

const Skills = () => {
  // Skill categories with proficiency levels
  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        { name: "React", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "HTML5", level: 95 },
        { name: "CSS3/SASS", level: 90 },
        { name: "Tailwind CSS", level: 88 },
        { name: "Zustand", level: 75 }
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", level: 70 },
        { name: "Express", level: 65 },
        { name: "MongoDB", level: 75 },
        { name: "PHP", level: 60 }
      ]
    },
    {
      category: "Tools & Others",
      skills: [
        { name: "Git", level: 80 },
        { name: "GitHub", level: 85 },
        { name: "Webpack", level: 65 },
        { name: "Figma", level: 70 },
        { name: "Responsive Design", level: 90 }
      ]
    }
  ]

  return (
    <div className="skills-container">
      <div className="skills-scroll-wrapper">
        <div className="skills-section">
          <h2><span className="tw-text-white">// skills</span></h2>
          
          {skillCategories.map((category, index) => (
            <div className="skill-category" key={index}>
              <h3 className="category-title">
                <i className={`ri-code-${index === 0 ? 's-slash' : index === 1 ? 'box' : 'line'}-fill tw-text-[#43D9AD] tw-mr-2`}></i>
                <span className="tw-text-white">{category.category}</span>
              </h3>
              
              <div className="skills-grid">
                {category.skills.map((skill, skillIndex) => (
                  <div className="skill-item" key={skillIndex}>
                    <div className="skill-header tw-bg-[#011221]">
                      <span className="skill-name tw-text-[#607B96]">{skill.name}</span>
                      <span className="skill-level tw-text-[#607B96]">{skill.level}%</span>
                    </div>
                    <div className="skill-bar-bg">
                      <div 
                        className="skill-bar-fill" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="currently-learning">
            <h3 className="tw-text-white tw-mb-3">
              <i className="ri-lightbulb-flash-line tw-text-[#E99287] tw-mr-2 tw-bg-transparent"></i>
              <span>Currently Learning</span>
            </h3>
            <div className="learning-tags">
              <span className="learning-tag">TypeScript</span>
              <span className="learning-tag">Next.js</span>
              <span className="learning-tag">React Native</span>
              <span className="learning-tag">AWS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical separator */}
      <div className="vertical-separator"></div>

      {/* Code snippet section */}
      <div className="skills-code-snippet">
        <pre>
          <code>
            <p className="tw-text-[#607B96]"><span className="line-number">1</span>// skills.js</p>
            <div><span className="line-number">2</span> <span className="keyword">const </span> <span className="variable">mySkills</span> = {"{"}</div>
            <div><span className="line-number">3</span>   <span className="property">expertise</span>: [</div>
            <div><span className="line-number">4</span>     <span className="string">'React'</span>,</div>
            <div><span className="line-number">5</span>     <span className="string">'JavaScript'</span>,</div>
            <div><span className="line-number">6</span>     <span className="string">'HTML/CSS'</span>,</div>
            <div><span className="line-number">7</span>     <span className="string">'Tailwind CSS'</span></div>
            <div><span className="line-number">8</span>   ],</div>
            <div><span className="line-number">9</span>   <span className="property">comfortable</span>: [</div>
            <div><span className="line-number">10</span>     <span className="string">'Node.js'</span>,</div>
            <div><span className="line-number">11</span>     <span className="string">'Express'</span>,</div>
            <div><span className="line-number">12</span>     <span className="string">'MongoDB'</span></div>
            <div><span className="line-number">13</span>   ],</div>
            <div><span className="line-number">14</span>   <span className="property">familiar</span>: [<span className="string">'PHP'</span>],</div>
            <div><span className="line-number">15</span>   <span className="property">learning</span>: [</div>
            <div><span className="line-number">16</span>     <span className="string">'TypeScript'</span>,<span className="string">'Next.js'</span></div>
            <div><span className="line-number">17</span>   ]</div>
            <div><span className="line-number">18</span>{"}"}</div>
          </code>
        </pre>
      </div>
    </div>
  )
}

export default Skills