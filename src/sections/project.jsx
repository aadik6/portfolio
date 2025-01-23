import React, { useState } from 'react'
import Card from '../component/card'
import { personalProject } from '../data/projectData'
import './project.css'

function Project() {
    const [currentFile, setCurrentFile] = useState('personal')
    return (
        <>
            <div className="desktop tw-flex">
                <div className="about-info tw-flex">
                    <ul className='tw-flex tw-w-20'>
                        <div className="icons tw-ml-2">
                            <li className='tw-ml-2 tw-my-2' onClick={() => { setCurrentFile('personal') }}><i class={`ri-user-3-line tw-text-${currentFile == 'personal' ? 'white' : '[#607B96]'}`}></i></li>
                            <li className='tw-ml-2 tw-my-2' onClick={() => { setCurrentFile('professional') }}><i class={`ri-projector-fill  tw-text-${currentFile == 'professional' ? 'white' : '[#607B96]'}`}></i></li>
                        </div>
                        <li className='tw-mx-8 separator2'></li>
                    </ul>
                    <div className="tw-flex tw-flex-col">
                        <p className='tw-w-[176.5px] tw-text-white tw-text-[15px]'><i class="ri-arrow-down-s-fill tw-text-white"></i>projects</p>
                        <hr className='about-hr'></hr>
                        {currentFile == 'personal' &&
                            <div className='personal-projects tw-mt-5 tw-ml-1'>
                                <ul>
                                    <li className='tw-flex tw-items-center'><input type='checkbox' ></input><span><i class="ri-reactjs-fill"></i> React</span></li>
                                    <li className='tw-flex tw-items-center'><input type='checkbox' /><span><i class="ri-html5-fill"></i> HTML</span></li>
                                    <li className='tw-flex tw-items-center'><input type='checkbox' /><span><i class="ri-css3-fill"></i> CSS</span></li>
                                    <li className='tw-flex tw-items-center'><input type='checkbox' /><span><i class="ri-php-fill"></i> PHP</span></li>
                                </ul>
                            </div>
                        }
                        {currentFile == 'professional' &&
                            <div className='professional-project tw-mt-5 tw-ml-1'>
                                <ul>
                                    <li className='tw-flex tw-items-center'><input type='checkbox' /><span><i class="ri-reactjs-fill"></i> React</span></li>
                                    <li className='tw-flex tw-items-center'><input type='checkbox' /><span><i class="ri-html5-fill"></i> HTML</span></li>
                                    <li className='tw-flex tw-items-center'><input type='checkbox' /><span><i class="ri-css3-fill"></i> CSS</span></li>
                                </ul>
                            </div>
                        }
                    </div>
                    <li className='tw-ml-8 separator2'></li>
                </div>
                <div className="projects tw-pt-8">
                    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2">
                        {personalProject.map((project) => (
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
                <p className='tw-text-center'>Desktop version is constructing now</p>
            </div>
        </>
    )
}

export default Project