import React from "react";
import "./experience.css";

const experiences = [
  {
    company: "Tezash Tech Pvt. Ltd.",
    role: "Frontend Developer",
    period: "2025 - Present",
    description:
      "Developed and maintained scalable web applications using Next.js, and REST APIs. Collaborated with backend teams and delivered features Health related platforms.",
    skills: ["React", "Next.js", "Tailwind CSS", "Bootstrap", "Git"],
  },
  {
    company: "LennoByte Pvt. Ltd.",
    role: "Frontend Developer",
    period: "2022 - 2024",
    description:
      "Developed and maintained scalable web applications using React, Redux, and REST APIs. Collaborated with backend teams and delivered features for e-commerce and news platforms.",
    skills: ["React", "REST API", "Tailwind CSS", "Git"],
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "2021 - 2022",
    description:
      "Built responsive websites and dashboards for local clients. Specialized in React, Firebase, and modern JavaScript frameworks.",
    skills: ["HTML", "Firebase", "JavaScript", "CSS"],
  },
];

const Experience = () => {
  return (
    <>
      <div className="desktop">
        <div className="experience-container">
          <div className="experience-scroll-wrapper">
            <div className="experience-section">
              <h2>
                <span className="tw-text-white">// experience</span>
              </h2>
              {experiences.map((exp, idx) => (
                <div key={idx} className="experience-item">
                  <div className="experience-header">
                    <span className="date">{exp.period}</span>
                    <h3 className="company tw-text-white">{exp.company}</h3>
                    <span className="role tw-text-[#43D9AD]">{exp.role}</span>
                  </div>
                  <p className="description tw-text-[#607B96]">
                    {exp.description}
                  </p>
                  <div className="skills">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical separator */}
          <div className="vertical-separator"></div>

          {/* Code snippet section */}
          <div className="experience-code-snippet">
            <pre>
              <code>
                <span className="tw-text-[#607B96]">
                  <span className="line-number">1</span>// experience.js
                </span>
                <br />
                <span className="line-number">2</span>{" "}
                <span className="keyword">const </span>
                <span className="variable">experience</span> = [<br />
                <span className="line-number">3</span> {"{"}{" "}
                <span className="property">company</span>:{" "}
                <span className="string">'Tezash Tech Pvt. Ltd.'</span>,<br />
                <span className="line-number">4</span>{" "}
                <span className="property">role</span>:{" "}
                <span className="string">'Frontend Developer'</span>,<br />
                <span className="line-number">5</span>{" "}
                <span className="property">period</span>:{" "}
                <span className="string">'2025 - Present'</span>,<br />
                <span className="line-number">6</span>{" "}
                <span className="property">skills</span>: [
                <span className="string">'React'</span>,{" "}
                <span className="string">'Next.js'</span>,{" "}
                <span className="string">'Bootstrap'</span>]<br />
                <span className="line-number">7</span> {"},"}
                <br />
                <span className="line-number">8</span> {"{"}{" "}
                <span className="property">company</span>:{" "}
                <span className="string">'LennoByte Pvt. Ltd.'</span>,<br />
                <span className="line-number">9</span>{" "}
                <span className="property">role</span>:{" "}
                <span className="string">'Frontend Developer'</span>,<br />
                <span className="line-number">10</span>{" "}
                <span className="property">period</span>:{" "}
                <span className="string">'2022 - 2024'</span>,<br />
                <span className="line-number">11</span>{" "}
                <span className="property">skills</span>: [
                <span className="string">'React'</span>,{" "}
                <span className="string">'Tailwind CSS'</span>,{" "}
                <span className="string">'Git'</span>]<br />
                <span className="line-number">12</span> {"},"}
                <br />
                <span className="line-number">13</span> {"{"}{" "}
                <span className="property">company</span>:{" "}
                <span className="string">'Freelance'</span>,<br />
                <span className="line-number">14</span>{" "}
                <span className="property">role</span>:{" "}
                <span className="string">'Web Developer'</span>,<br />
                <span className="line-number">15</span>{" "}
                <span className="property">period</span>:{" "}
                <span className="string">'2021 - 2022'</span>,<br />
                <span className="line-number">16</span>{" "}
                <span className="property">skills</span>: [{" "}
                <span className="string">'Firebase'</span>,{" "}
                <span className="string">'JavaScript'</span>,{" "}
                <span className="string">'CSS'</span>]<br />
                <span className="line-number">17</span> {"}"}
                <br />
                <span className="line-number">18</span> ]<br />
              </code>
            </pre>
          </div>
        </div>
      </div>
      <div className="mobile-text">
        <div className="experience-section">
          {experiences.map((exp, idx) => (
            <div key={idx} className="experience-item">
              <div className="experience-header">
                <span className="date">{exp.period}</span>
                <h3 className="company tw-text-white">{exp.company}</h3>
                <span className="role tw-text-[#43D9AD]">{exp.role}</span>
              </div>
              <p className="description tw-text-[#607B96]">
                {exp.description}
              </p>
              <div className="skills">
                {exp.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Experience;
