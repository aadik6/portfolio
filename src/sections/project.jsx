import React, { useState } from 'react';
import Card from '../component/card';
import { Projects } from '../data/projectData';
import './project.css';

function Project() {
    const [currentFile, setCurrentFile] = useState('personal'); 
    const [selectedTech, setSelectedTech] = useState([]); 

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
                <p className="tw-text-center">Desktop version is constructing now</p>
            </div>
        </>
    );
}

export default Project;
