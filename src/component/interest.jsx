import React from "react";
import "./interest.css";

const Interest = () => {
  return (
    <>
      <div className="desktop">
        <div className="interest-container">
          <div className="interest-scroll-wrapper">
            <div className="interest-section">
              <h2>
                <span className="tw-text-white">// interests</span>
              </h2>

              {/* Web Development */}
              <div className="interest-item">
                <div className="interest-header">
                  <h3 className="interest-title tw-text-white">
                    <i className="ri-code-s-slash-line tw-text-[#43D9AD] tw-mr-2"></i>
                    Web Development
                  </h3>
                </div>
                <p className="description tw-text-[#607B96]">
                  Passionate about creating responsive, user-friendly web
                  applications. I enjoy exploring new frameworks and
                  technologies to build efficient and scalable solutions.
                  Currently focused on MERN ecosystem and modern JavaScript.
                </p>
                <div className="tags">
                  <span className="tag">MERN</span>
                  <span className="tag">JavaScript</span>
                  <span className="tag">UI/UX</span>
                  <span className="tag">Responsive Design</span>
                </div>
              </div>

              {/* Mobile App Development */}
              <div className="interest-item">
                <div className="interest-header">
                  <h3 className="interest-title tw-text-white">
                    <i className="ri-smartphone-line tw-text-[#43D9AD] tw-mr-2"></i>
                    Mobile App Development
                  </h3>
                </div>
                <p className="description tw-text-[#607B96]">
                  Fascinated by the potential of cross-platform mobile
                  development. Learning React Native to build performant
                  applications that work seamlessly across different devices and
                  operating systems.
                </p>
                <div className="tags">
                  <span className="tag">React Native</span>
                  <span className="tag">Mobile UI</span>
                  <span className="tag">App Performance</span>
                </div>
              </div>

              {/* Open Source */}
              <div className="interest-item">
                <div className="interest-header">
                  <h3 className="interest-title tw-text-white">
                    <i className="ri-github-fill tw-text-[#43D9AD] tw-mr-2"></i>
                    Open Source Contribution
                  </h3>
                </div>
                <p className="description tw-text-[#607B96]">
                  Believe in the power of collaborative development and
                  knowledge sharing. Actively looking for opportunities to
                  contribute to open source projects that align with my skills
                  and interests.
                </p>
                <div className="tags">
                  <span className="tag">GitHub</span>
                  <span className="tag">Collaboration</span>
                  <span className="tag">Community</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical separator */}
          <div className="vertical-separator"></div>

          {/* Code snippet section */}
          <div className="interest-code-snippet">
            <pre>
              <code>
                <p className="tw-text-[#607B96]">
                  <span className="line-number">1</span>// interests.js
                </p>
                <div>
                  <span className="line-number">2</span>{" "}
                  <span className="keyword">const </span>{" "}
                  <span className="variable">myInterests</span> = {"{"}
                </div>
                <div>
                  <span className="line-number">3</span>{" "}
                  <span className="property">technical</span>: [
                </div>
                <div>
                  <span className="line-number">4</span>{" "}
                  <span className="string">'Web Development'</span>,
                </div>
                <div>
                  <span className="line-number">5</span>{" "}
                  <span className="string">'Mobile App Development'</span>,
                </div>
                <div>
                  <span className="line-number">6</span>{" "}
                  <span className="string">'UI/UX Design'</span>,
                </div>
                <div>
                  <span className="line-number">7</span>{" "}
                  <span className="string">'Open Source'</span>
                </div>
                <div>
                  <span className="line-number">8</span> ],
                </div>
                <div>
                  <span className="line-number">9</span>{" "}
                  <span className="property">learning</span>: [
                </div>
                <div>
                  <span className="line-number">10</span>{" "}
                  <span className="string">'React Native'</span>,
                </div>
                <div>
                  <span className="line-number">11</span>{" "}
                  <span className="string">'TypeScript'</span>,
                </div>
                <div>
                  <span className="line-number">12</span>{" "}
                  <span className="string">'AWS'</span>
                </div>
                <div>
                  <span className="line-number">13</span> ]
                </div>
                <div>
                  <span className="line-number">14</span>
                  {"}"}
                </div>
              </code>
            </pre>
          </div>
        </div>
      </div>
      <div className="mobile-text">
        <div className="interest-section">
          {/* Web Development */}
          <div className="interest-item">
            <div className="interest-header">
              <h3 className="interest-title tw-text-white">
                <i className="ri-code-s-slash-line tw-text-[#43D9AD] tw-mr-2"></i>
                Web Development
              </h3>
            </div>
            <p className="description tw-text-[#607B96]">
              Passionate about creating responsive, user-friendly web
              applications. I enjoy exploring new frameworks and technologies to
              build efficient and scalable solutions. Currently focused on MERN
              ecosystem and modern JavaScript.
            </p>
            <div className="tags">
              <span className="tag">MERN</span>
              <span className="tag">JavaScript</span>
              <span className="tag">UI/UX</span>
              <span className="tag">Responsive Design</span>
            </div>
          </div>

          {/* Mobile App Development */}
          <div className="interest-item">
            <div className="interest-header">
              <h3 className="interest-title tw-text-white">
                <i className="ri-smartphone-line tw-text-[#43D9AD] tw-mr-2"></i>
                Mobile App Development
              </h3>
            </div>
            <p className="description tw-text-[#607B96]">
              Fascinated by the potential of cross-platform mobile development.
              Learning React Native to build performant applications that work
              seamlessly across different devices and operating systems.
            </p>
            <div className="tags">
              <span className="tag">React Native</span>
              <span className="tag">Mobile UI</span>
              <span className="tag">App Performance</span>
            </div>
          </div>

          {/* Open Source */}
          <div className="interest-item">
            <div className="interest-header">
              <h3 className="interest-title tw-text-white">
                <i className="ri-github-fill tw-text-[#43D9AD] tw-mr-2"></i>
                Open Source Contribution
              </h3>
            </div>
            <p className="description tw-text-[#607B96]">
              Believe in the power of collaborative development and knowledge
              sharing. Actively looking for opportunities to contribute to open
              source projects that align with my skills and interests.
            </p>
            <div className="tags">
              <span className="tag">GitHub</span>
              <span className="tag">Collaboration</span>
              <span className="tag">Community</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Interest;
