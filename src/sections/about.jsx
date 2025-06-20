import React, { useState } from "react";
import "./about.css";
import "remixicon/fonts/remixicon.css";
import MobileFooter from "../component/mobileFooter";
import Bio from "../component/bio";
import Interest from "../component/interest";
import Education from "../component/education";
import Skills from "../component/skills";
import Experience from "../component/experience";
import Certificate from "../component/certificate";

function About() {
  const [currentFile, setCurrentFile] = useState("personal-info");
  const [currentPage, setCurrentPage] = useState("bio");
  const [isBioOpen, setIsBioOpen] = useState(true);
  const [isInterestOpen, setIsInterestOpen] = useState(false);
  const [isEducationOpen, setEducationOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [isSkillOpen, setIsSkillOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isMusicOpen, setIsMUsicOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isGamingOpen, setIsGamingOpen] = useState(false);
  const [isMobbilePersonalOpen, setIsMobilePersonalOpen] = useState(false);
  const [isMobbileProfessionalOpen, setIsMobileProfessionalOpen] =
    useState(false);
  const [isMobileHobbiesOpen, setIsMobileHobbiesOpen] = useState(false);

  return (
    <>
      <div className="desktop tw-flex">
        <div className="about-info tw-flex">
          <ul className="tw-flex tw-w-20">
            <div className="icons tw-ml-2">
              <li
                className="tw-ml-2 tw-my-2"
                onClick={() => {
                  setCurrentFile("professional-info");
                }}
              >
                <i
                  class={`ri-terminal-box-fill  ${
                    currentFile == "professional-info"
                      ? "tw-text-white"
                      : "tw-text-[#607B96]"
                  }`}
                ></i>
              </li>
              <li
                className="tw-ml-2 tw-my-2"
                onClick={() => {
                  setCurrentFile("personal-info");
                }}
              >
                <i
                  class={`ri-user-4-fill ${
                    currentFile == "personal-info"
                      ? "tw-text-white"
                      : "tw-text-[#607B96]"
                  }`}
                ></i>
              </li>
              <li
                className="tw-ml-2 tw-my-2"
                onClick={() => {
                  setCurrentFile("hobbies");
                }}
              >
                <i
                  class={`ri-gamepad-fill ${
                    currentFile == "hobbies"
                      ? "tw-text-white"
                      : "tw-text-[#607B96]"
                  }`}
                ></i>
              </li>
            </div>
            <li className="tw-mx-8 separator2"></li>
          </ul>
          <div className="tw-flex tw-flex-col">
            <p className="tw-w-[176.5px] tw-text-white tw-text-[15px]">
              <i class="ri-arrow-down-s-fill tw-text-white"></i>
              {currentFile}
            </p>
            <hr className="about-hr"></hr>
            {currentFile == "personal-info" && (
              <div className="personal-info tw-mt-5 tw-ml-1">
                <ul>
                  <li
                    className="tw-text-white"
                    onClick={() => {
                      setCurrentPage("bio");
                    }}
                  >
                    <i
                      className={`ri-arrow-${
                        isBioOpen ? "down" : "right"
                      }-s-line tw-text-[#607B96] tw-text-[20px]`}
                    ></i>
                    <i class="ri-folder-6-fill tw-text-pink-400"></i> bio
                  </li>
                  {/* {isBioOpen &&
                    <ul className='tw-ml-5'>
                      <li className='tw-text-[16px] tw-text-[#607B96]'><i class="ri-id-card-line tw-text-[#607B96]"></i> cv</li>
                    </ul>
                  } */}
                  <li
                    className={`${
                      isInterestOpen ? "tw-text-white" : "tw-text-[#607B96]"
                    } tw-mt-0.5`}
                    onClick={() => {
                      setIsInterestOpen(!isInterestOpen);
                      setCurrentPage("interest");
                    }}
                  >
                    <i
                      className={`ri-arrow-${
                        isInterestOpen ? "down" : "right"
                      }-s-line ${
                        isInterestOpen ? "tw-text-white" : "tw-text-[#607B96]"
                      }  tw-text-[20px]`}
                    ></i>
                    <i class="ri-folder-6-fill tw-text-sky-500"></i> interest
                  </li>
                  {isInterestOpen && (
                    <ul className="tw-ml-5">
                      <li className="tw-text-[16px] tw-text-[#607B96]">
                        <i class="ri-markdown-fill tw-text-[#607B96]"></i>{" "}
                        my-interest
                      </li>
                    </ul>
                  )}
                  <li
                    className={`${
                      isEducationOpen ? "tw-text-white" : "tw-text-[#607B96]"
                    } tw-mt-0.5`}
                    onClick={() => {
                      setEducationOpen(!isEducationOpen);
                      setCurrentPage("education");
                    }}
                  >
                    <i
                      className={`ri-arrow-${
                        isEducationOpen ? "down" : "right"
                      }-s-line tw-text-[#607B96] tw-text-[20px]`}
                    ></i>
                    <i class="ri-folder-6-fill tw-text-green-500"></i> education
                  </li>
                  {isEducationOpen && (
                    <ul className="tw-ml-5">
                      <li className="tw-text-[16px] tw-text-[#607B96]">
                        <i class="ri-markdown-fill tw-text-[#607B96]"></i>{" "}
                        univercity
                      </li>
                      <li className="tw-text-[16px] tw-text-[#607B96]">
                        <i class="ri-markdown-fill tw-text-[#607B96]"></i>{" "}
                        high-school
                      </li>
                      <li className="tw-text-[16px] tw-text-[#607B96]">
                        <i class="ri-markdown-fill tw-text-[#607B96]"></i>{" "}
                        school
                      </li>
                    </ul>
                  )}
                </ul>
              </div>
            )}
            {currentFile == "professional-info" && (
              <div className="professional-info tw-mt-5 tw-ml-1">
                <ul>
                  <li
                    className={`${
                      currentPage === "experience"
                        ? "tw-text-white"
                        : "tw-text-[#607B96]"
                    } tw-mt-0.5`}
                    onClick={() => {
                      setIsExperienceOpen(!isExperienceOpen);
                      setCurrentPage("experience");
                    }}
                  >
                    <i
                      className={`ri-arrow-${
                        isExperienceOpen ? "down" : "right"
                      }-s-line tw-text-[#607B96] tw-text-[20px]`}
                    ></i>
                    <i class="ri-folder-6-fill tw-text-pink-400"></i> experience
                  </li>
                  <li
                    className={`${
                      currentPage === "skills"
                        ? "tw-text-white"
                        : "tw-text-[#607B96]"
                    } tw-mt-0.5`}
                    onClick={() => {
                      setIsSkillOpen(!isSkillOpen);
                      setCurrentPage("skills");
                    }}
                  >
                    <i
                      className={`ri-arrow-${
                        isSkillOpen ? "down" : "right"
                      }-s-line tw-text-[#607B96] tw-text-[20px]`}
                    ></i>
                    <i class="ri-folder-6-fill tw-text-sky-500"></i> skills
                  </li>
                  <li
                    className={`${
                      currentPage === "certificate"
                        ? "tw-text-white"
                        : "tw-text-[#607B96]"
                    } tw-mt-0.5`}
                    onClick={() => {
                      setIsCertificateOpen(!isCertificateOpen);
                      setCurrentPage("certificate");
                    }}
                  >
                    <i
                      className={`ri-arrow-${
                        isCertificateOpen ? "down" : "right"
                      }-s-line tw-text-[#607B96] tw-text-[20px]`}
                    ></i>
                    <i class="ri-folder-6-fill tw-text-green-500"></i>{" "}
                    certificate
                  </li>
                </ul>
              </div>
            )}
            {currentFile == "hobbies" && (
              <div className="hobbies tw-mt-5 tw-ml-1">
                <ul>
                  <li
                    className="tw-text-[#607B96]"
                    onClick={() => {
                      setIsMUsicOpen(!isMusicOpen);
                    }}
                  >
                    <i
                      className={`ri-arrow-${
                        isMusicOpen ? "down" : "right"
                      }-s-line tw-text-[#607B96] tw-text-[20px]`}
                    ></i>
                    <i class="ri-folder-6-fill tw-text-pink-400"></i> music
                  </li>
                  <li
                    className="tw-text-[#607B96] tw-mt-0.5"
                    onClick={() => {
                      setIsBookOpen(!isBookOpen);
                    }}
                  >
                    <i
                      className={`ri-arrow-${
                        isBookOpen ? "down" : "right"
                      }-s-line tw-text-[#607B96] tw-text-[20px]`}
                    ></i>
                    <i class="ri-folder-6-fill tw-text-sky-500"></i> book
                  </li>
                  <li
                    className="tw-text-[#607B96] tw-mt-0.5"
                    onClick={() => {
                      setIsGamingOpen(!isGamingOpen);
                    }}
                  >
                    <i
                      className={`ri-arrow-${
                        isGamingOpen ? "down" : "right"
                      }-s-line tw-text-[#607B96] tw-text-[20px]`}
                    ></i>
                    <i class="ri-folder-6-fill tw-text-green-500"></i> gaming
                  </li>
                </ul>
              </div>
            )}
          </div>
          <li className="tw-ml-8 separator2"></li>
        </div>
        <div className="about-details tw-flex tw-items-center tw-justify-center tw-container">
          {/* <li className='tw-ml-8 separator2'></li> */}
          {currentPage === "bio" && <Bio />}
          {currentPage === "interest" && <Interest />}
          {currentPage === "education" && <Education />}
          {currentPage === "skills" && <Skills />}
          {currentPage === "experience" && <Experience />}
          {currentPage === "certificate" && <Certificate />}
        </div>
      </div>
      <div className="mobile">
        <div className="top-about tw-sticky tw-top-0">
          <p className="tw-mt-3 tw-ml-5 tw-text-white">_about-me</p>
          <div className="mobile-personal-info tw-mt-3">
            <span
              className="tw-text-white tw-bg-[#1E2D3D]  tw-block"
              onClick={() => {
                setIsMobilePersonalOpen(!isMobbilePersonalOpen);
              }}
            >
              <i
                className={`ri-arrow-${
                  isMobbilePersonalOpen ? "down" : "right"
                }-s-fill tw-text-white tw-bg-[#1E2D3D] tw-ml-5`}
              ></i>
              personal-info
            </span>
            {isMobbilePersonalOpen && (
              <ul className="tw-ml-5">
                <li
                  className="tw-text-white"
                  onClick={() => setIsBioOpen(!isBioOpen)}
                >
                  <i
                    className={`ri-arrow-${
                      isBioOpen ? "down" : "right"
                    }-s-line tw-text-[#607B96] tw-text-[20px]`}
                  ></i>
                  <i class="ri-folder-6-fill tw-text-pink-400"></i> bio
                </li>
                {isBioOpen && (
                  <ul className="tw-ml-5">
                    <li className="tw-text-[16px] tw-text-[#607B96]">
                      <i class="ri-id-card-line tw-text-[#607B96]"></i> cv
                    </li>
                  </ul>
                )}
                <li
                  className={`tw-text-${
                    isInterestOpen ? "white" : "[#607B96]"
                  }`}
                  onClick={() => {
                    setIsInterestOpen(!isInterestOpen);
                  }}
                >
                  <i
                    className={`ri-arrow-${
                      isInterestOpen ? "down" : "right"
                    }-s-line tw-text-[#607B96] tw-text-[20px]`}
                  ></i>
                  <i class="ri-folder-6-fill tw-text-sky-500"></i> interest
                </li>
                {isInterestOpen && (
                  <ul className="tw-ml-5">
                    <li className="tw-text-[16px] tw-text-[#607B96]">
                      <i class="ri-markdown-fill tw-text-[#607B96]"></i>{" "}
                      my-interest
                    </li>
                  </ul>
                )}
                <li
                  className={`tw-text-${
                    isEducationOpen ? "white" : "[#607B96]"
                  }`}
                  onClick={() => {
                    setEducationOpen(!isEducationOpen);
                  }}
                >
                  <i
                    className={`ri-arrow-${
                      isEducationOpen ? "down" : "right"
                    }-s-line tw-text-[#607B96] tw-text-[20px]`}
                  ></i>
                  <i class="ri-folder-6-fill tw-text-green-500"></i> education
                </li>
                {isEducationOpen && (
                  <ul className="tw-ml-5">
                    <li className="tw-text-[16px] tw-text-[#607B96]">
                      <i class="ri-markdown-fill tw-text-[#607B96]"></i> school
                    </li>
                    <li className="tw-text-[16px] tw-text-[#607B96]">
                      <i class="ri-markdown-fill tw-text-[#607B96]"></i>{" "}
                      high-school
                    </li>
                    <li className="tw-text-[16px] tw-text-[#607B96]">
                      <i class="ri-markdown-fill tw-text-[#607B96]"></i>{" "}
                      univercity
                    </li>
                  </ul>
                )}
              </ul>
            )}
          </div>
          <div className="mobile-professional-info tw-mt-1">
            <span
              className="tw-text-white tw-bg-[#1E2D3D]  tw-block"
              onClick={() => {
                setIsMobileProfessionalOpen(!isMobbileProfessionalOpen);
              }}
            >
              <i
                className={`ri-arrow-${
                  isMobbileProfessionalOpen ? "down" : "right"
                }-s-fill tw-text-white tw-bg-[#1E2D3D] tw-ml-5`}
              ></i>
              professional-info
            </span>
            {isMobbileProfessionalOpen && (
              <ul className="tw-ml-5">
                <li
                  className={`tw-text-${
                    isExperienceOpen ? "white" : "[#607B96]"
                  }`}
                  onClick={() => {
                    setIsExperienceOpen(!isExperienceOpen);
                  }}
                >
                  <i
                    className={`ri-arrow-${
                      isExperienceOpen ? "down" : "right"
                    }-s-line tw-text-[#607B96] tw-text-[20px]`}
                  ></i>
                  <i class="ri-folder-6-fill tw-text-pink-400"></i> experience
                </li>
                <li
                  className={`tw-text-${isSkillOpen ? "white" : "[#607B96]"}`}
                  onClick={() => {
                    setIsSkillOpen(!isSkillOpen);
                  }}
                >
                  <i
                    className={`ri-arrow-${
                      isSkillOpen ? "down" : "right"
                    }-s-line tw-text-[#607B96] tw-text-[20px]`}
                  ></i>
                  <i class="ri-folder-6-fill tw-text-sky-500"></i> skills
                </li>
                <li
                  className={`tw-text-${
                    isCertificateOpen ? "white" : "[#607B96]"
                  }`}
                  onClick={() => {
                    setIsCertificateOpen(!isCertificateOpen);
                  }}
                >
                  <i
                    className={`ri-arrow-${
                      isCertificateOpen ? "down" : "right"
                    }-s-line tw-text-[#607B96] tw-text-[20px]`}
                  ></i>
                  <i class="ri-folder-6-fill tw-text-green-500"></i> certificate
                </li>
              </ul>
            )}
          </div>
          <div className="mobile-hobbies tw-mt-1">
            <span
              className="tw-text-white tw-bg-[#1E2D3D]  tw-block"
              onClick={() => {
                setIsMobileHobbiesOpen(!isMobileHobbiesOpen);
              }}
            >
              <i
                className={`ri-arrow-${
                  isMobileHobbiesOpen ? "down" : "right"
                }-s-fill tw-text-white tw-bg-[#1E2D3D] tw-ml-5`}
              ></i>
              hobbies
            </span>
            {isMobileHobbiesOpen && (
              <ul className="tw-ml-5">
                <li
                  className={`tw-text-${isMusicOpen ? "white" : "[#607B96]"}`}
                  onClick={() => {
                    setIsMUsicOpen(!isMusicOpen);
                  }}
                >
                  <i
                    className={`ri-arrow-${
                      isMusicOpen ? "down" : "right"
                    }-s-line tw-text-[#607B96] tw-text-[20px]`}
                  ></i>
                  <i class="ri-folder-6-fill tw-text-pink-400"></i> music
                </li>
                <li
                  className={`tw-text-${isBookOpen ? "white" : "[#607B96]"}`}
                  onClick={() => {
                    setIsBookOpen(!isBookOpen);
                  }}
                >
                  <i
                    className={`ri-arrow-${
                      isBookOpen ? "down" : "right"
                    }-s-line tw-text-[#607B96] tw-text-[20px]`}
                  ></i>
                  <i class="ri-folder-6-fill tw-text-sky-500"></i> book
                </li>
                <li
                  className={`tw-text-${isGamingOpen ? "white" : "[#607B96]"}`}
                  onClick={() => {
                    setIsGamingOpen(!isGamingOpen);
                  }}
                >
                  <i
                    className={`ri-arrow-${
                      isGamingOpen ? "down" : "right"
                    }-s-line tw-text-[#607B96] tw-text-[20px]`}
                  ></i>
                  <i class="ri-folder-6-fill tw-text-green-500"></i> gaming
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="mobile-about-details tw-p-5 tw-flex tw-flex-col tw-mb-10">
          <div id="bio">
            <p className="tw-my-5">
              <span className="tw-text-white">// personal-info</span>{" "}
              <span className="tw-text-[#607B96]">/ bio</span>
            </p>
            <span className="tw-text-[#607B96]">
              I am a frontend developer with 1.5 years of experience working on
              React-based dynamic projects. I started my career creating static
              websites, eventually transitioning to modern web applications with
              advanced frameworks. I am passionate about building scalable,
              responsive, and user-friendly interfaces. With skills in React,
              JavaScript, and Mongoose, I continuously strive to improve and
              stay updated with the latest technologies. Currently, I am
              applying for full-time positions and exploring opportunities to
              further my career in web and mobile development.
            </span>
          </div>
          {isInterestOpen && (
            <div id="mobile-interest">
              <p className="tw-my-5">
                <span className="tw-text-white">// personal-info</span>{" "}
                <span className="tw-text-[#607B96]">/ interest</span>
              </p>
            </div>
          )}
          {isEducationOpen && (
            <div id="mobile-education">
              <p className="tw-my-5">
                <span className="tw-text-white">// personal-info</span>{" "}
                <span className="tw-text-[#607B96]">/ education</span>
              </p>
            </div>
          )}
          {isExperienceOpen && (
            <div id="mobile-experience">
              <p className="tw-my-5">
                <span className="tw-text-white">// professional-info</span>{" "}
                <span className="tw-text-[#607B96]">/ experience</span>
              </p>
            </div>
          )}
          {isSkillOpen && (
            <div id="mobile-skillss">
              <p className="tw-my-5">
                <span className="tw-text-white">// professional-info</span>{" "}
                <span className="tw-text-[#607B96]">/ skills</span>
              </p>
            </div>
          )}
          {isCertificateOpen && (
            <div id="mobile-certificate">
              <p className="tw-my-5">
                <span className="tw-text-white">// professional-info</span>{" "}
                <span className="tw-text-[#607B96]">/ certificate</span>
              </p>
            </div>
          )}
          {isMusicOpen && (
            <div id="mobile-music">
              <p className="tw-my-5">
                <span className="tw-text-white">// hobbies</span>{" "}
                <span className="tw-text-[#607B96]">/ music</span>
              </p>
            </div>
          )}
          {isBookOpen && (
            <div id="mobile-book">
              <p className="tw-my-5">
                <span className="tw-text-white">// hobbies</span>{" "}
                <span className="tw-text-[#607B96]">/ book</span>
              </p>
            </div>
          )}
          {isGamingOpen && (
            <div id="mobile-gaming">
              <p className="tw-my-5">
                <span className="tw-text-white">// hobbies</span>{" "}
                <span className="tw-text-[#607B96]">/ gaming</span>
              </p>
            </div>
          )}
        </div>

        <MobileFooter />
      </div>
    </>
  );
}

export default About;
