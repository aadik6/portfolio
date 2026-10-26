'use client';

import React, { useEffect, useState } from "react";
import Card from "../component/card";
import { Projects as initialProjects } from "../data/projectData";
import { fetchProjects, getDefaultTechIcon } from "../lib/projectService";
import "./project.css";
import MobileFooter from "../component/mobileFooter";

function Project() {
  const [projectsList, setProjectsList] = useState(initialProjects);
  const [currentFile, setCurrentFile] = useState("all");
  const [selectedTech, setSelectedTech] = useState([]);
  const [mobileProjectType, setMobileProjectType] = useState(false);
  const [mobileProjectTech, setMobileProjectTech] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch dynamic projects from Firestore with fallback to local projects
  useEffect(() => {
    let isMounted = true;
    async function loadDynamicProjects() {
      try {
        setIsLoading(true);
        const data = await fetchProjects();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setProjectsList(data);
        }
      } catch (err) {
        console.warn("Using fallback local projects:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadDynamicProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  // Base icon mapping for known technologies
  const techIcons = {
    react: "ri-reactjs-fill",
    html: "ri-html5-fill",
    css: "ri-css3-fill",
    php: "ri-php-fill",
    nodejs: "ri-nodejs-fill",
    nextjs: "ri-reactjs-fill",
    typescript: "ri-code-s-slash-fill",
    nestjs: "ri-server-fill",
    mongodb: "ri-database-2-fill",
    postgresql: "ri-database-fill",
  };

  // Dynamically extract technologies present in current projects
  const availableTechs = Array.from(
    new Set(projectsList.map((p) => (p.tech || "").toLowerCase()).filter(Boolean))
  );

  // If none found, fallback to defaults
  const displayTechs = availableTechs.length > 0 ? availableTechs : ["react", "html", "css", "php"];

  const filteredProjects = [...projectsList]
    .sort((a, b) => (Number(a.order) || 99) - (Number(b.order) || 99))
    .filter((project) => {
      const matchesType = currentFile === "all" || project.type === currentFile;
      const projectTech = (project.tech || "").toLowerCase();
      const matchesTech =
        selectedTech.length === 0 || selectedTech.includes(projectTech);
      return matchesType && matchesTech;
    });

  const handleTechSelection = (tech) => {
    setSelectedTech((prev) =>
      prev.includes(tech)
        ? prev.filter((t) => t !== tech)
        : [...prev, tech]
    );
  };

  return (
    <>
      <div className="desktop tw-flex">
        <div className="about-info tw-flex">
          <ul className="tw-flex tw-w-20">
            <div className="icons tw-ml-2">
              <li
                className="tw-ml-2 tw-my-2 tw-cursor-pointer"
                title="All Projects"
                onClick={() => setCurrentFile("all")}
              >
                <i
                  className={`ri-apps-2-line tw-text-${
                    currentFile === "all" ? "white" : "[#607B96]"
                  }`}
                ></i>
              </li>
              <li
                className="tw-ml-2 tw-my-2 tw-cursor-pointer"
                title="Personal Projects"
                onClick={() => setCurrentFile("personal")}
              >
                <i
                  className={`ri-user-3-line tw-text-${
                    currentFile === "personal" ? "white" : "[#607B96]"
                  }`}
                ></i>
              </li>
              <li
                className="tw-ml-2 tw-my-2 tw-cursor-pointer"
                title="Professional Projects"
                onClick={() => setCurrentFile("professional")}
              >
                <i
                  className={`ri-projector-fill tw-text-${
                    currentFile === "professional" ? "white" : "[#607B96]"
                  }`}
                ></i>
              </li>
            </div>
            <li className="tw-mx-8 separator2"></li>
          </ul>
          <div className="tw-flex tw-flex-col">
            <p className="tw-w-[176.5px] tw-text-white tw-text-[15px]">
              <i className="ri-arrow-down-s-fill tw-text-white"></i>projects
            </p>
            <hr className="about-hr"></hr>
            <div className="personal-projects tw-mt-5 tw-ml-1">
              <ul>
                {displayTechs.map((tech) => (
                  <li key={tech} className="tw-flex tw-items-center">
                    <label className="tw-flex tw-items-center tw-cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTech.includes(tech)}
                        onChange={() => handleTechSelection(tech)}
                      />
                      <span
                        className={`tw-text-${
                          selectedTech.includes(tech) ? "white" : "[#607B96]"
                        }`}
                      >
                        <i
                          className={`${
                            techIcons[tech] || getDefaultTechIcon(tech)
                          } tw-text-${
                            selectedTech.includes(tech) ? "white" : "[#607B96]"
                          }`}
                        ></i>{" "}
                        {tech.toUpperCase()}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <li className="tw-ml-8 separator2"></li>
        </div>
        <div className="projects tw-pt-8">
          <div className="tw-flex tw-flex-wrap">
            {filteredProjects.length === 0 ? (
              <div className="tw-p-8 tw-text-[#607B96] tw-font-mono">
                // No projects found matching selected filters.
              </div>
            ) : (
              filteredProjects.map((project) => (
                <Card
                  key={project.id || project.title}
                  img={project.img}
                  icon={project.icon || getDefaultTechIcon(project.tech)}
                  para={project.description}
                  gitlink={project.gitLink}
                  hostedLink={project.hostedLink}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="mobile">
        <div className="top-pro tw-sticky tw-top-0">
          <p className="tw-mt-3 tw-ml-5 tw-text-white">_projects</p>
          <div className="project-tech tw-mt-3">
            <span
              className="tw-text-white tw-bg-[#1E2D3D] tw-block tw-cursor-pointer"
              onClick={() => {
                setMobileProjectTech(!mobileProjectTech);
              }}
            >
              <i
                className={`ri-arrow-${
                  mobileProjectTech ? "down" : "right"
                }-s-fill tw-text-white tw-bg-[#1E2D3D] tw-ml-5`}
              ></i>
              tech-filter
            </span>
            {mobileProjectTech && (
              <ul className="tw-ml-5 tw-mt-2">
                {displayTechs.map((tech) => (
                  <li key={tech} className="tw-flex tw-items-center tw-my-1">
                    <label className="tw-flex tw-items-center tw-cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTech.includes(tech)}
                        onChange={() => handleTechSelection(tech)}
                      />
                      <span
                        className={`tw-text-${
                          selectedTech.includes(tech) ? "white" : "[#607B96]"
                        }`}
                      >
                        <i
                          className={`${
                            techIcons[tech] || getDefaultTechIcon(tech)
                          } tw-text-${
                            selectedTech.includes(tech) ? "white" : "[#607B96]"
                          }`}
                        ></i>{" "}
                        {tech.toUpperCase()}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="project-type tw-mt-1">
            <span
              className="tw-text-white tw-bg-[#1E2D3D] tw-block tw-cursor-pointer"
              onClick={() => {
                setMobileProjectType(!mobileProjectType);
              }}
            >
              <i
                className={`ri-arrow-${
                  mobileProjectType ? "down" : "right"
                }-s-fill tw-text-white tw-bg-[#1E2D3D] tw-ml-5`}
              ></i>
              category ({currentFile})
            </span>
            {mobileProjectType && (
              <ul className="tw-flex tw-ml-5 tw-my-2 tw-flex-wrap tw-gap-2">
                <li
                  className={`tw-cursor-pointer tw-text-${
                    currentFile === "all" ? "white" : "[#607B96]"
                  }`}
                  onClick={() => setCurrentFile("all")}
                >
                  <i className="ri-apps-2-line"></i> all
                </li>
                <li
                  className={`tw-ml-3 tw-cursor-pointer tw-text-${
                    currentFile === "personal" ? "white" : "[#607B96]"
                  }`}
                  onClick={() => setCurrentFile("personal")}
                >
                  <i
                    className={`ri-user-3-line tw-text-${
                      currentFile === "personal" ? "white" : "[#607B96]"
                    }`}
                  ></i>{" "}
                  personal
                </li>
                <li
                  className={`tw-ml-3 tw-cursor-pointer tw-text-${
                    currentFile === "professional" ? "white" : "[#607B96]"
                  }`}
                  onClick={() => setCurrentFile("professional")}
                >
                  <i
                    className={`ri-projector-fill tw-text-${
                      currentFile === "professional" ? "white" : "[#607B96]"
                    }`}
                  ></i>{" "}
                  professional
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="mobile-projects tw-p-5">
          <div className="tw-flex tw-flex-wrap">
            {filteredProjects.length === 0 ? (
              <div className="tw-p-4 tw-text-[#607B96] tw-font-mono">
                // No projects found matching selected filters.
              </div>
            ) : (
              filteredProjects.map((project) => (
                <Card
                  key={project.id || project.title}
                  img={project.img}
                  icon={project.icon || getDefaultTechIcon(project.tech)}
                  para={project.description}
                  gitlink={project.gitLink}
                  hostedLink={project.hostedLink}
                />
              ))
            )}
          </div>
        </div>
        <MobileFooter />
      </div>
    </>
  );
}

export default Project;
