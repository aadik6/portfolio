import React, { useState } from 'react';
import Card from '../component/card';
import { Projects } from '../data/projectData';
import './project.css';
import MobileFooter from '../component/mobileFooter';

function Project() {
    const [currentFile, setCurrentFile] = useState('personal');
    const [selectedTech, setSelectedTech] = useState([]);
    const [mobileProjectType, setMobileProjectType] = useState(false);
    const [mobileProjectTech, setMobileProjectTech] = useState(false);

    // Mapping technologies to their respective icons
    const techIcons = {
        react: 'ri-reactjs-fill',
        html: 'ri-html5-fill',
        css: 'ri-css3-fill',
        php: 'ri-php-fill',
    };


    const filteredProjects = Projects.filter((project) => {
        return (
            project.type === currentFile &&
            (selectedTech.length === 0 || selectedTech.includes(project.tech))
        );
    });

    const handleTechSelection = (tech) => {
        setSelectedTech((prevSelectedTech) =>
            prevSelectedTech.includes(tech)
                ? prevSelectedTech.filter((t) => t !== tech) // Remove tech if already selected
                : [...prevSelectedTech, tech]
        );
    };

    return (
        <>
            <div className="desktop tw-flex">
                <div className="about-info tw-flex">
                    <ul className="tw-flex tw-w-20">
                        <div className="icons tw-ml-2">
                            <li
                                className="tw-ml-2 tw-my-2"
                                onClick={() => setCurrentFile('personal')}
                            >
                                <i
                                    className={`ri-user-3-line tw-text-${currentFile === 'personal' ? 'white' : '[#607B96]'}`}
                                ></i>
                            </li>
                            <li
                                className="tw-ml-2 tw-my-2"
                                onClick={() => setCurrentFile('professional')}
                            >
                                <i
                                    className={`ri-projector-fill tw-text-${currentFile === 'professional' ? 'white' : '[#607B96]'}`}
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
                                {Object.keys(techIcons).map((tech) => (
                                    <li key={tech} className="tw-flex tw-items-center">
                                        <label className="tw-flex tw-items-center tw-cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedTech.includes(tech)}
                                                onChange={() => handleTechSelection(tech)}
                                            />
                                            <span className={`tw-text-${selectedTech.includes(tech) ? 'white' : '[#607B96]'}`}>
                                                <i className={`${techIcons[tech]} tw-text-${selectedTech.includes(tech) ? 'white' : '[#607B96]'}`}></i> {tech.toUpperCase()}
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
                        {filteredProjects.map((project) => (
                            <Card
                                key={project.id}
                                img={project.img}
                                icon={project.icon}
                                para={project.description}
                                gitlink={project.gitLink}
                                hostedLink={project.hostedLink}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="mobile">
                <div className="top-pro tw-sticky tw-top-0">
                    <p className='tw-mt-3 tw-ml-5 tw-text-white'>_projects</p>
                    <div className="project-tech tw-mt-3">
                        <span className='tw-text-white tw-bg-[#1E2D3D] tw-w-[100vw] tw-block' onClick={() => { setMobileProjectTech(!mobileProjectTech) }}><i className={`ri-arrow-${mobileProjectTech ? "down" : "right"}-s-fill tw-text-white tw-bg-[#1E2D3D] tw-ml-5`}></i>projects</span>
                        {mobileProjectTech &&
                            <ul className='tw-ml-5'>
                                {Object.keys(techIcons).map((tech) => (
                                    <li key={tech} className="tw-flex tw-items-center">
                                        <label className="tw-flex tw-items-center tw-cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedTech.includes(tech)}
                                                onChange={() => handleTechSelection(tech)}
                                            />
                                            <span className={`tw-text-${selectedTech.includes(tech) ? 'white' : '[#607B96]'}`}>
                                                <i className={`${techIcons[tech]} tw-text-${selectedTech.includes(tech) ? 'white' : '[#607B96]'}`}></i> {tech.toUpperCase()}
                                            </span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                    <div className="project-type tw-mt-1">
                        <span className='tw-text-white tw-bg-[#1E2D3D] tw-w-[100vw] tw-block' onClick={() => { setMobileProjectType(!mobileProjectType) }}><i className={`ri-arrow-${mobileProjectType ? "down" : "right"}-s-fill tw-text-white tw-bg-[#1E2D3D] tw-ml-5`}></i>project-type</span>
                        {mobileProjectType &&
                            <ul className='tw-flex tw-ml-5'>
                                <li
                                    className={`tw-ml-2 tw-my-2 tw-text-${currentFile==='personal'?'white':'[#607B96]'}`}
                                    onClick={() => setCurrentFile('personal')}
                                >
                                    <i
                                        className={`ri-user-3-line tw-text-${currentFile === 'personal' ? 'white' : '[#607B96]'}`}
                                    ></i>personal
                                </li>
                                <li
                                   className={`tw-ml-2 tw-my-2 tw-text-${currentFile==='professional'?'white':'[#607B96]'}`}
                                    onClick={() => setCurrentFile('professional')}
                                >
                                    <i
                                        className={`ri-projector-fill tw-text-${currentFile === 'professional' ? 'white' : '[#607B96]'}`}
                                    ></i>professional
                                </li>
                            </ul>
                        }
                    </div>
                </div>
                <div className="mobile-projects tw-p-5">
                    <div className="tw-flex tw-flex-wrap">
                        {filteredProjects.map((project) => (
                            <Card
                                key={project.id}
                                img={project.img}
                                icon={project.icon}
                                para={project.description}
                                gitlink={project.gitLink}
                                hostedLink={project.hostedLink}
                            />
                        ))}
                    </div>
                </div>
                <MobileFooter />
            </div >
        </>
    );
}

export default Project;

